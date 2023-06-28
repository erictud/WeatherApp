import { useEffect, useReducer, useRef, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import StartOptions from "./StartOptions";
import Error from "./Error";
import Loader from "./Loader";

const initialState = {
  lat: null,
  lng: null,
  city: null,
  country: null,
  unit: true, // C = true, F = false
};

function reducer(state, action) {
  switch (action.type) {
    case "changeUnit":
      return { ...state, unit: !state.unit };
    case "setCoords":
      return { ...state, lat: action.payload.lat, lng: action.payload.lng };
    case "setLocation":
      return { ...state, city: action.payload.city };
    default:
      throw new Error("Action not supported");
  }
}

function App() {
  const [{ unit, city, lat, lng, country }, dispatch] = useReducer(reducer, initialState);
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
        const res = await fetch(`https://geocode.xyz/${city.replace(" ", "")}?json=1`, {
          signal: abortController.signal,
        });
        const data = await res.json();
        const { latt: lat, longt: lng } = data;
        dispatch({ type: "setCoords", payload: { lat, lng } });
      } catch (err) {
        setError("The city was not found!");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [city, country]);

  useEffect(() => {
    if (!lat || !lng) return;
    console.log(lat, lng);
  }, [lat, lng]);

  return (
    <>
      <Header
        searchBarRef={searchBar}
        isCelsiusActive={unit}
        onSetCityAndCountry={handleCityAndCountry}
        dispatch={dispatch}
      />
      <Main>
        {!error && !isLoading && (
          <StartOptions onSearchFocus={handleFocusSearch} onGetCurrentCoord={getClientCoord} />
        )}
        {error && <Error error={error} onTryAgainCallback={() => setError("")} />}
        {isLoading && <Loader />}
      </Main>
    </>
  );
}

export default App;
