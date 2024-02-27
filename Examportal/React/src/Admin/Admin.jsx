import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import axios from "axios";


const Admin = () => {
    const[exams,setexams]=useState();
    const[x,setx]=useState(0);
    useEffect(()=>{
         axios.get("http://localhost:8080/resumerequest").then((res)=>{setexams(res.data)})
    },[x]);
    return ( <>
    <AdminNav/>
    <h4>Welcome {window.localStorage.getItem("name")}</h4>
    <h1>Current Exam resume requests </h1>
    {
        exams&&exams!==""&&exams.length?
        <table className="table table-bordered">
            <thead>
                <tr>
                <th>Username</th>
                <th>exam</th>
                <th>accept</th>
                </tr>
            </thead>
            <tbody>
                {
                    exams.map((e)=>(
                        <tr>
                        <td>{e.u.username}</td>
                        <td>{e.s.subjectname}</td>
                        <td><button className="btn btn-success" onClick={()=>{axios.post("http://localhost:8080/changeexamstatus",{examid:e.examid,status:"resume"}).then((res)=>{setx(x+1)})}}>Accept</button></td>
                    </tr>
                    ))
                }
            </tbody>     
        </table>
        :<p>No Current Resume Requests now</p>

    }
    </> );
}
 
export default Admin;