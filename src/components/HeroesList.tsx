import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchHeroDetails, fetchHeroesPage } from "../api/api";
import { HeroPageResponse, Hero } from "../types/Hero.types";
import HeroCard from "./HeroCard";
import { HeroDetails } from "./HeroDetails";
import "antd/dist/reset.css";
import "./HeroesList.css";
import { Modal } from "antd";

export const HeroesList = () => {
  const [selectedHeroId, setSelectedHeroId] = useState<number | null>(null);
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

  const heroes = data?.pages.flatMap((page) => page.results) || ([] as Hero[]);

  const loadMoreHeroes = () => {
    if (hasNextPage && !isLoading && !isFetching) fetchNextPage();
  };
  const handleOpenModal  = async (id: number) => {
    setSelectedHeroId(id);

    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHeroId(null);
  };

  const { data: heroDetails, isLoading: isLoadingHeroDetails, isError } = useQuery<Hero, Error>({
    queryKey: ["heroDetails", selectedHeroId],
    queryFn: () => fetchHeroDetails(selectedHeroId!),
    enabled: !!selectedHeroId,
  });

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
            <div key={hero.url} onClick={() => handleOpenModal(hero.id)}>
              <HeroCard {...hero} />
            </div>
          ))}
      </InfiniteScroll>
      <Modal
        title="Hero Details"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        transitionName=""
        centered
        width={"80vw"} 
        styles={{
          body: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '90vh',
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        {isLoadingHeroDetails ? (
          <h4>Loading hero details...</h4>
        ) : isError ? (
          <h4>Error fetching hero details</h4>
        ) : (
          heroDetails && <HeroDetails heroDetails={heroDetails} />
        )}
      </Modal>
    </div>
  );
};
