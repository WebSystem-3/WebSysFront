import React from 'react';
import { useState } from 'react';
import './LoginForm.css';
import { useRecoilState } from 'recoil';
import { userState } from '../../RecoilState';
//import axios from 'axios';


const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_id, setUser_id] = useRecoilState(userState);

  const handleLogin = () => {
    const userData={
      account: id,
      password: password,
    };
    fetch("http://localhost:8080/user/login",{
      method: "post",
      headers:{
        "content-type": "application/json",
      }, body: JSON.stringify(userData),
    })
    .then((response) => console.log(response))
    .then((data) => {
      if(data.statusCode === 200){
        setLoggedIn(true);
        alert(data.message);
        setUser_id(data.account);
        console.log(user_id);
      } else {
        alert(data.errorMessage);
      }
    })
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
          <button type='button' onClick={handleLogin}>로그인</button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
