import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Task.css"; // Import the CSS file for styling
import Taskmanagemt from "./Taskmanagemt";
import axios from "axios";
const Task = () => {
  const location = useLocation();
  const { id, userid, ob } = location.state || {}; // Extracting state

  const boardName = ob && ob.length > 0 ? ob[0].Board_Name : "Board Name";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    status: "to_do",
    userId: userid || "",
    remaining_hours: "",
    capacity_hours: "",
    task_priority: "high",
    boardId: id || "",
    task_name: "",
    spend_hours: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const {
      spend_hours,
      task_name,
      task_priority,
      capacity_hours,
      remaining_hours,
      status,
      boardId,
    } = formData;
    const tokenString = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:6969/task/create",
        {
          spend_hours,
          task_name,
          task_priority,
          boardId,
          capacity_hours,
          remaining_hours,
          status,
        },
        { headers: { Authorization: "Bearer " + tokenString } }
      )
      .then((result) => {
        if (result.data.status === 404) {
        } else {
        }
      })
      .catch((err) => {
        console.error("Error during board creation:", err);
      });
    closeModal();
  };

  return (
    <div className="task-container">
      <div className="top-bar">
        <h1 className="board-name">{boardName}</h1>
      </div>
      <div className="sidebar">
        <h3 className="sidebar-heading">Navigation</h3>
        <ul className="sidebar-list">
          <li>
            <button className="sidebar-button" onClick={openModal}>
              Create Task
            </button>
          </li>
        </ul>
      </div>
      {!isModalOpen ? (
        <Taskmanagemt />
      ) : (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Status:
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="to_do">TO_DO</option>
                  <option value="doing">DOING</option>
                  <option value="done">DONE</option>
                </select>
              </label>

              <label>
                Remaining Hours:
                <input
                  type="text"
                  name="remaining_hours"
                  value={formData.remaining_hours}
                  onChange={handleChange}
                />
              </label>
              <label>
                Capacity Hours:
                <input
                  type="text"
                  name="capacity_hours"
                  value={formData.capacity_hours}
                  onChange={handleChange}
                />
              </label>
              <label>
                Task Priority:
                <input
                  type="text"
                  name="task_priority"
                  value={formData.task_priority}
                  onChange={handleChange}
                />
              </label>
              <label>
                Task Name:
                <input
                  type="text"
                  name="task_name"
                  value={formData.task_name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Spend Hours:
                <input
                  type="text"
                  name="spend_hours"
                  value={formData.spend_hours}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
