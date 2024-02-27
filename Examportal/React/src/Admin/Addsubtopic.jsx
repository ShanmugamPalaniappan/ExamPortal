import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Addsubtopic = () => {

  const [name, setname] = useState();
  const location = useLocation();
  const { state } = location;
  const nav = useNavigate();
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          nav("/addsubject");
        }}
      >
        back
      </button>
      <div class="form-group">
        <label for="name">Subtopic Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>
      <div class="form-group">
        <label for="name">Subject Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          value={state.subject.subjectname}
          disabled
        />
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        onClick={() => {
          axios
            .post("http://localhost:8080/addsubtopic", {
              subtopicname: name,
              s: { subjectid: state.subject.subjectid },
            })
            .then((res) => {
              alert("success");
              setname("");
            });
        }}
      >
        submit
      </button>
    </>
  );
};

export default Addsubtopic;
