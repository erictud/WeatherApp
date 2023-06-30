import ErrorSign from "../icons/ErrorSign";
export default function Error({ error, onTryAgainCallback }) {
  return (
    <div className="error-container">
      <div>
        <ErrorSign />
        <h3>{error}</h3>
      </div>
      <button className="btn" onClick={onTryAgainCallback}>
        Try again
      </button>
    </div>
  );
}
