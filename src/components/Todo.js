import React, { useEffect, useState } from 'react'
import "./Login.css";
import { auth } from "../firebase"
export const Todo = () => {
    useEffect(() => {
       
    })

    const [text, settext] = useState('')
    const [currentUID, setcurrentUID] = useState('')
    const addtodo = () => {


    }
    const user = auth.currentUser.photoURL
    console.log(user)
    return (
        <div>
            <h1 className="mt-5">Todo</h1>
            <div className="login">
                <div className="login__container">
                    <input
                        type="text"
                        className="login__textBox"
                        value={text}
                        onChange={(e) => settext(e.target.value)}
                        placeholder="Add todo"
                    />
                </div>
                <button
                    className="login__btn"
                    onClick={addtodo}
                >
                    add
                </button>
            </div>
        </div>
    )
}
