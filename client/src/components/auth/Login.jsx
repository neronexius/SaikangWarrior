import React, { useState } from "react";
import axios from "axios";
import {decode} from "jsonwebtoken"
import { useHistory } from "react-router-dom";

function Login({setUserData}) {
    let history = useHistory()
    const [inputField, setInputField]=useState({})

    function inputHandler(e){
        setInputField((input)=>({...input, [e.target.name]: e.target.value}))
    }
    async function login() {
        try {
          let profile = await axios.post(
            "http://localhost:80/auth/login",
            inputField
          );
          localStorage.setItem("token", profile.data.token);
          // let decoded_user = await decode(profile.data.token);
          let resData = await axios.get(`http://localhost:80/user/loginUser`, {
            headers: {
              Authorization: `Bearer ${profile.data.token}`,
            },
          });
          setUserData(resData.data.user);
          history.push(`/home`);
        } catch (err) {
          console.log(err);
        }
      }
    return (
        <div className="login">
          <div className="container">
            <h1>Welcome</h1>
            <div className="inputform">
              <div className="text_field">
                <input
                  name="username"
                  onChange={inputHandler}
                  type="text"
                  autocomplete="off"
                  required
                />
                <span></span>
                <label>Username</label>
              </div>
              <div className="text_field">
                <input
                  name="password"
                  onChange={inputHandler}
                  type="password"
                  autocomplete="off"
                  required
                />
                <span></span>
                <label>Password</label>
              </div>
              <div className="button_container">
              <button className="login_button" onClick={login}>
                  Sign In
              </button>
              </div>
              </div>
              <div className="register_q">Doesnt have an acc? <a href="/register">Sign Up</a></div>
            </div>
        </div>
    )
}

export default Login
