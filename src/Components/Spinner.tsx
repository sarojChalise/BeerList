import Spinner from "react-bootstrap/Spinner";

function LoadingSpinner() {
  return (
    <Spinner
      style={{ color: "#0090e2",display:"block",textAlign:"center" }}
      className="ml-7"
      animation="border"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingSpinner;
