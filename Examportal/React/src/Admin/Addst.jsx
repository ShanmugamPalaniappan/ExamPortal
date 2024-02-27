import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Addst = () => {
  const nav = useNavigate();
  const [subtopic, setsubtopic] = useState({
    subtopicname: "",
    subjectname: "",
    allsubjects: [],
  });
  useEffect(() => {
    axios.get("http://localhost:8080/viewallsubject").then((res) => {
      setsubtopic({ ...subtopic, allsubjects: res.data });
    });
  }, []);
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          nav("/allsubtopic");
        }}
      >
        back
      </button>
      <div>
        <label for="sel1" class="form-label">
          Enter Subtopicname
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="enter subtopicname"
          value={subtopic.subtopicname}
          onChange={(e) => {
            setsubtopic({ ...subtopic, subtopicname: e.target.value });
          }}
        />
        <br />
        <label for="sel1" class="form-label">
          Select subject:
        </label>
        <select
          class="form-select"
          id="sel1"
          name="sellist1"
          onChange={(e) => {
            setsubtopic({ ...subtopic, subjectname: e.target.value });
          }}
        >
          <option disabled selected>
            Subjectname
          </option>
          {subtopic.allsubjects &&
            subtopic.allsubjects.map((s) => {
              return <option>{s.subjectname}</option>;
            })}
        </select>
        <button
          class="btn btn-primary"
          onClick={() => {
            axios
              .post("http://localhost:8080/addsubtopic", {
                subtopicname: subtopic.subtopicname,
                s: {
                  subjectname: subtopic.subjectname,
                },
              })
              .then((res) => {
                console.log(res.data);
                setsubtopic({
                  ...subtopic,
                  subtopicname: "",
                  subjectname: "",
                });

                alert("success");
              });
          }}
        >
          submit
        </button>
      </div>
    </>
  );
};

export default Addst;
