import { useEffect, useReducer, useRef, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import StartOptions from "./StartOptions";
import Error from "./Error";
import Loader from "./Loader";
import CurrentConditions from "./CurrentConditions";
import NextHoursForecast from "./NextHoursForecast.js";

const API_KEY = "f3ccfe33458ba60b1cce26a18d90b1bc";

const initialState = {
  lat: null,
  lng: null,
  city: null,
  unit: true, // C = true, F = false
  location: "",
  currentConditions: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    wind: 0,
    description: "",
    icon: "",
    sunrise: "",
    sunset: "",
  },
  showNextHoursForecasts: false,
  hoursForecastStartDate: "",
  hoursForecastFinishDate: "",
  hoursForecast: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "changeUnit":
      return { ...state, unit: !state.unit };
    case "setCoords":
      return { ...state, lat: action.payload.lat, lng: action.payload.lng };
    case "setLocation":
      return { ...state, city: action.payload.city };
    case "setCurrentConditions":
      return {
        ...state,
        location: action.payload.location,
        currentConditions: action.payload.currentConditions,
      };
    case "fetchNextHoursForecast":
      return { ...state, showNextHoursForecasts: true };
    case "startNewSearch":
      return { ...initialState };
    case "setHoursForecast":
      return {
        ...state,
        hoursForecastStartDate: action.payload.hoursForecastStartDate,
        hoursForecastFinishDate: action.payload.hoursForecastFinishDate,
        hoursForecast: action.payload.hoursForecast,
      };
    default:
      throw new Error("Action not supported");
  }
}

function App() {
  const [
    {
      unit,
      city,
      lat,
      lng,
      currentConditions,
      location,
      showNextHoursForecasts,
      hoursForecastStartDate,
      hoursForecastFinishDate,
      hoursForecast,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchBar = useRef(null);

  function handleFocusSearch() {
    searchBar.current.focus();
  }

  function handleCityAndCountry(city) {
    if (city === "") {
      setError("Make sure you enter a valid city and country");
      return;
    }
    dispatch({ type: "setLocation", payload: { city } });
  }

  function getClientCoord() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(getClientCoordSuccess, getClientCoordError);
    setIsLoading(false);
  }

  function getClientCoordSuccess(geolocationInfo) {
    setIsLoading(true);
    const { latitude: lat, longitude: lng } = geolocationInfo.coords;
    dispatch({ type: "setCoords", payload: { lat, lng } });
  }

  function getClientCoordError() {
    setError("You need to accept getting your geolocation details!");
  }

  useEffect(() => {
    if (!city) return;
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`,
          {
            signal: abortController.signal,
          }
        );
        const data = await res.json();
        const { lat, lon: lng } = data[0];
        dispatch({ type: "setCoords", payload: { lat, lng } });
      } catch (err) {
        setError("Location not found!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [city]);

  useEffect(() => {
    if (!lat || !lng) return;
    const abortController = new AbortController();

    async function fetchCurrentWeatherConditions() {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${
            unit ? "metric" : "imperial"
          }&appid=${API_KEY}`,
          { signal: abortController.signal }
        );
        const data = await res.json();
        const {
          main: { temp, temp_max, temp_min },
          name,
          sys: { country, sunrise: srise, sunset: sset },
          weather,
          wind: { speed },
        } = data;
        const { description, icon } = weather[0];
        const currentConditions = {
          temp,
          temp_max,
          temp_min,
          description,
          icon,
          wind: speed,
          sunrise: srise * 1000,
          sunset: sset * 1000,
        };
        const location = `${name}, ${country}`;
        dispatch({ type: "setCurrentConditions", payload: { currentConditions, location } });
      } catch (err) {
        setError("Cannot get weather forecast! Please try again!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCurrentWeatherConditions();

    return () => {
      abortController.abort();
    };
  }, [lat, lng, unit, dispatch]);

  useEffect(() => {
    if (!showNextHoursForecasts) return;
    const abortController = new AbortController();

    async function fetchNextDaysForecast() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=${
            unit ? "metric" : "imperial"
          }&appid=${API_KEY}`,
          { signal: abortController.signal }
        );
        const data = await res.json();
        const dataParsed = data.list.map((el) => {
          return {
            date: el.dt_txt,
            temp: Math.round(el.main.temp),
            description: el.weather[0].description,
            icon: el.weather[0].icon,
            unit: unit === true ? "C" : "F",
          };
        });
        const startDate = dataParsed[0].date;
        const finishDate = dataParsed[dataParsed.length - 1].date;
        dispatch({
          type: "setHoursForecast",
          payload: {
            hoursForecastStartDate: startDate,
            hoursForecastFinishDate: finishDate,
            hoursForecast: dataParsed,
          },
        });
      } catch (err) {
        console.log(err);
        setError("Cannot get the next 7 days forecast!");
      }
    }

    fetchNextDaysForecast();

    return () => abortController.abort();
  }, [showNextHoursForecasts, lat, lng, unit]);

  return (
    <>
      <Header
        searchBarRef={searchBar}
        isCelsiusActive={unit}
        onSetCityAndCountry={handleCityAndCountry}
        dispatch={dispatch}
      />
      <Main>
        {!error && !isLoading && !location && (
          <StartOptions onSearchFocus={handleFocusSearch} onGetCurrentCoord={getClientCoord} />
        )}
        {error && <Error error={error} onTryAgainCallback={() => setError("")} />}
        {isLoading && <Loader />}
        {location && !isLoading && !error && (
          <>
            <CurrentConditions
              description={currentConditions.description}
              icon={currentConditions.icon}
              location={location}
              temp={currentConditions.temp}
              temp_max={currentConditions.temp_max}
              temp_min={currentConditions.temp_min}
              unit={unit}
              wind={currentConditions.wind}
              sunrise={currentConditions.sunrise}
              sunset={currentConditions.sunset}
            />
            <NextHoursForecast
              showNextHoursForecasts={showNextHoursForecasts}
              dispatch={dispatch}
              hoursForecast={hoursForecast}
              hoursForecastStartDate={hoursForecastStartDate}
              hoursForecastFinishDate={hoursForecastFinishDate}
            />
          </>
        )}
      </Main>
      <p className="credits">App made by Tudorica Eric</p>
    </>
  );
}

export default App;
