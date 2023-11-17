import React from 'react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState } from '../../RecoilState';
//버튼 누르면 화면 옮기기 추가해야함

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const user_id = useRecoilValue(userState);

  useEffect(() => {
    fetch(`http://localhost:8080/user/info/${user_id}`)
      .then((response) => response.json())
      .then((data) => {
          if(data.statusCode === 200){ 
            setUserData(data); 
          } else{
            alert(data.errorMessage);
          }
        })
      .catch((error) => console.error(error));
  }, []); 

  const handleDelete = () => {
    fetch(`http://localhost:8080/user/delete/${user_id}`,{
      method: "DELETE",
    })
      .then((response) => console.log(response))
      .then((data)=>{
        if(data.statusCode===200){
            alert(data.message);
        }
        else{
            alert(data.errorMessage);
        }
        })
      .catch((error) => console.error(error))
}

  return (
    <div>
      {userData ? (
        <div>
          <p>{userData.name} 님,</p>
          <p>{userData.account}</p>
        </div>
      ) : (
        <p>로딩중</p>
      )}
      <br />
        <button type='button' onClick={handleDelete}>회원탈퇴</button>
    </div>
  );
}

export default UserInfo;