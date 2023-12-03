import React from "react";
import { useState, useEffect } from "react";
import "./LoginForm.css";
import { useRecoilState } from "recoil";
import { userState } from "../../RecoilState";
import { GoPerson } from "react-icons/go";
import { FaKey } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
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
            setUser_id(data.user_id);
            alert(data.message);
          } else {
            alert(data.errorMessage);
          }
        }); 
      })
      .catch((error) => console.log(error));
  };
  function tosignup(){
    navigate("/signup")
}

  return (
    <div>
      <p>로그인</p>
      <p>
        <GoPerson size="25"/>
        <input
          className="inputLogin"
          type="text"
          name="username"
          placeholder="ID"
          onChange={(event) => setId(event.target.value)}
        />
      </p>
      <p>
      <FaKey size="25"/>
        <input
          className="inputLogin"
          type="password"
          name="pwd"
          placeholder="비밀번호"
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <br />
      <button className="loginBt" onClick={handleLogin}>로그인</button>
      <br />
      <br />
      <br />
      <button className="signUpBt" onClick={tosignup}>회원가입</button>
    </div>
  );
};

export default LoginForm;