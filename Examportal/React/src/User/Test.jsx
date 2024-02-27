import { useLocation, useNavigate } from "react-router-dom";

const Test = () => {
    const nav = useNavigate();
    const location=useLocation();
    const{state}=location;
    const searchParams = new URLSearchParams(location.search);
    const stateData = JSON.parse(decodeURIComponent(searchParams.get('state')));

  return (
    <>
      <div style={styles.container}>
        <p style={{ fontWeight: "bold", fontSize: 25, marginTop: "2%", paddingLeft: 20 }}>
          Read the Instruction Carefully !!
        </p>
        <p style={{ ...styles.listItem,fontStyle: "italic", fontSize: 16 }}>
          📝 You have {stateData.exam.noq} MCQ Questions to attend with {stateData.exam.noq} mins.
          <br />
          📝 You also have bookmark option for easy access of any question at later time.
          <br />
          📝 You can also view your exam summary for your exam status.
          <br />
          📝 You can also see the answered and not-answered question in different colors.
          <br />
          📝 Click on 'Start Test' button to begin your test.
          <br />
          📝 You can also see the number of correct and wrong answers you got in each question.
          <br />
          📝 <b>If you navigate out of the window your exam will end automatically</b> 
        </p>
        
        <button  className="btn btn-primary" onClick={() =>{nav("/taketest",{state:{exam:stateData.exam}})} }>Start Test</button>
      </div>
    </>
  );
};

const styles = {
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    listItem: {
      fontSize: 16,
      paddingLeft:20,
    },
  };

 
export default Test;