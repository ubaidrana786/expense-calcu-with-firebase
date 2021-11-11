import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";

import { auth } from "./firebase";
import React, { useEffect, useState } from "react";

import { AddExpense } from "./components/AddExpense";

function App() {
  const [user, setuser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setuser(user);
      } else setuser(null);
    });
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {!user == 1 ? <Login /> : <AddExpense />}
          </Route>
          <Route exact path="/sign" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
