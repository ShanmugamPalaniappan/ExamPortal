import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideNavbar = () => {
    const nav = useNavigate();
  useEffect(() => {
    var de = JSON.parse(window.localStorage.getItem("full"));
    document.title = "User";
    if (de.role !== "user") {
      window.localStorage.clear();
      nav("/");
    }
  });
    return (<>
    <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="/home">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <p
            className="nav-link"
            onClick={() => {
              window.localStorage.clear();
              nav("/");
            }}
            style={{ cursor: "pointer" }}
          >
            {window.localStorage.getItem("name")+" logout"}
          </p>
        </li>
      </ul>
    </>  );
}
 
export default SideNavbar;