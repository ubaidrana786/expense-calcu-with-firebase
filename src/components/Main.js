import React, { Component } from 'react'
import Login from './Login'
import Signup from './Signup'
import { auth, db } from "../firebase";
import { Todo } from './Todo';
import Spinner from '../assests/loader.gif';
export default class Main extends Component {
    state = {
        user: 1,
        loading: true
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                this.setState({ user: null });
            }
        });
    }

    formSwitcher = (action) => {
        this.setState({ formSwitcher: action === 'Signup' ? true : false });
    }

    render() {
        const form = !this.state.formSwitcher ? <Login /> : <Signup />;

        if (this.state.user === 1) {
            return (
                <div className="mainBlock">
                    <div className="Spinner">
                        <img src={Spinner} alt="Spinner" className="ImgSpinner" />
                    </div>
                </div>);
        }

        return (
            <>
                {!this.state.user ? (
                    <div className="mainBlock">
                        {form}
                        {
                            !this.state.formSwitcher ?
                                (<span className="underLine">Not registered? <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'Signup' : 'login')}
                                    className="linkBtn">Create an account</button>
                                </span>) : (
                                    <span className="underLine">Have an account already? <button onClick={() => this.formSwitcher(!this.state.formSwitcher ? 'Signup' : 'login')}
                                        className="linkBtn">Sign in here</button>
                                    </span>
                                )
                        }
                    </div>
                ) : (<Todo />)}
            </>
        );
    }
}