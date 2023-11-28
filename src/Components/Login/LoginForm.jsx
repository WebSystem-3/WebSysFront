import React from "react";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import { useRecoilState } from "recoil";
import { userState } from "../../RecoilState";
import { GoPerson } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_id, setUser_id] = useRecoilState(userState);
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const userData = {
      account: id,
      password: password,
    };
    await fetch("http://43.201.197.131:8080/user/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200){
            setLoggedIn(true);
            setUser_id(data.user_id);
            alert(data.message);
            navigate('/main');
            
          } else {
            alert(data.errorMessage);
          }
        }); 
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
            <GoPerson />
            <input
              class="inputLogin"
              type="text"
              name="username"
              placeholder="ID"
              onChange={(event) => setId(event.target.value)}
            />
          </p>
          <p>
          <GoPerson />
            <input
              class="inputLogin"
              type="password"
              name="pwd"
              placeholder="비밀번호"
              onChange={(event) => setPassword(event.target.value)}
            />
          </p>
          <br />
          <button type="button" onClick={handleLogin}>
            로그인
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;