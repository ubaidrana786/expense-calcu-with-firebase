import React, { useEffect, useState } from "react";

import "./Login.css";
import { auth, db } from "../firebase";

export const AddExpense = () => {
  const [user, setuser] = useState(null);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredType, setenteredType] = useState("");
  const [enteredDate, setenteredDate] = useState("");
  const [money, setmoney] = useState(0);
  const [info, setInfo] = useState([]);
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
  useEffect(() => {
    // getMarkers();
    const array = [];
    db.collection("expense_calculator")
      .get()
      .then((Snapshot) => {
        Snapshot.docs.forEach((element) => {
          let data = { ...element.data() };
          array.push(data);
          // setInfo(data);
          //  setInfo((arr) => [...arr, data]);
        });
        setInfo(array);
        console.log(info);
      });
  }, []);

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const TypeChangeHandler = (event) => {
    setenteredType(event.target.value);
  };
  const logout = () => {
    auth.signOut();
  };

  const addtodo = (e) => {
    e.preventDefault();
    const updatedTransactions = transactions;
    updatedTransactions.push({
      name: enteredTitle,
      Type: enteredType,
      price: enteredAmount,
      date: enteredDate,
    });

    // console.log(updatedTransactions)

    db.collection("expense_calculator")
      .doc(user.uid)
      .set({
        ...updatedTransactions,
      })
      .then((element) => {
        settransactions(updatedTransactions);
        setmoney(
          enteredType === "deposit"
            ? money + parseFloat(enteredAmount)
            : money - parseFloat(enteredAmount)
        );
      })
      .catch((error) => {
        //error callback
        alert("error ", error);
      });
  };

  return (
    <>
      <div className="container ">
        <div className="row mt-5">
          <div className="col-md-6 login__container">
            <h1 className="mb-5">Your Balance : {money} </h1>
            <div className="row mb-5">
              <div className="col-md-6  card">
                <h5>Deposit</h5>
                <p>$ 12</p>
              </div>
              <div className="col-md-6 card">
                <h5>Expense</h5>
                <p>$ 12</p>
              </div>
            </div>
            <form>
              <div className="form-row row mb-5">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setEnteredTitle(e.target.value)}
                    placeholder="Title"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    min="0.01"
                    step="0.01"
                    value={enteredAmount}
                    onChange={amountChangeHandler}
                    placeholder="Amount"
                  />
                </div>
              </div>
              <div className="form-row row">
                <div className="form-group col-md-6">
                  <select
                    name="type"
                    className="form-control"
                    onChange={TypeChangeHandler}
                    value={enteredType}
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
                    onChange={(e) => setenteredDate(e.target.value)}
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
            <h1>User Data</h1>
            <div className="" style={{ margin: "auto" }}>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Type</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {info.map((item) => {
                    // const { id, name, price, Type, date } = info[0];
                    return (
                      <tr key={item[0].id} >
                        <td>{item[0].name}</td>
                        <td>{item[0].price}</td>
                        <td>{item[0].Type}</td>
                        <td>{item[0].date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
