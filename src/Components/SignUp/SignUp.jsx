import React from 'react';
import {useState} from 'react';

function SignUp(props) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSignup = () => {
        const userData={
          userId: id,
          userPassword: password,
          userPassword2: password2,
        };
        fetch("http://localhost:8080/user/signup",{
          method: "post",
          headers:{
            "content-type": "application/json",
          }, body: JSON.stringify(userData),
        })
          //.then((response) => console.log(response))
          //.catch((error) => console.log(error));
          .then((response) => response.json())
          .then((json)=>{
            if(json.isSuccess==="True"){
                alert("회원가입이 완료되었습니다.");
            }
            else{
                alert(json.isSuccess);
            }
          })
        };

    return(
        <div>
        <p>
            <input 
            type="text"
            placeholder="ID"
            onChange={(event) => setId(event.target.value)}
            />
        </p>
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
        <br />
        <button type='button' onClick={handleSignup}>
            회원가입
          </button>
        </div>
    );
};

export default SignUp;