import Alert from "react-bootstrap/Alert";
import "./Alerts.scss";

function Alerts({ key, message }) {
  return (
    <>
      <div className="alert-container">
        <Alert key={key} variant={key}>
          <div className="label">{message}</div>
        </Alert>
      </div>
    </>
  );
}

export default Alerts;
