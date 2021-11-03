import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { auth } from "../firebase"
export const Navigation = ({ user }) => {

    const history = useHistory();
    const logout = () => {
        auth.signOut()
        history.push("/login")
    }
    console.log(user)

    return (
        <div>

            <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
                <div class="container">
                    <Link class="navbar-brand " to="/">React </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                            {
                                user ?
                                    <div >

                                        <button class="btn btn-primary" style={{ float: "right" }} onClick={logout} >Logout</button>
                                    </div>
                                    : <> <li class="nav-item ">
                                        <Link to='/login' class="text-white nav-link">Login</Link>
                                    </li>

                                        <li class="nav-item ">
                                            <Link to='/sign' class="text-white nav-link">signup</Link>
                                        </li>
                                        <li class="nav-item ">
                                            <Link to='/' class="text-white nav-link">Todo</Link>
                                        </li>
                                        </>

                            }

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}
