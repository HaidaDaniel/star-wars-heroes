import { format } from "date-fns";
import { Hero } from "../types/Hero.types";
import "./HeroCard.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const HeroCard: React.FC<Hero> = (props) => {
  const {
    id,
    name,
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    skin_color,
    homeworld,
    films,
    species,
    starships,
    vehicles,
    created,
    edited,
  } = props;

  const { films: filmData } = useContext(AppContext);

  return (
    <div className="hero-card">
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        alt={name}
        className="hero-image"
      />
      <div className="hero-info">
        <h2 className="hero-name">{name}</h2>
        <div>
          <strong>Birth Year:</strong> {birth_year}
        </div>
        <div>
          <strong>Eye Color:</strong> {eye_color}
        </div>
        <div>
          <strong>Gender:</strong> {gender}
        </div>
        <div>
          <strong>Hair Color:</strong> {hair_color}
        </div>
        <div>
          <strong>Height:</strong> {height}
        </div>
        <div>
          <strong>Mass:</strong> {mass}
        </div>
        <div>
          <strong>Skin Color:</strong> {skin_color}
        </div>
        <div>
          <strong>Homeworld:</strong> {homeworld}
        </div>
        <div>
        <div><strong>Films:</strong> {films?.map((film) => filmData[film]?.title || film).join(", ")}</div>
        </div>
        <div>
          <strong>Species:</strong> {species.join(", ")}
        </div>
        <div>
          <strong>Starships:</strong> {starships.join(", ")}
        </div>
        <div>
          <strong>Vehicles:</strong> {vehicles.join(", ")}
        </div>
        <div>
          <strong>Created:</strong> {format(new Date(created), "dd/MM/yyyy")}
        </div>
        <div>
          <strong>Edited:</strong> {format(new Date(edited), "dd/MM/yyyy")}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
