import React from 'react';
import {useState} from 'react';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState } from '../../RecoilState';
function UserEdit(props) {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [name, setName] = useState("");
    const user_id = useRecoilValue(userState);

    const handleEdit = () => {
      if (password !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
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
          } else {
            alert(data.errorMessage);
          }
        }); 
      })
      .catch((error) => console.log(error));
    }

    return(
        <div>
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
        <button type='button' onClick={handleEdit}>수정하기</button>
        </div>
    );
};

export default UserEdit;