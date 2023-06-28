import errorBanner from "../assets/error-banner.png";

export default function Error({ error, onTryAgainCallback }) {
  return (
    <div className="error-container">
      <img src={errorBanner} alt="error banner" />
      <h3>{error}</h3>
      <button className="btn" onClick={onTryAgainCallback}>
        Try again
      </button>
    </div>
  );
}
