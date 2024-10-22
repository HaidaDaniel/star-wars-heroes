import { HeroWithId } from "../types/Hero.types";
import "./HeroCard.css";

export const HeroCard: React.FC<HeroWithId> = (props) => {
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
          <strong>Films:</strong> {films.join(", ")}
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
          <strong>Created:</strong> {new Date(created).toLocaleDateString()}
        </p>
        <p>
          <strong>Edited:</strong> {new Date(edited).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default HeroCard;
