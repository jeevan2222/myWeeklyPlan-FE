import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Displaydash.css"; // Assuming you will use this CSS file

const Displaydash = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: 'Board_Name' },
    { field: 'To_Date' },
    { field: 'From_Date' },
    { field: 'Capacity' },
    { field: 'Created_By' },
  ]);

  const fetchData = async () => {
    try {
      const tokenString = localStorage.getItem("token");
      const result = await axios.get("http://localhost:6969/board", {
        headers: { Authorization: "Bearer " + tokenString }
      });

      const rowData = result.data.BoardData.map(board => ({
        Board_Name: board.board_name,
        To_Date: board.to_date.split("T")[0],
        From_Date: board.from_date.split("T")[0],
        Capacity: board.capacity,
        Created_By: board['user.name']
      }));

      setRowData(rowData);
    } catch (err) {
      console.error("Error during board creation:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="displaydash-container">
      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default Displaydash;
