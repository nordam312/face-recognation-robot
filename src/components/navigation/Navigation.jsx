// ...existing code...
import "./navigation.css";

const Navigation = ({ onRouteChange, userExist }) => {
  return (
    <nav className="nav-bar">
      <div className="nav-inner">
        <p
          onClick={() => onRouteChange("home")}
          className="nav-link f3 link dim pointer"
        >
          Home
        </p>

        {userExist ? (
          <p
            onClick={() => onRouteChange("signout")}
            className="nav-link f3 link dim pointer"
          >
            Sign out
          </p>
        ) : (
          <p
            onClick={() => onRouteChange("signin")}
            className="nav-link f3 link dim pointer"
          >
            Sign in
          </p>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
// ...existing code...
