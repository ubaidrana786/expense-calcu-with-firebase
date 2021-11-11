import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {auth,signInWithGoogle} from  "../firebase"
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    // const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    // useEffect(() => {
    //     if (loading) {
    //         // maybe trigger a loading screen
    //         return;
    //     }
    //     if (user) history.replace("/dashboard");
    // }, [user, loading]);
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            history.push("/")
            // window.M.toast({ html: `welcome ${result.user.email}`, classes: "green" })
        } catch(err) {
           alert(err.message) 
        }
    }
   
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={(e) => handlesubmit(e)}
                >
                    Login
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>
                    {/* <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div> */}
                <div>
                    Don't have an account? <Link to="/sign">Register</Link> now.
                </div>
                
            </div>
        </div>
    );
}

export default Login;