import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Addsubject = () => {
  const nav = useNavigate();
  const [subject, setSubject] = useState({ subjectname: '', allsubtopic: [] });

  return (<>
    <div>
    <button 
      type="button"
      className="btn btn-outline-primary"
      onClick={()=>{
      nav("/allsubject"); 
       }}
      >Back</button>
    </div>
    <div>
      <h2>Add Subject</h2>
      <div class="form-group">
        <label for="name">Subject Name</label>
        <input type="text" class="form-control" id="name"
        value={subject.subjectname} onChange={(e)=>{setSubject({...subject,subjectname:e.target.value})}}/>
      </div>
    
      <button class="btn btn-primary" onClick={()=>{axios.post("http://localhost:8080/addsubject",{subjectname:subject.subjectname}).then((res)=>{
        nav("/addsubtopic",{state:{subject:res.data}})
      })}}>addsubtopics</button>
    </div>
    </>);
};

export default Addsubject;



