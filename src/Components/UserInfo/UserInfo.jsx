import React from 'react';
import { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '../../RecoilState';
import { useNavigate } from "react-router-dom";
import { TiUserDelete, TiHome } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import './UserInfo.css';

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [user_id, setUser_id] = useRecoilState(userState);
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState);

  useEffect(() => {
    fetch(`http://43.201.197.131:8080/user/${user_id}`)
    .then((response) => {
      response.json().then((data) => {
        if (response.status === 200){
          setUserData(data);
          console.log(userData);
        } else {
          alert(data.errorMessage);
        }
      }); 
    })
    .catch((error) => console.error(error));
  }, []); 

  const handleDelete = () => {
    fetch(`http://43.201.197.131:8080/user/${user_id}`,{
      method: "DELETE",
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
    .catch((error) => console.error(error))
}
  function toUserEdit(){
    navigate("/userEdit");
  }
  
  function logout(){
    navigate("/");
    resetUser();
  }
  function toMain(){
    navigate("/main");
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
      <p><TiUserDelete /><button className='userInfoBt' onClick={handleDelete}>회원탈퇴</button></p>
      <p><FaUserEdit /><button className='userInfoBt' onClick={toUserEdit}>정보수정</button></p>
      <p><FiLogOut /><button className='userInfoBt' onClick={logout}>로그아웃</button></p>
      <br />
      <TiHome onClick={toMain} size ="30"/>
      <br />
      
    </div>
  );
}

export default UserInfo;