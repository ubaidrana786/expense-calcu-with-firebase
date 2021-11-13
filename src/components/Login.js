import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase"
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
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

            // window.M.toast({ html: `welcome ${result.user.email}`, classes: "green" })
            toast.success("User is logged in", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push("/")
        } catch (err) {
            toast.error(err + "", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })


        }
    }

    return (
        <>
            <section className="ftco-section">
                <ToastContainer />
                <div className="container">
                    <div className="row justify-content-center">
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-5">
                            <div className="login-wrap p-4 p-md-5">
                                <div className="icon d-flex align-items-center justify-content-center">
                                    <span className="fa fa-user-o"></span>
                                </div>
                                <h3 className="text-center mb-4">Sign In</h3>
                                <form onSubmit={handlesubmit} className="login-form">
                                    <div className="form-group">
                                        <input type="email" className="form-control rounded-left" placeholder="Email" value={email}
                                            onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="form-group d-flex">
                                        <input type="password" className="form-control rounded-left" placeholder="Password" value={password}
                                            onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="form-control btn btn-primary rounded submit px-3" >Log_In</button>
                                    </div>
                                    <div className="form-group ">

                                        <div className="w-100 text-center">
                                            <a href="#" onClick={signInWithGoogle}>Sign_In with Google</a>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <span className="form-control btn btn-primary rounded submit px-3">Don't have an account? <Link to="/sign" style={{ color: "#E4959E" }}>Register</Link> now.</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}

export default Login;