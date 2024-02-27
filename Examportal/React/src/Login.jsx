import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const Home = () => {
    const[user,setuser]=useState({
        name:"",
        password:""
      });
      const nav = useNavigate();
    return ( <>
    <div class="form-group">
        <label for="name">Name:</label>
        <input
          type="text"
          class="form-control"
          id=""
          value={user.name}
          onChange={(e) => {
            setuser({...user,name:e.target.value})
          }}
        />
      </div>

      <div class="form-group">
        <label for="pwd">Password:</label>
        <input
          type="password"
          class="form-control"
          id="pwd"
          value={user.password}
          onChange={(e) => {
            setuser({...user,password:e.target.value})
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => {
          axios
            .post("http://localhost:8080/", {
              username: user.name,
              password: user.password,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.role === "user") {
                if(res.data.status==="approved")
                {
                  window.localStorage.setItem("full", JSON.stringify(res.data));
                  window.localStorage.setItem("id", res.data.userid);
                  window.localStorage.setItem("role", res.data.role);
                  window.localStorage.setItem("name", res.data.username);
                  nav("/home");
                }
                else{
                  alert("please wait for approval from admin")
                  setuser({name:"",password:""})
                }
              } else if(res.data.role === "admin"){
                window.localStorage.setItem("full", JSON.stringify(res.data));
                window.localStorage.setItem("id", res.data.userid);
                window.localStorage.setItem("role", res.data.role);
                window.localStorage.setItem("name", res.data.username);
                nav("/admin");
              }
              else{
                alert("invalid credentials");
                setuser({
                  name:"",
                  password:""
                });
              }
            });
        }}
      >
        Submit
      </button>
      <button className="btn btn-success" on onClick={()=>{
        nav("/reg");
      }}>Register</button><br/>
    </> );
}
 
export default Home;


