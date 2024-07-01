import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="side-nav">
        <ul>
          <li>
            <a href="">Create Board</a>
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
    </div>
  );
};

export default Dashboard;
