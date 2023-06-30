export default function HourlyForecastDetail({ date, icon, description, temp, unit }) {
  const curDate = new Date(date);
  const weekday = ["Sun", "Mon", "Tu", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className={`hourly_forecast ${+curDate.getHours() >= 21 ? "border-right" : ""}`}>
      <p>
        {weekday[curDate.getDay()]} {curDate.getHours()}:00
      </p>
      <div>
        <img src={`../weather-icons/${icon}.png`} alt={description} />
        <h5>
          {temp}°{unit}
        </h5>
      </div>
      <p>{description}</p>
    </div>
  );
}
