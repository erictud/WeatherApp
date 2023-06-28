import banner from "../assets/banner.png";

export default function StartOptions({ onGetCurrentCoord, onSearchFocus }) {
  return (
    <div className="starting-options">
      <img src={banner} alt="Man looking at the weather forecast" />
      <div className="btn-row">
        <button className="btn" onClick={onGetCurrentCoord}>
          See your current location forecast
        </button>
        <button className="btn" onClick={onSearchFocus}>
          Search a city forecast
        </button>
      </div>
    </div>
  );
}
