import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const Allsubtopic = () => {
  const [Subtopic, setSubtopic] = useState();
  const nav=useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8080/viewallsubtopic")
    .then((res)=>{
      setSubtopic(res.data);
      console.log(res.data);
    })
  }, []);
  return ( <>
  <AdminNav/>
  <button className="btn btn-primary" onClick={()=>{nav("/addst")}}>addsubtopic</button>
  <table className="table table-bordered">
        <thead>
            <tr>

                <td>Subtopicid</td>
                <td>Subtopicname</td>
                <td>Subject Name</td>
                
            </tr>
        </thead>
        <tbody>
           {Subtopic && Subtopic.map((st)=>{

            return(
              <tr>
                <td>{st.stid}</td>
                <td>{st.subtopicname}</td>
                <td>{st.s.subjectname}</td>
              </tr>
            )
           })
        } 
        </tbody>
    </table>


  </> );
}
 
export default Allsubtopic;



