import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const[reg,setreg]=useState({
        name:"",
        email:"",
        password:""
      });
      const nav = useNavigate();
    return ( <>
    <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name"
    value={reg.name} onChange={(e)=>{setreg({...reg,name:e.target.value})}}/>
     </div>
       <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" id="email"
    value={reg.email} onChange={(e)=>{setreg({...reg,email:e.target.value})}}/>
  </div>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" id="pwd"
    value={reg.password} onChange={(e)=>{setreg({...reg,password:e.target.value})}}/>
  </div>
  <button type="submit" class="btn btn-primary"
   onClick={()=>{
    axios.post("http://localhost:8080/adduser",{
        username:reg.name,
        email:reg.email,
        role:"user",
        password:reg.password,
    }).then(res=>{
        alert("success" )
        nav("/")
    })
  }}>submit</button>
  <button className="btn btn-success"onClick={()=>{
    nav("/");
  }}> Home</button>


    </> );
}
 
export default Register;