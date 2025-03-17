import cn from "classnames";
import "./index.scss";

interface IProps {
  size?: "small" | "medium" | "large";
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const AppLoading = ({
  size = "medium",
  text = "Loading...",
  fullScreen = false,
}: IProps) => {
  return (
    <div
      className={cn("app__loading-container", {
        fullscreen: fullScreen,
      })}
    >
      <div className={cn("spinner", { [size]: size })}>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default AppLoading;
