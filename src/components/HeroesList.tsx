import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchHeroesPage } from "../api/api";
import { HeroPageResponse, HeroWithId } from "../types/Hero.types";
import HeroCard from "./HeroCard";
import { HeroDetails } from "./HeroDetails";
import "antd/dist/reset.css";
import "./HeroesList.css";
import { Modal } from "antd";

export const HeroesList = () => {
  const [selectedHeroUrl, setSelectedHeroUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
    useInfiniteQuery<HeroPageResponse, Error>({
      queryKey: ["people"],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        fetchHeroesPage(pageParam as unknown as number),
      getNextPageParam: (lastPage) => {
        return lastPage.next
          ? parseInt(lastPage.next.split("=")[1])
          : undefined;
      },
    });

  const heroes =
    data?.pages.flatMap((page) => page.results) || ([] as HeroWithId[]);

  const loadMoreHeroes = () => {
    if (hasNextPage && !isLoading && !isFetching) fetchNextPage();
  };
  const handleOpenModal = (url: string) => {
    setSelectedHeroUrl(url);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHeroUrl(null);
  };


  if (isLoading) {
    return <h4>Loading...</h4>;
  }

  return (
    <div className="heroes-list-wrapper">
      <InfiniteScroll
        dataLength={heroes.length}
        next={loadMoreHeroes}
        hasMore={hasNextPage}
        loader={<h4>Loading more heroes...</h4>}
      >
        {heroes &&
          heroes.map((hero) => (
            <div key={hero.url} onClick={() =>  handleOpenModal(hero.url)}>
              <HeroCard {...hero} />
            </div>
          ))}
      </InfiniteScroll>
      <Modal
        title="Hero Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        centered
        width={900}
        height={600}
      >
        {selectedHeroUrl && <HeroDetails heroUrl={selectedHeroUrl} />}
      </Modal>
    </div>
  );
};
