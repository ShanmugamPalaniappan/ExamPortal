import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminNav = () => {
    const nav = useNavigate();
    useEffect(() => {
      var de = JSON.parse(window.localStorage.getItem("full"));
      document.title = "Admin";
      if (de.role !== "admin") {
        window.localStorage.clear();
        nav("/");
      }
    });
    return ( <>
    <ul  className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" to="/admin">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/alluser">
            All User
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/allsubject">
            All Subject
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/allsubtopic">
            Subtopic
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/allquestions">
            questions
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/pendingrequests">
            pending requests
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/addexam">
            Add Exam
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

    </> );
}
 
export default AdminNav;