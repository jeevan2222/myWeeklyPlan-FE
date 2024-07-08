import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Taskmanahement.css";
import axios from "axios";

const initialTasks = {
  to_do: [],
  doing: [],
  done: [],
};

const Taskmanagement = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const fetchData = async () => {
    try {
      const tokenString = localStorage.getItem("token");
      const boardid = localStorage.getItem("boardId");
      const result = await axios.get(`http://localhost:6969/task/${boardid}`, {
        headers: { Authorization: "Bearer " + tokenString },
      });
      console.log("Task Data:", result.data);

      const updatedTasks = { ...initialTasks };
      result.data.BoardData.forEach((ele1) => {
        if (updatedTasks[ele1.status]) {
          updatedTasks[ele1.status].push({
            content: ele1.task_name,
            id: ele1.id,
            priority: ele1.task_priority,
            remaining_hours: ele1.remaining_hours,
            spend_hour: ele1.spend_hours,
          });
        }
      });

      setTasks(updatedTasks);
      console.log("Updated Tasks:", updatedTasks);
    } catch (err) {
      console.error("Error during board creation:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = tasks[source.droppableId];
    const finish = tasks[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start);
      const [movedTask] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, movedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: newTaskIds,
      }));
      return;
    }

    const startTaskIds = Array.from(start);
    const [movedTask] = startTaskIds.splice(source.index, 1);
    const finishTaskIds = Array.from(finish);
    finishTaskIds.splice(destination.index, 0, movedTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: startTaskIds,
      [destination.droppableId]: finishTaskIds,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="taskmanagement-container">
        <div className="task-status-container">
          {Object.keys(tasks).map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="task-status-column"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2>{status.replace("_", " ")}</h2>
                  {tasks[status].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.content} <br></br>
                          <p
                            style={{
                              color: "rgb(255, 99, 71)",
                              display: "inline",
                            }}
                          >
                            <h3>Priority</h3> {task.priority}
                          </p>
                          {/* <h3>Priority</h3> {task.remaining_hours} <br></br>
                          {task.spend_hour} */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Taskmanagement;
