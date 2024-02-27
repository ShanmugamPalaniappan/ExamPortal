import { Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./User/Home"; 
import Alluser from "./Admin/Alluser";
import Admin from "./Admin/Admin";
import Adduser from "./Admin/Adduser";
import Allsubject from "./Admin/Allsubject";
import Addsubject from "./Admin/Addsubject";
import Addsubtopic from "./Admin/Addsubtopic";
import Allsubtopic from "./Admin/Allsubtopic";
import Addst from "./Admin/Addst";
import Allquestions from "./Admin/Allquestions";
import Addquestion from "./Admin/Addquestion";
import Addexam from "./Admin/Addexam";
import Test from "./User/Test";
import Taketest from "./User/Taketest";
import Pendingrequests from "./Admin/Pendingrequests";
import Examreview from "./User/Examreview";




const App = () => {
    return (
      <>
      
          <Routes>
          <Route path="/reg" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/alluser" element={<Alluser />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/adduser" element={<Adduser/>} />
          <Route path="/allsubject" element={<Allsubject/> } />
          <Route path="/addsubject" element={<Addsubject />} />
          <Route path="/allsubtopic" element={<Allsubtopic />}  />
          <Route path="/addsubtopic" element={<Addsubtopic/>} />
          <Route path="/addst" element={<Addst/>} />
          <Route path="/allquestions" element={<Allquestions/>} />
          <Route path="/addquestion" element={<Addquestion/>} />
          <Route path="/addexam" element={<Addexam/>} />
          <Route path="/test" element={<Test/>} />
          <Route path="/taketest" element={<Taketest/>} />
          <Route path="/pendingrequests" element={<Pendingrequests/>}/>
          <Route path="/examreview" element={<Examreview/>}/>
          </Routes>
  
      </>
    );
  };
  
  export default App;