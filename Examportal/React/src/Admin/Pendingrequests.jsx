import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

const Pendingrequests = () => {
    const[allusers,setallusers]=useState("");
    const[x,setx]=useState(0);
    useEffect(()=>{
         axios.get("http://localhost:8080/pendingrequests").then((res)=>{setallusers(res.data)});
    },[x]);
    console.log(allusers)
    return ( <>
    <AdminNav/>
    <h1>Pending Requests</h1>
    {allusers&&allusers!==""&&allusers.length?
    <table className="table table-bordered">
        <thead>
            <tr>
                <td>username</td>
                <td>Accept</td>
            </tr>
        </thead>
        <tbody>
            {
                allusers.map((u)=>(
                    <tr>
                        <td>{u.username}</td>
                        <td><button className="btn btn-primary" onClick={()=>{axios.post("http://localhost:8080/changestatus",{userid:u.userid,status:"approved"}).then((res)=>{setx(x+1)})}}>Accept</button></td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    :<p>No pending Requests</p>}

    </> );
}
 
export default Pendingrequests;