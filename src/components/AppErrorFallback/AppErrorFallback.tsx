import { bugFixing } from "@/assets";
import "./index.scss";

interface IProps {
  error: Error;
}

const AppErrorFallback = ({ error }: IProps) => {
  const handleRefresh = () => {
    window.location.reload();
  };
  console.error("App error: ", error.message);
  return (
    <div className="app__error-container">
      <div className="error-content">
        <img
          src={bugFixing}
          alt="App broken bug fixing"
          className="error-image"
        />

        <h1 className="error-title">Oops! Something went wrong</h1>

        <p className="error-message">
          The connection isn't yielding today. Give it another shot!
        </p>

        <button className="refresh-button" onClick={handleRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default AppErrorFallback;
