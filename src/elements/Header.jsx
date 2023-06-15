import { NavLink } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../store/authContext";
import "../styles/HeaderStyles.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const { userId, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsHeaderVisible(true);
    } else {
      setIsHeaderVisible(false);
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return userId ? (
    <header id="headerBar" className={isHeaderVisible ? "visible" : ""}>
      <nav className="headerItem" id="navLinks">
        <NavLink id="dashboard" className={"links"} to="/dashboard">
          <i class="fa-solid fa-house fa-2xl"></i>
          <span className="icon-title">Dashboard</span>
        </NavLink>
        <NavLink id="addNewJob" className={"links"} to="/JobForm">
          <i class="fa-regular fa-calendar-plus fa-2xl"></i>
          <span className="icon-title">Create Job</span>
        </NavLink>
        <NavLink id="profile" className={"links"} to="/profile">
          <i class="fa-solid fa-house-user fa-2xl"></i>
          <span className="icon-title">Profile</span>
        </NavLink>
      </nav>
      <h1 className="headerItem" id="logo">
        Service<b>Pro</b>
      </h1>
      <div id="logOutBox" className="headerItem">
        <button id="logOutBtn" onClick={handleLogout}>
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </header>
  ) : null;
};

export default Header;
