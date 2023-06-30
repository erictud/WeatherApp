import { useState } from "react";
import CloudIcon from "../icons/CloudIcon";

export default function Header({ isCelsiusActive, dispatch, searchBarRef, onSetCityAndCountry }) {
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = location.trim();
    onSetCityAndCountry(city);
    setLocation("");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <CloudIcon />
          <h2>useWeather</h2>
        </div>

        <div
          className="temperature-preference-container"
          onClick={() => dispatch({ type: "changeUnit" })}
        >
          <span role="button" className={`${isCelsiusActive ? "unit unit-active" : "unit"}`}>
            °C
          </span>
          |
          <span role="button" className={`${!isCelsiusActive ? "unit unit-active" : "unit"}`}>
            °F
          </span>
        </div>
      </div>
      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search a city"
          ref={searchBarRef}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
    </header>
  );
}
