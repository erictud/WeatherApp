export default function HourlyForecastDetail({ date, icon, description, temp, unit }) {
  const curDate = new Date(date);
  return (
    <div className="hourly_forecast">
      <div>
        <p>
          {curDate.getDate()}.{curDate.getMonth()} | {curDate.getHours()}:00
        </p>
        <img src={`../weather-icons/${icon}.png`} alt={description} />
        <p>{description}</p>
      </div>
      <h5>
        {temp}°{unit}
      </h5>
    </div>
  );
}
