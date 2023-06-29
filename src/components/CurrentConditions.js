import UpArrow from "../icons/UpArrow";
import DownArrow from "../icons/DownArrow";
import PaperAirplane from "../icons/PaperAirplaneIcon";

export default function CurrentConditions({
  temp,
  temp_max,
  temp_min,
  icon,
  description,
  location,
  unit,
  wind,
}) {
  const date = new Date();
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
      </div>
    </div>
  );
}
