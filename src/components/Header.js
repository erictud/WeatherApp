import { useState } from "react";

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
              d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
            />
          </svg>

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
