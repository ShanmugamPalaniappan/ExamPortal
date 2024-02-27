import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import Question from "./Question";
import axios from "axios";
import './Style.css';
import { Modal, Button } from 'react-bootstrap';


const Taketest = () => {
  const nav = useNavigate();
  const [q, setq] = useState([]);
  const [f, setf] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const location=useLocation();
  const{state}=location;
  const[qpid,setqpid]=useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const handleButtonClick = (id) => {
    setf(id - 1);
    setShowOptions(false);
  };
  

  useEffect(() => {
    let focusCounter = 0;
    // Function to close the window if it has been focused three times
    const checkFocusCounter = () => {
        if (focusCounter === 3) {
          axios.post("http://localhost:8080/changeexamstatus",{examid:state.exam.examid,
          status:"closed"}).then((res)=>{console.log(res.data,"closed"); 
          window.close();
        })
        }
    };
    
    // Listen for the focus event on the window
    window.addEventListener('focus', () => {
        focusCounter++;
        checkFocusCounter();
    });
    window.addEventListener('beforeunload', () => {
      // Call your function here
      console.log('Window is closing!');
      // You can call any function you want here
      axios.post("http://localhost:8080/changeexamstatus",{examid:state.exam.examid,
          status:"closed"}).then((res)=>{console.log(res.data,"closed");
    });
    })
    
  }, []);
  useEffect(() => {
    axios.post("http://localhost:8080/getqp",{examid:state.exam.examid}).then((res)=>{console.log(res.data);
    var l=[];
    setqpid(res.data[0].qp.qpid)
    for(var i1=0;i1<res.data.length;i1++)
    {
      var q1=res.data[i1].q;
      q1.selected=res.data[i1].userans;
      l.push(q1);
    }
    var i = 1;
    const x = l.map((k) => {
      k.id = i++;
      k.bookmark = false;
      return k;
    });
    setq(x);})

  }, []);

  const selectanswer = (id, ans) => {
    const x = q.map((k) => {
      if (k.id === id) {
        k.selected = ans;
        axios.post("http://localhost:8080/selectanswer",{userans:ans,q:{qid:k.qid},qp:{qpid:qpid}}).then((res)=>{console.log(res.data)});
      }
      return k;
    });
    setq(x);
  };

  const bookmarkfun = (i) => {
    const x = q.map((k) => {
      if (k.id === i) {
        k.bookmark = !k.bookmark;
      }
      return k;
    });
    setq(x);
  };
  const calculateMarks = () => {
    window.localStorage.removeItem("time");
    let marks = 0;
    q.forEach((question) => {
      if (question.selected === question.rightans) {
        axios.post("http://localhost:8080/setmark",{mark:question.mark,q:{qid:question.qid},qp:{qpid:qpid}}).then((res)=>{console.log(res.data)})
        marks += question.mark;
      }
    });
    console.log(marks);
    axios.post("http://localhost:8080/totalmark",{qpid:qpid,mark:marks}).then((res)=>{console.log(res.data)})
    axios.post("http://localhost:8080/changeexamstatus",{examid:state.exam.examid,status:"completed"}).then((res)=>{console.log(res.data);nav("/examreview",{state:{totalmarks:marks,qpid:qpid,q:q}})})
    
  };
  
return (

  <div style={{backgroundColor:"#99c3e2",height:"100vh",paddingTop:"15vh"}}>

  <div className="container card" id="c" style={{ paddingLeft:"3vw",paddingRight:"3vw",paddingTop:"3vh",paddingBottom:"3vh",borderRadius:"1vw" }}>
    <div style={{display:"flex",justifyContent:"space-between"}}>
      <button className="btn btn-primary " onClick={()=>{setIsModalOpen1(true)}}>Exam Summary</button>
      <CountdownTimer noq={state.exam.noq} calculateMarks={calculateMarks} />
    </div>
    {q.length !== 0 && (
      <div>
        <div style={{marginTop:"5vh"}}>
          <Question
            r={q[f]}
            selectanswer={selectanswer}
            bookmarkfun={bookmarkfun}
          />
        </div>
        
        <div style={{marginTop:"10vh"}}>
          {f === 0 ? (
         
            <button disabled className="btn btn-primary">previous</button>
          ) : (

            <button className="btn btn-primary"
              onClick={() => {
                if (f > 0) {
                  setf(f - 1);
                }
              }}
            >
              previous
            </button>
          )}
         
          <button className="btn btn-primary" style={{marginLeft:"5vw"}}
            onClick={() => {
              if (f < q.length - 1) {
                setf(f + 1);
              }
            }}
          >
            next
          </button>
          <button className="btn btn-primary" style={{marginLeft:"61.2vw"}} onClick={()=>{setIsModalOpen(true)}}>submit</button>

              
        </div>
      </div>
    )}
    <Modal show={isModalOpen} onHide={()=>{setIsModalOpen(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>Warning ⚠️ ⚠️</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to submit?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={()=>{setIsModalOpen(false)}}>
          No
        </Button>
        <Button variant="primary" onClick={() => { calculateMarks(); }}>
          Yes
        </Button>

      </Modal.Footer>
    </Modal>

    <Modal show={isModalOpen1} onHide={()=>{setIsModalOpen1(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>Exam Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {q.map((r) => (
          r.bookmark?<button className="btn btn-danger" onClick={() =>{handleButtonClick(r.id);setIsModalOpen1(false)} }  >{r.id}</button>
          :r.selected?<button className="btn btn-success" onClick={() =>{handleButtonClick(r.id);setIsModalOpen1(false)}}>{r.id}</button>
          :<button className="btn btn-primary" onClick={() =>{handleButtonClick(r.id);setIsModalOpen1(false)}}>{r.id}</button>
          ))}
        </div><br />
        <p>🟥 Bookmarked 🟩Attended 🟦Not Attended</p>
      </Modal.Body>
    </Modal>
  </div>
  </div>
);
};

export default Taketest;