import React from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import './LoginForm.css';
//import { userState } from '../../RecoilState';
//import axios from 'axios';


const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const userData={
      userId: id,
      userPassword: password,
    };
    fetch("http://localhost:8080/user/login",{
      method: "post",
      headers:{
        "content-type": "application/json",
      }, body: JSON.stringify(userData),
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {loggedIn ? (
        <div>
          <p>로그인되었습니다. ID: {id}</p>
        </div>
      ) : (
        <form>
          <p>
            <input
              className="login"
              type="text"
              name="username"
              placeholder="ID"
              onChange={(event) => setId(event.target.value)}
            />
          </p>
          <p>
            <input
              className="login"
              type="password"
              name="pwd"
              placeholder="비밀번호"
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>
          <br />
          <button type='button' onClick={handleLogin}>
            로그인
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
