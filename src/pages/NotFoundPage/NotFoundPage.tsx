import { ROUTE_PATHS } from "@/constants";
import { Link } from "react-router-dom";
import "./index.scss";

const NotFoundPage = () => {
  return (
    <div className="app__notfound-page">
      {/* Background decorative elements */}
      <div className="app__notfound-page__decoration app__notfound-page__decoration--gradient"></div>
      <div className="app__notfound-page__decoration app__notfound-page__decoration--circle-large"></div>
      <div className="app__notfound-page__decoration app__notfound-page__decoration--circle-small"></div>

      {/* Main content */}
      <div className="app__notfound-page__content">
        <h1 className="app__notfound-page__title">404</h1>
        <h2 className="app__notfound-page__subtitle">Page Not Found.</h2>
        <p className="app__notfound-page__message">
          Sorry, we can't find the page you're looking for.
        </p>

        <Link to={ROUTE_PATHS.HOME} className="app__notfound-page__button">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
