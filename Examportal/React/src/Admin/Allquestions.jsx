import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";

const Allquestions = () => {
    const[question,setquestion]=useState([]);
    const nav=useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/viewallquestion")
        .then((res)=>{
            setquestion(res.data);
            console.log(res.data);
        })
        .catch((error)=>{
            console.error("error",error);
        });
    }, []);
    return ( <>
    <AdminNav/>
    <button  class="btn btn-primary" onClick={()=>{nav("/addquestion")}}>addquestion</button>
    <div>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <td>Questionid</td>
                    <td>Question</td>
                    <td>Option 1</td>
                    <td>Option 2</td>
                    <td>Option 3</td>
                    <td>Option 4</td>
                    <td>Correct Answer</td>
                    <td>mark</td>
                </tr>
            </thead>
            <tbody>
                {question && question.map((q)=>{
                    return(
                    <tr>
                    <td>{q.qid}</td>
                    <td>{q.question}</td>
                    <td>{q.op1}</td>
                    <td>{q.op2}</td>
                    <td>{q.op3}</td>
                    <td>{q.op4}</td>
                    <td>{q.rightans}</td>
                    <td>{q.mark}</td>
                    </tr>
                    )
                })

                }
            </tbody>
        </table>
    </div>
    </> );
}
 
export default Allquestions;