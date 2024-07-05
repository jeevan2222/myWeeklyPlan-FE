import React, { useState } from "react";
import Board from "./Board";
import "./Dashboard.css";
import Displaydash from "./Displaydash";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [addBoard, setAddBoard] = useState(false);
  const [boards, setBoards] = useState([]); 

  const handleChange = (e) => {
    setAddBoard(true);
  };

  // Function to handle board creation and update the dashboard
  const handleBoardCreation = (newBoard) => {
    setBoards([...boards, newBoard]); 
    setAddBoard(false); 
  }
 const  logout=(e)=>{
    localStorage.clear();
    window.location.href = '/';
}
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
          {/* <h2>Log-Out</h2> */}
          <ul>
        
          {/* <li key='/'>
            <Link>{}</Link>
          </li> */}
<div className="lg-btn">
   <a href="#" onClick={()=>logout()}>LOGOUT</a>
</div>
      </ul>
          <marquee>
            <h4>Create. Plan. Achieve.</h4>
          </marquee>
        </div>
        {addBoard ? <Board onBoardCreated={handleBoardCreation} /> : <Displaydash />}
      </div>
    </div>
  );
};

export default Dashboard;
