import "./Board.css";
import React, { useState } from "react";

const Board = () => {
  const [data, setData] = useState({
    board_name: "",
    number_of_days: "",
    capacity: "",
    to_date: "",
    from_date: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // document.contact-form.reset();
    console.log("Form Data Submitted: ", data);
  };

  const { board_name, number_of_days, capacity, to_date, from_date } = data;

  return (
    <div className="board">
      <p>Create Your Board</p>
      <form className="form-data" onSubmit={handleSubmit}>
        <label>
          Board Name:
          <input
            type="text"
            name="board_name"
            placeholder="Enter Your Board Name"
            value={board_name}
            onChange={changeHandler}
          />
        </label>
        <br />
        <label>
          To Date:
          <input
            type="date"
            name="to_date"
            placeholder="Enter To Date"
            value={to_date}
            onChange={changeHandler}
          />
        </label>
        <br />
        <label>
          From Date:
          <input
            type="date"
            name="from_date"
            placeholder="Enter From Date"
            value={from_date}
            onChange={changeHandler}
          />
        </label>
        <br />
        <label>
          Total Capacity:
          <input
            type="text"
            name="capacity"
            placeholder="Total Capacity"
            value={capacity}
            onChange={changeHandler}
          />
        </label>
        <br />
        <label>
          Total Number Of Days:
          <input
            type="text"
            name="number_of_days"
            placeholder="Total Number Of Days"
            value={number_of_days}
            onChange={changeHandler}
          />
        </label>
        <br />
        {/* <input  type="submit">Submit</input> */}
        <input type="button" value="Submit" id="btnsubmit" onclick="handleSubmit()"></input>
      </form>
    </div>
  );
};

export default Board;
