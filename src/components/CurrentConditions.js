import UpArrow from "../icons/UpArrow";
import DownArrow from "../icons/DownArrow";
import PaperAirplane from "../icons/PaperAirplaneIcon";
import SunIcon from "../icons/SunIcon";
import CloudIcon from "../icons/CloudIcon";

export default function CurrentConditions({
  temp,
  temp_max,
  temp_min,
  icon,
  description,
  location,
  unit,
  wind,
  sunrise,
  sunset,
}) {
  const date = new Date();
  const sunriseDate = new Date(sunrise);
  const sunsetDate = new Date(sunset);

  return (
    <div className="current-conditions">
      <div className="current-conditions_header">
        <p>{location}</p>
        <p>{date.toDateString()}</p>
      </div>
      <div className="current-conditions_main">
        <img src={`../weather-icons/${icon}.png`} alt={description} />
        <div className="current-conditions_main-temp">
          <h3>
            {Math.round(temp)} ° {unit === true ? "C" : "F"}
          </h3>
          <h4>{description}</h4>
        </div>
      </div>
      <div className="current-conditions_details">
        <h5>
          <UpArrow />
          Max temp today: {Math.round(temp_max)}°{unit === true ? "C" : "F"}
        </h5>
        <h5>
          <DownArrow />
          Min temp today: {Math.round(temp_min)}°{unit === true ? "C" : "F"}
        </h5>
        <h5>
          <PaperAirplane />
          wind {Math.round(wind)} {unit === true ? "km/h" : "mil/h"}{" "}
        </h5>
        <h5>
          <SunIcon />
          sunrise{" "}
          {sunriseDate.getHours() <= 9 ? `0${sunriseDate.getHours()}` : sunriseDate.getHours}:
          {sunriseDate.getMinutes() <= 9
            ? `0 ${sunriseDate.getMinutes()}`
            : sunriseDate.getMinutes()}
        </h5>
        <h5>
          <CloudIcon />
          sunset {sunsetDate.getHours() <= 9 ? `0${sunsetDate.getHours()}` : sunsetDate.getHours()}:
          {sunsetDate.getMinutes() <= 9 ? `0${sunsetDate.getMinutes()}` : sunsetDate.getMinutes()}
        </h5>
      </div>
    </div>
  );
}
