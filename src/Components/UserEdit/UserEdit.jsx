import React from 'react';
import {useState} from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../RecoilState';
import { useNavigate } from "react-router-dom";

function UserEdit() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const user_id = useRecoilValue(userState);
    const navigate = useNavigate();

    const handleEdit = () => {
      const userData={
        password: password,
        name: name,
      }; 
      fetch(`http://43.201.197.131:8080/user/${user_id}`,{
        method: "PATCH",
        headers:{
          "content-type": "application/json",
        }, body: JSON.stringify(userData),
      })

      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200){
            alert(data.message);
            navigate('/userInfo');
          } else {
            alert(data.errorMessage);
          }
        }); 
      })
      .catch((error) => console.log(error));
    }

    return(
        <div className='signUpForm'>
        <p className='pagetitle'>회원 정보 수정</p>
        <p>비밀번호
            <input
            className='inputSignUp'
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            />
        </p>
        {password === '' || password.length>=8 ? (<></>):(<div className='warning'>비밀번호는 8자~16자이어야 합니다.</div>)}
        <p>비밀번호 확인
            <input 
            className='inputSignUp'
            type="password"
            onChange={(event) => setPassword2(event.target.value)}
            />
        </p>
        <div>
          {password !== '' && password === password2 ? (<></>
          ) : (
            password !== '' &&
            password2 !== '' && <div className='warning'>비밀번호가 일치하지 않습니다</div>
          )}
        </div>
        <p>이름
            <input 
            className='inputSignUp'
            type="text"
            onChange={(event) => setName(event.target.value)}
            />
        </p>
        <br />
        <button
        className='signUpBt2'
        type='button' 
        onClick={handleEdit}>수정하기</button>
        </div>
    );
};

export default UserEdit;