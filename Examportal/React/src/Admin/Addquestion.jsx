import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Addquestion = () => {
    const nav=useNavigate();
    const[data,setdata]=useState({question:"",o1:"",o2:"",o3:"",o4:"",ans:"",allsubtopics:[],selectedst:"",mark:""});
    const[s,sets]=useState({allsubjects:[],selecteds:""});
    useEffect(()=>{
        axios.get("http://localhost:8080/viewallsubject").then((res)=>{sets({...s,allsubjects:res.data})})
    },[])

    return (  <>
    <button  className="btn btn-primary" onClick={()=>{nav("/allquestions")}}>back</button>
    <div>
        <label for="name">Enter Question:</label>
        <input  type="text"  class="form-control" placeholder="enter question" value={data.question} onChange={(e)=>{setdata({...data,question:e.target.value})}}  /><br/>
        <label for="name">Enter option 1:</label>
        <input  type="text"  class="form-control" placeholder="enter option1" value={data.o1} onChange={(e)=>{setdata({...data,o1:e.target.value})}}  /><br/>
        <label for="name">Enter option 2:</label>
        <input  type="text"  class="form-control" placeholder="enter option2" value={data.o2} onChange={(e)=>{setdata({...data,o2:e.target.value})}}  /><br/>
        <label for="name">Enter option 3:</label>
        <input  type="text"  class="form-control" placeholder="enter option3" value={data.o3} onChange={(e)=>{setdata({...data,o3:e.target.value})}}  /><br/>
        <label for="name">Enter option 4:</label>
        <input  type="text"  class="form-control" placeholder="enter option4" value={data.o4} onChange={(e)=>{setdata({...data,o4:e.target.value})}}  /><br/>
        <label for="name">Select Right Answer</label>
        
    <select class="form-select" id="sel1" name="sellist1" onChange={(e)=>{setdata({...data,ans:e.target.value})}}>
    <option disabled selected>
            Right Answer
          </option>
        <option >{data.o1}</option>
        <option >{data.o2}</option>
        <option >{data.o3}</option>
        <option >{data.o4}</option>
    </select>

    <label for="name">Enter mark:</label>
    <input  type="number"  class="form-control" placeholder="Enter mark" value={data.mark} onChange={(e)=>{setdata({...data,mark:e.target.value})}}  /><br/>
    
    <label for="name">Select Subject</label>
    <select class="form-select" id="sel1" name="sellist1" onChange={(e)=>{
        axios.post("http://localhost:8080/getsubtopics",{
            subjectname:e.target.value
            }).then((res)=>{setdata({...data,allsubtopics:res.data});sets({...s,selecteds:e.target.value});})}}>
    <option disabled selected>Subject</option>
        {
            s.allsubjects&&s.allsubjects.map((s1)=>{
                return(<option>{s1.subjectname}</option>)
            })

        }
    </select>

    <label for="name">Select Subtopic</label>
    <select class="form-select" id="sel1" name="sellist1" onChange={(e)=>{setdata({...data,selectedst:e.target.value})}}>
    <option disabled selected>
            Subtopic
          </option>
        {
            data.allsubtopics&&data.allsubtopics.map((st)=>{
                return(<option>{st.subtopicname}</option>)
            })

        }
    </select>

        <button className="btn btn-primary"onClick={()=>{axios.post("http://localhost:8080/addquestion",{
            question:data.question,
            op1:data.o1,
            op2:data.o2,
            op3:data.o3,
            op4:data.o4,
            rightans:data.ans,
            mark:data.mark,
            st:{subtopicname:data.selectedst}
            }).then((res)=>{
                alert("success");
                setdata({...data,question:"",o1:"",o2:"",o3:"",o4:"",ans:"",mark:"",selectedst:""});
            })
            }}>submit</button>
    </div>
    </>);
}
 
export default Addquestion;