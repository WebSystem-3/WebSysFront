import React from 'react';
import {useState} from 'react';
function SignUp(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");

    const handleSignup = () => {
      if (password !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      const userData={
        account: id,
        password: password,
        name: name,
      };
      fetch("http://localhost:8080/user/signup",{
        method: "post",
        headers:{
          "content-type": "application/json",
        }, body: JSON.stringify(userData),
      })
        //.then((response) => console.log(response))
        //.catch((error) => console.log(error));
        .then((response) => console.log(response))
        .then((data)=>{
          if(data.statusCode === 200){ 
              alert(data.message);
          } else{
              alert(data.errorMessage);
          }
        })
        .catch((error) => console.log(error));
    }

    const handleValidation = () => {
      const userData={
      account: id,
      };
      fetch("http://localhost:8080/user/validation",{
        method: "post",
        headers:{
          "content-type": "application/json",
        }, body: JSON.stringify(userData),
      })
      .then((response) => console.log(response))
      .then((data)=>{
        if(data.statusCode === 200){ 
            alert(data.message);
        } else{
            alert(data.errorMessage);
        }
      })
      .catch((error) => console.log(error));
    };

    return(
        <div>
        <h>회원가입</h>
        <br />
        <label>
        <input 
            type="text"
            placeholder="ID"
            onChange={(event) => setId(event.target.value)}
            />
        </label>
        <button type='button' onClick={handleValidation}>중복확인</button>
        <p>
            <input
            type="password"
            placeholder="비밀번호"
            onChange={(event) => setPassword(event.target.value)}
            />
        </p>
        <p>
            <input 
            type="password"
            placeholder="비밀번호 확인"
            onChange={(event) => setPassword2(event.target.value)}
            />
        </p>
        <p>
            <input 
            type="text"
            placeholder="이름"
            onChange={(event) => setName(event.target.value)}
            />
        </p>
        <br />
        <button type='button' onClick={handleSignup}>회원가입</button>
        </div>
    );
};

export default SignUp;