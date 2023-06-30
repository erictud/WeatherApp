import ChevronDown from "../icons/ChevronDown";
import HourlyForecastDetail from "./HourlyForecastDetail";

export default function NextHoursForecast({
  dispatch,
  hoursForecast,
  hoursForecastStartDate,
  hoursForecastFinishDate,
}) {
  return (
    <div className="hoursForecast_container">
      {hoursForecast.length > 0 ? (
        <>
          <h3>
            Three hourly forecast between{" "}
            {new Intl.DateTimeFormat("en", {
              hour: `numeric`,
              day: `numeric`,
              month: `long`,
              // weekday: `long`,
            }).format(new Date(hoursForecastStartDate))}{" "}
            to{" "}
            {new Intl.DateTimeFormat("en", {
              hour: `numeric`,
              day: `numeric`,
              month: `long`,
              //weekday: `long`,
            }).format(new Date(hoursForecastFinishDate))}
          </h3>
          <div className="hoursForecast_row">
            {hoursForecast.map((el, i) => (
              <HourlyForecastDetail
                date={el.date}
                icon={el.icon}
                temp={el.temp}
                description={el.description}
                unit={el.unit}
                key={i}
              />
            ))}
          </div>
        </>
      ) : (
        <button
          className="btn btn-icon"
          onClick={() => dispatch({ type: "fetchNextHoursForecast" })}
        >
          Next hours forecast <ChevronDown />
        </button>
      )}
    </div>
  );
}
