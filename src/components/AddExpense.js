import React, {useEffect, useState,} from "react";
import {useHistory} from "react-router";
import "./Login.css";
import {auth, db} from "../firebase";

export const AddExpense = () => {
    const history = useHistory()
    const [user, setuser] = useState(null)
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredType, setenteredType] = useState("");
    const [money, setmoney] = useState(0);
    const [transactions, settransactions] = useState([
        {
            id: 1,
            name: "ubaid",
            Type: "expense",
            price: "10"
        },
        {
            id: 2,
            name: "Ansar",
            Type: "expense",
            price: "12"
        }
    ]);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setuser(user)

            } else setuser(null)
        })


    }, [])

    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };

    const TypeChangeHandler = (event) => {
        setenteredType(event.target.value);
    };
    const logout = () => {
        auth.signOut()
    }

    const addtodo = () => {
        const updatedTransactions = transactions;
        updatedTransactions.push(
            {
                id: transactions.length,
                name: enteredTitle,
                Type: enteredType,
                price: enteredAmount,
            }
        );

        console.log(updatedTransactions)

        db.collection("expense_calculator").doc(user.uid).set({
            ...updatedTransactions

        }).then((element) => {
            settransactions(updatedTransactions);
        }).catch((error) => {
            //error callback
            alert('error ', error)
        });
    };

    const Fetchdata = () => {
        db.collection("expense_calculator").get(user.uid).then((querySnapshot) => {

            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                const data = element.data();
                settransactions(arr => [...arr, data]);
            });
            console.log(transactions)
        })
    }

    return (
        <>
            <div className=" login__container">

                <h1 className="mt-5">Expense Calculator</h1>
                <div className="container w-50">
                    <div className="login__container">
                        <label>Title</label>
                        <input
                            type="text"
                            className="login__textBox"
                            onChange={(e) => setEnteredTitle(e.target.value)}
                        />
                        <label>Amount</label>
                        <input
                            type='number'
                            className="login__textBox"
                            min='0.01'
                            step='0.01'
                            value={enteredAmount}
                            onChange={amountChangeHandler}
                        />
                        <label></label>
                        <select name="type"
                                className="login__textBox"
                                onChange={TypeChangeHandler}
                                value={enteredType}>

                            <option value="0">Type</option>
                            <option value="expense">Expense</option>
                            <option value="deposit">Deposit</option>
                        </select>
                    </div>

                    <div className="login__container">
                        <button className="btn btn-dark " onClick={addtodo}>
                            Add Expense
                        </button>
                        <button className="btn btn-primary mt-5" onClick={logout}>Logout</button>

                    </div>
                </div>


            </div>
            <div className="w-50" style={{margin: "auto"}}>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                    </thead>
                    <tbody>

                    {transactions.map((item) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.Type}</td>
                            </tr>
                        );
                    })}


                    </tbody>
                </table>
            </div>
        </>
    );
};
