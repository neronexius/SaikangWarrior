import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Registration() {
    const [inputField, setInputField]=useState({})
    let history = useHistory()
    function inputHandler(e){
        setInputField((input)=>({...input, [e.target.name]: e.target.value}))
    }

    async function register(){
        try {
            let result = await axios.post("http://localhost:80/auth/register", inputField)
            history.push('/login')
        } catch (error) {
            console.log(error)
        }    
    }
    
    return (
        <div className="register">
        <div className="container">
          <h1>Register</h1>
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
            <button className="login_button" onClick={register}>
                Register
            </button>
            </div>
            </div>
            <div className="register_q">Already Have an Acc? <a href="/login">Login</a></div>
          </div>
      </div>
    )
}

export default Registration
