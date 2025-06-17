import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, handleCardClick, clothingItems = [] }) {
  return (
    <main>
      <WeatherCard temperature={weatherData.temp.F} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}

          {clothingItems.map((item, index) => (
            <li
              key={index}
              className="card"
              onClick={() => handleCardClick(item)}
            >
              <h2 className="card__name">{item.name}</h2>
              <img
                className="card__image"
                src={item.imageUrl}
                alt={`Image of ${item.name}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
