import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Displaydash.css";
import Task from "./Task";
import Taskmanagemt from "./Taskmanagemt";
import { useNavigate } from "react-router-dom";
const Displaydash = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "Board_Name" },
    { field: "From_Date" },
    { field: "To_Date" },
    { field: "Capacity" },
    { field: "Authour" },
  ]);

  const fetchData = async () => {
    try {
      const tokenString = localStorage.getItem("token");
      const result = await axios.get("http://localhost:6969/board", {
        headers: { Authorization: "Bearer " + tokenString },
      });

      const rowData = result.data.BoardData.map((board) => ({
        id: board.id,
        userid: board.userId,
        Board_Name: board.board_name,
        From_Date: board.from_date.split("T")[0],
        To_Date: board.to_date.split("T")[0],
        Capacity: board.capacity,
        Authour: board["user.name"],
      }));

      setRowData(rowData);
    } catch (err) {
      console.error("Error during board creation:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelectionChanged = (event) => {
    const selectedRows = event.api.getSelectedRows();
    if (selectedRows.length > 0) {
      const selectedRowId = selectedRows[0].id;
      const userid = selectedRows[0].userid;
      let array = [];
      array = [...selectedRows];
      localStorage.setItem("boardId", array[0].id);
      navigate("/create-task", {
        state: { id: selectedRowId, userid: userid, ob: array },
      });

      console.log("Selected row ID:", array);
    }
  };

  return (
    <div className="displaydash-container">
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          rowSelection="single"
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default Displaydash;
