import React, { useEffect, useState, useRef } from "react";

import "../Login.css";
import { auth, db } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { ExpenseList } from "./ExpenseList";
import { ImageUpload } from "./ImageUpload";

export const AddExpense = () => {
  const enteredTitleRef = useRef()
  const enteredAmountRef = useRef()
  const enteredTypeRef = useRef()
  const enteredDateRef = useRef()
  const [user, setuser] = useState(null);
  const [image, setimage] = useState(null)
  // const [enteredTitle, setEnteredTitle] = useState("");
  // const [enteredAmount, setEnteredAmount] = useState("");
  // const [enteredType, setenteredType] = useState("");
  // const [enteredDate, setenteredDate] = useState("");
  const [money, setmoney] = useState(0);

  const [transactions, settransactions] = useState([
    // {
    //     id: 1,
    //     name: "ubaid",
    //     Type: "expense",
    //     price: "10"
    // },
    // {
    //     id: 2,
    //     name: "Ansar",
    //     Type: "expense",
    //     price: "12"
    // }
  ]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else setuser(null);
    });
  }, []);


  // const amountChangeHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  // };

  // const TypeChangeHandler = (event) => {
  //   setenteredType(event.target.value);
  // };
  const logout = () => {
    auth.signOut();
  };

  const addtodo = (e) => {
    e.preventDefault();
    const enteredTitleRefValue = enteredTitleRef.current.value;
    const enteredAmountRefValue = enteredAmountRef.current.value;
    const enteredTypeRefValue = enteredTypeRef.current.value;
    const enteredDateRefValue = enteredDateRef.current.value;
    const updatedTransactions = transactions;
    updatedTransactions.push({
      id: updatedTransactions.length,
      name: enteredTitleRefValue,
      Type: enteredTypeRefValue,
      price: enteredAmountRefValue,
      date: enteredDateRefValue,
      //   Type: enteredTypeRefValue,
      //   price: enteredAmountRefValue,
      //   date: enteredDateRefValue,
      // });
    })
    db.collection("expense_calculator")
      .doc(user.uid)
      .set({
        ...updatedTransactions,
      })
      .then((element) => {
        settransactions(updatedTransactions);

      })
      .catch((error) => {
        //error callback

        alert("error ", error);
      });
  };
 

  return (
    <>
      <ToastContainer />
      <div className="container ">
        <div className="row mt-5">
          <div className="col-md-6 login__container">
            <h1 className="mb-5">Your Balance : {money} </h1>
            <div className="row mb-5">
              <div className="col-md-6  card">
                <h5>Recent Deposit</h5>
                <p>$ 12</p>
              </div>
              <div className="col-md-6 card">
                <h5>Recent Expense</h5>
                <p>$ 12</p>
              </div>
            </div>
            <form>
              <div className="form-row row mb-5">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    ref={enteredTitleRef}
                    // onChange={(e) => setEnteredTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    min="0.01"
                    step="0.01"
                    // onChange={amountChangeHandler}
                    ref={enteredAmountRef}
                    placeholder="Amount"
                  />
                </div>
              </div>
              <div className="form-row row">
                <div className="form-group col-md-6">
                  <select
                    name="type"
                    className="form-control"
                    // onChange={TypeChangeHandler}
                    ref={enteredTypeRef}
                  >
                    <option value="0">Type</option>
                    <option value="expense">Expense</option>
                    <option value="deposit">Deposit</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="date"
                    className="form-control"
                    id="inputPassword4"
                    placeholder="Date"
                    // onChange={(e) => setenteredDate(e.target.value)}
                    ref={enteredDateRef}
                  />
                </div>
              </div>

              <div className="login__container">
                <button className="btn btn-dark " onClick={addtodo}>
                  Add Expense
                </button>
                <button className="btn btn-primary mt-5" onClick={logout}>
                  Logout
                </button>
              </div>
            
            </form>
          </div>
          <div className="col-md-6">
            <ExpenseList />
          </div>
          <ImageUpload/>
        </div>

      </div>
    </>
  );
};
