import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import './App.css';
import { Navigation } from "./components/Navigation";
import  Login  from "./components/Login";
import  Signup  from "./components/Signup";

import { auth } from "./firebase"
import React, {useEffect, useState} from "react";

import { Todo } from "./components/Todo";
function App() {
    const [user, setuser] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged(user=>{
            if(user) setuser(user) 
            else setuser(null)
        })
      
    }, [])
    return (
        <div className="App">
            <Router>
            <Navigation user={user}/>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/sign" component={Signup}/>
                  
                    <Route exact path="/">
                        <Todo user={user}/>
                    </Route>
                  
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
