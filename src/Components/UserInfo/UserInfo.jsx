import React, { useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../RecoilState';
import { TiUserDelete, TiHome } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import './UserInfo.css';

function UserInfo() {
  const [userData, setUserData] = useState(null);
  const [checkIsOpen, setCheckIsOpen] = useState(false);
  const user_id = useRecoilValue(userState);
  const resetUser = useResetRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://43.201.197.131:8080/user/${user_id}`)
    .then((response) => {
      response.json().then((data) => {
        if (response.status === 200){
          setUserData(data);
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
  function openCheckDel(){
    setCheckIsOpen(true);
  }
  function closeCheckDel(){
    setCheckIsOpen(false);
  }
  const style1 = {
    content: {
      width:'400px',
      height: '300px',
      top:'50%',
      left:'50%',
      right:'auto',
      bottom:'auto',
      transform:'translate(-50%,-50%)',
      borderRadius: '10px',
      color: 'white',
      backgroundColor: 'black',
    }
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
      <p><TiUserDelete /><button className='userInfoBt' onClick={openCheckDel}>회원탈퇴</button></p>
      <Modal
      style={style1}
      isOpen={checkIsOpen}
      onRequestClose={closeCheckDel}>
      정말 탈퇴하시겠습니까?
      <button className='modalYesBt' onClick={handleDelete}>예</button>
      <button className='modalNoBt' onClick={closeCheckDel}>아니요</button>
      </Modal>
      <p><FaUserEdit /><button className='userInfoBt' onClick={toUserEdit}>정보수정</button></p>
      <p><FiLogOut /><button className='userInfoBt' onClick={logout}>로그아웃</button></p>
      <br />
      <TiHome onClick={toMain} size ="30"/>
      <br />
      
    </div>
  );
}

export default UserInfo;