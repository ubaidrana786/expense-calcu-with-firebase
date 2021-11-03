import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth } from "../firebase";
export const Todo = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [currentUID, setcurrentUID] = useState(auth.user)
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  const addtodo = () => {};
console.log(currentUID)
  return (
    <div>
      <h1 className="mt-5">Todo</h1>
      <div className="login">
        <div className="login__container">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
           <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
             <label>Date</label>
          <input
            type='date'
            min='2019-01-01'
            max='2022-12-31'
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <button className="login__btn" onClick={addtodo}>
          add
        </button>
      </div>
    
    </div>
  );
};
