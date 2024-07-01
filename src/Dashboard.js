import React,{useState} from "react";
import Board from "./Board";
import "./Dashboard.css";
// import Board from "./Board";
const Dashboard = () => {
  const [addBoard, setAddBoard] = useState(false);
  const handleChange = (e) => {
    setAddBoard(true)
  };
  return (
    <div className="dashboard-container">
      <div className="side-nav">
        <ul>
          <li>
            <a onClick={handleChange}>Create Board</a>
          </li>
          <li>
            <a href="">Task List</a>
          </li>
          <li>
            <a href="">Personal Home</a>
          </li>
          <li>
            <a href="">Reading List</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="horizontal-bar">
          <marquee>
            <h4>Create. Plan. Achieve.</h4>
          </marquee>
        </div>
      </div>
      {addBoard?<Board />:""}
    </div>
  );
};

export default Dashboard;
