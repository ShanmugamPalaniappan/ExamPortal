import React from "react";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

const Question = ({ r, selectanswer, bookmarkfun }) => {
  return (
    <div >
      <div style={{ fontWeight: "bold", fontSize: 24 }}>
        {r.id + "." + r.question}
      </div>
      <div >
      {r.bookmark ? (
        <FaBookmark 
        onClick={() => bookmarkfun(r.id)} size={20}/>
      ) : (  
        <FaRegBookmark 
        onClick={() => bookmarkfun(r.id) }size={20}
        />
      )}
      </div>
      <div style={{marginTop:"2vh"}}>
        <div>
        <input
          type="radio"
          id={r.op1}
          name={r.id}
          value={r.op1}
          checked={r.selected === r.op1}
          onChange={(e) => selectanswer(r.id, e.target.value)}
          style={styles.radioButtonItem}
        />
        <label htmlFor={r.op1} style={styles.radioButtonLabel}>
          {r.op1}
        </label>
        </div>
        <div>
        <input
          type="radio"
          id={r.op2}
          name={r.id}
          value={r.op2}
          checked={r.selected === r.op2}
          onChange={(e) => selectanswer(r.id, e.target.value)}
          style={styles.radioButtonItem}
        />
        <label htmlFor={r.op2} style={styles.radioButtonLabel}>
          {r.op2}
        </label>
        </div>
        <div>
        <input
          type="radio"
          id={r.op3}
          name={r.id}
          value={r.op3}
          checked={r.selected === r.op3}
          onChange={(e) => selectanswer(r.id, e.target.value)}
          style={styles.radioButtonItem}
        />
        <label htmlFor={r.op3} style={styles.radioButtonLabel}>
          {r.op3}
        </label>
        </div>
        <div>
        <input
          type="radio"
          id={r.op4}
          name={r.id}
          value={r.op4}
          checked={r.selected === r.op4}
          onChange={(e) => selectanswer(r.id, e.target.value)}
          style={styles.radioButtonItem}
        />
        <label htmlFor={r.op4} style={styles.radioButtonLabel}>
          {r.op4}
        </label>
        </div>
      </div>
    </div>

  );
};

const styles = {
  container: {
    paddingLeft: 50,
    paddingRight: 20,
    marginTop: 100,
  },
  radioButtonItem: {
    marginRight: 15,
  },
  radioButtonLabel: {
    marginLeft: 5,
    fontSize:20
  },
};

export default Question;