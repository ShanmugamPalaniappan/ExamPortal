import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const Allsubject = () => {
  const [Subject, setSubject] = useState();
  const nav = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/viewallsubject")
    .then((res)=>{
      setSubject(res.data);
      console.log(res.data);
    })
  }, []);
  return ( <>
  <AdminNav/>
  <div>
    <button 
    type="button"
    className="btn btn-outline-primary"
    onClick={()=>{
    nav("/addsubject"); 
    }}
    >Add</button>
  </div>
  <h1>All subject</h1>
  <table className="table table-bordered">
    <thead>
      <tr>
        <td>Subjectid</td>
        <td>Subject Name</td>
      
      </tr>
    </thead>
    <tbody>
      {Subject && Subject.map((subjects)=>{
        
          return(
            <tr>
                <td>{subjects.subjectid}</td>
                <td>{subjects.subjectname}</td>
            </tr>
          )
      }
        
      
)}
    </tbody>
  </table>

  </> );
}
 
export default Allsubject;



