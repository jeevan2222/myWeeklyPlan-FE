import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Taskmanahement.css";
import axios from "axios";

const initialTasks = {
  to_do: [
    { id: "task-1", content: "Design Homepage" },
    { id: "task-2", content: "Set up database" },
  ],
  doing: [{ id: "task-3", content: "Develop login feature" }],
  done: [{ id: "task-4", content: "Initial project setup" }],
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
    } catch (err) {
      console.error("Error during board creation:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

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
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, start[source.index]);

      setTasks({ ...tasks, [source.droppableId]: newTaskIds });
      return;
    }

    const startTaskIds = Array.from(start);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish);
    finishTaskIds.splice(destination.index, 0, start[source.index]);

    setTasks({
      ...tasks,
      [source.droppableId]: startTaskIds,
      [destination.droppableId]: finishTaskIds,
    });
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
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="task-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {task.content}
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
