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
        <p>
          <strong>Birth Year:</strong> {birth_year}
        </p>
        <p>
          <strong>Eye Color:</strong> {eye_color}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Hair Color:</strong> {hair_color}
        </p>
        <p>
          <strong>Height:</strong> {height}
        </p>
        <p>
          <strong>Mass:</strong> {mass}
        </p>
        <p>
          <strong>Skin Color:</strong> {skin_color}
        </p>
        <p>
          <strong>Homeworld:</strong> {homeworld}
        </p>
        <p>
          <strong>Films:</strong>{" "}
          {films.map((film) => filmData[film]?.title || film).join(", ")}
        </p>
        <p>
          <strong>Species:</strong> {species.join(", ")}
        </p>
        <p>
          <strong>Starships:</strong> {starships.join(", ")}
        </p>
        <p>
          <strong>Vehicles:</strong> {vehicles.join(", ")}
        </p>
        <p>
          <strong>Created:</strong> {format(new Date(created), "dd/MM/yyyy")}
        </p>
        <p>
          <strong>Edited:</strong> {format(new Date(edited), "dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
};

export default HeroCard;
