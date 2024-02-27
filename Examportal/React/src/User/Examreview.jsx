import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Examreview = () => {
    const [e, setE] = useState([]);
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state && state.qpid) {
            axios.post("http://localhost:8080/getreview", { qpid: state.qpid })
                .then((res) => {
                    console.log(res.data);
                    setE(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching review data:", error);
                });
        }
    }, [state]);

    return (
        <>
            <h1>Your exam Review</h1>
            {state && <h4>Your total mark: {state.totalmarks}</h4>}
            <div style={{ display: "flex" }}>
                {state && state.q && e.map((review, index) => (
                    <button key={index} className={`btn ${review.mark === 1 ? 'btn-success' : 'btn-danger'}`}>
                        {state.q[index].id}
                    </button>
                ))}
            </div>
        </>
    );
}

export default Examreview;
