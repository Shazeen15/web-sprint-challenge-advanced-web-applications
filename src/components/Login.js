import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "./../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialValue = {
  username: "",
  password: "",
};

const Login = () => {
  const { push } = useHistory();
  const [login, setLogin] = useState(initialValue);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const onChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", login)
      .then((res) => {
        console.log(res.data.payload);
        localStorage.setItem("token", res.data.payload);
        push("/colors");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={loginSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={onChange}
          placeholder="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={onChange}
          placeholder="password"
        />
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEST "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
