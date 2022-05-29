import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import './login.css';
import { useAuth, login } from './../../firebase/firebase';
import blob from '../../assets/blob.svg'

function LogIn() {

  const currentUser = useAuth();
  const [loading, setLoading] = useState(); //destructing
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleLogin() {

    setLoading(true); //ensures taht the user is restricted to hit multiple times submit button
    try {
      await login(emailRef.current.value, passwordRef.current.value);
    }
    catch {
      alert('Error!');
    }
    setLoading(false);
  }

  return (
    <>
      <img className='blob' src={ blob } alt="" />
      <div className="container">
        <span className="title"><h2>LOGIN</h2></span>
        <p className="login-subheading">Please sign in to continue</p>

        <div className="form login">
          <input type="text" placeholder=" Email" ref={emailRef} name="email" required />
          <input type="password" className="password" ref={passwordRef} name="password" placeholder="Password" required />
          <button disable={loading || currentUser} onClick={handleLogin} className="button" type="submit">SIGN IN</button>
          <div className="signup">
            <span className="text">Don't have an account<br /></span>
            <span className="text">
              <Link className="link" to="/signup">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
