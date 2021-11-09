import React, { Component } from 'react'
import "./Login.css";
import { auth, db } from "../firebase";
export default class ExpenseTracker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null,
            transactions: [],
            money: 0,

            transactionName: '',
            transactionType: '',
            price: '',


        }

    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
                  if (user) {
                    this.setState({
                        setuser:user
                        
                    })
                 
                  }
                  else this.setState({
                      setuser:null
                  })
                })
              
    }
     
    
    logout = () => {
        auth.signOut()
    }
    handleChange = input => e => {
        this.setState({
            [input]: e.target.value !== "0" ? e.target.value : ""
        });
    }

    addNewTransaction = () => {
        const { transactionName, transactionType, price, currentUID, money } = this.state;

       
            const BackUpState = this.state.transactions;
            BackUpState.push({
                id: BackUpState.length + 1,
                name: transactionName,
                type: transactionType,
                price: price,
                // user_id: currentUID
            });
            db.collection("expense_calculator").doc().set({

                id: BackUpState.length,
                name: transactionName,
                type: transactionType,
                price: price,
                // transactions: [...transactions]

            }).then((data) => {
                //success callback
                console.log('success callback');
                this.setState({
                    transactions: BackUpState,
                    money: transactionType === 'deposit' ? money + parseFloat(price) : money - parseFloat(price),
                    transactionName: '',
                    transactionType: '',
                    price: ''
                })
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            });
        
    }
    render() {
        return (
            <div>
                <div className=" login__container">

                    <h1 className="mt-5">Expense Calculator</h1>
                    <div className="container w-50">
                        <div className="login__container">
                            <label>Title</label>
                            <input
                                type="text"
                                className="login__textBox"
                                value={this.state.transactionName}
                                onChange={this.handleChange('transactionName')}
                            />
                            <label>Amount</label>
                            <input
                                type='number'
                                className="login__textBox"
                                min='0.01'
                                step='0.01'
                                value={this.state.price}
                                onChange={this.handleChange('price')}
                            />
                            <label></label>
                            <select name="type"
                                className="login__textBox"
                                onChange={this.handleChange('transactionType')}
                                value={this.state.transactionType}>

                                <option value="0">Type</option>
                                <option value="expense">Expense</option>
                                <option value="deposit">Deposit</option>
                            </select>
                        </div>

                        <div className="login__container" >
                            <button className="btn btn-dark " onClick={() => this.addNewTransaction()} >
                                Add Expense
                            </button>
                            <button className="btn btn-primary mt-5" onClick={this.logout} >Logout</button>
                            <h3></h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
