import axios from "axios";
import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";

const Addexam = () => {
    const [users, setusers] = useState({username:"",alluser:[],date:"",noq:""});
    const[subjects,setsubjects]=useState({subjectname:"",allsubjects:[]});
    useEffect(() => {
        axios.get("http://localhost:8080/viewallsubject").then((res)=>{setsubjects({...subjects,allsubjects:res.data})});
        axios.get("http://localhost:8080/viewalluser").then((res)=>{setusers({...users,alluser:res.data})})
        const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentdate=year+"-"+month+"-"+date;
  setusers({...users,date:currentdate});
    }, []);
    return ( <>
    <AdminNav/>
    <label for="sel1" class="form-label">Select User:</label>
    <select class="form-select" id="sel1" name="sellist1" onChange={(e)=>{setusers({...users,username:e.target.value})}}>
    <option disabled selected>User name</option>
    {
        users.alluser&&users.alluser.map((u)=>
            {
                return(<option>{u.username}</option>)
            }
        )
        
    }    
    </select><br/>
    <label for="sel2" class="form-label">Select Subject:</label>
    <select class="form-select" id="sel2" name="sellist2" onChange={(e)=>{setsubjects({...subjects,subjectname:e.target.value})}}>
    <option disabled selected>Subject name</option>
    {
        subjects.allsubjects&&subjects.allsubjects.map((s)=>
            {
                return(<option>{s.subjectname}</option>)
            }
        )
        
    }    
    </select><br/>
    <label for="noq">No of questions</label>
    <input type="number" id="noq" value={users.noq} onChange={(e)=>{setusers({...users,noq:e.target.value})}}/><br /><br />
    <label for="Examschedule">Examschedule(date):</label>
    <input type="date" id="Examschedule" name="Examschedule" onChange={(e)=>{setusers({...users,date:e.target.value})}}/>
    <br /><br />
    <button className="btn btn-primary" onClick={() => {
    axios.post("http://localhost:8080/addexam", {
        u: { username: users.username },
        date: users.date,
        s: { subjectname: subjects.subjectname },
        noq: users.noq
    })
    .then((res) => {
        console.log("exam added");
        axios.post("http://localhost:8080/generateqp", {
            examid:res.data.examid,
            noq: users.noq,
            s: { subjectname: subjects.subjectname }
        })
        .then((res) => {
            console.log("qp generated");
            setusers({ ...users, username: "", date: "", noq: "" });
            setsubjects({...subjects, subjectname: ""});
            alert("success");
        })
        .catch((error) => {
            console.error("Error generating qp:", error);
        });
    })
    .catch((error) => {
        console.error("Error adding exam:", error);
    });
}}>Schedule Exam</button>

    </> );
}
 
export default Addexam;