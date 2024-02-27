

import { useNavigate } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {
    const[exam,setexam]=useState("");
    const[b,setb]=useState(0);
    useEffect(()=>{
        axios.post("http://localhost:8080/getexam",{userid:window.localStorage.getItem("id")}).then((res)=>{
            
            if(res.data.length!==0)
            {
                setexam(res.data)
            }
            })
    },[b])
    const nav=useNavigate();
    console.log(exam);
    return ( <>
    <SideNavbar/>
    <h1>welcome {window.localStorage.getItem("name")}</h1>
            {exam&&exam!==""?
                <table className="table table-bordered">
            <thead>
            <th>Exam Name</th>
            <th>take Exam</th>
            </thead>
            <tbody>
            
                {exam.map((e)=>
                (<>
                <tr>
                    <td>{e.s.subjectname}</td>
                    <td>{e.status==="scheduled"
                    ?<button className="btn btn-primary" 
                    onClick={()=>{
                        axios.post("http://localhost:8080/changeexamstatus",{
                            examid:e.examid,
                            status:"started"
                        }).then((res)=>{
                            setb(b+1);
                            console.log(res.data)
                        });
                        const stateData = encodeURIComponent(JSON.stringify({ exam: e}));
                        // eslint-disable-next-line no-restricted-globals
                        const width = window.screen.availWidth;
                        // eslint-disable-next-line no-restricted-globals
                        const height = window.screen.availHeight;
                        window.open(`http://localhost:3000/test?state=${stateData}`, '_blank',`width=${width},height=${height}`)
                        window.location.reload();
                    }}>take test</button>
                    :e.status==="started"
                    ?<button disabled className="btn btn-success">Resume</button>
                    :e.status==="resume"
                    ?<button className="btn btn-success" 
                    onClick={()=>{
                        axios.post("http://localhost:8080/changeexamstatus",{
                            examid:e.examid,
                            status:"started"
                        }).then((res)=>{
                            console.log(res.data)
                        });
                        const stateData = encodeURIComponent(JSON.stringify({ exam: e }));
                        // eslint-disable-next-line no-restricted-globals
                        const width = window.screen.availWidth;
                        // eslint-disable-next-line no-restricted-globals
                        const height = window.screen.availHeight;
                        window.open(`http://localhost:3000/test?state=${stateData}`, '_blank',`width=${width},height=${height}`);
                        window.location.reload();
                        }}>Resume</button>
                    :<button className="btn btn-danger" disabled>Resume</button>}</td>
                </tr>
                </>
                ))}
            
            </tbody>
            </table>:<p>You have no test available now</p>

            }
    </> );
}
 
export default Home;