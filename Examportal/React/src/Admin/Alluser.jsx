
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "./AdminNav";
import { Button, Modal } from "react-bootstrap";

const Alluser = () => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({
        userid: "",
        username: "",
        password: "",
        email: "",
    });
    const nav = useNavigate();
    const[ismodalopen,setismodalopen]=useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/viewalluser")
            .then((res) => {
                setUsers(res.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const Update = () => {
        axios.put(`http://localhost:8080/updateuser/${userData.userid}`, {
            username: userData.username,
            password: userData.password,
            email: userData.email,
        })
        .then((res) => {
            setUsers(prevUsers => prevUsers.map(user =>
                user.userid === res.data.userid ? res.data : user
            ));
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    };

    const Delete = (userid) => {
        axios.post(`http://localhost:8080/delete/${userid}`)
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.userid !== userid));
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
            });
    };

    return (
        <>
            <AdminNav />
            <div>
                <button 
                type="button"
                className="btn btn-outline-primary"
                onClick={()=>{
                    nav("/adduser"); 
                }}
                >Add</button>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <td>Userid</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Password</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.userid}>
                            <td>{user.userid}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={() => {setUserData(user);setismodalopen(true)}}
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => Delete(user.userid)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={ismodalopen} onHide={()=>{setismodalopen(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label><b>Username :</b></label>
                    <input
                    style={{ borderRadius: "5px", margin: "5px", borderWidth: "1px", textAlign: "center", width: "75%" }}
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    /><br />
                    <label><b>Password &nbsp;: </b></label>
                    <input
                    style={{ borderRadius: "5px", margin: "5px", borderWidth: "1px", textAlign: "center", width: "75%" }}
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    /><br />
                    <label><b>Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </b></label>
                    <input
                    style={{ borderRadius: "5px", margin: "5px", borderWidth: "1px", textAlign: "center", width: "75%" }}
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    /><br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={()=>{setismodalopen(false)}}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={()=>{Update();setismodalopen(false)}}>
                    Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Alluser;







