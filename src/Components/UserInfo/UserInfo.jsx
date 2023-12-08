import React, { useState, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../RecoilState';
import { TiUserDelete, TiHome } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import userImg from './userImg.png';
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
          alert(data.message);
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
          navigate('/');
        } else {
          alert(data.message);
        }
      }); 
    })
    .catch((error) => console.error(error))
  }
  function toUserEdit(){
    navigate("/userEdit");
  }
  function logout(){
    /*fetch(`http://43.201.197.131:8080/user/${user_id}/logout`)
    .then((response) => {
      response.json().then((data) => {
        if (response.status === 200){
          alert(data.message);
        } else {
          alert(data.message);
        }
      }); 
    })
    .catch((error) => console.error(error));*/
    navigate("/");
    resetUser();
  }
  function openCheckDel(){
    setCheckIsOpen(true);
  }
  function closeCheckDel(){
    setCheckIsOpen(false);
  }
  
  const style1 = {
    content: {
      width:'200px',
      height: '130px',
      textAlign: 'center',
      padding: '70px',
      top:'50%',
      left:'50%',
      right:'auto',
      bottom:'auto',
      transform:'translate(-50%,-50%)',
      borderRadius: '40px',
      color: 'white',
      backgroundColor: 'black',
    }
  }
  return (
    <div container className='container'>
    <div className='userInfoForm'>
      {userData ? (
        <div className='usercontainer'>
          <div className='usertext'>
          <p>{userData.name} 님,</p>
          <p>{userData.account}</p>
          </div>
          <img className='imgcss' src={userImg} alt="유저이미지"/>
        </div>
      ) : (
        <p>로딩중</p>
      )}
      <div className='userInfoBtsContainer'>
      <div className='rectangle'/>
      <div className='userInfoBts'>
      <p><TiUserDelete size='30'/><button className='userInfoBt' onClick={openCheckDel}>회원탈퇴</button></p>
      <Modal
        style={style1}
        isOpen={checkIsOpen}
        onRequestClose={closeCheckDel}>
        정말 탈퇴하시겠습니까?
      <p>
        <button className='modalYesBt' onClick={handleDelete}>예</button>
        <button className='modalNoBt' onClick={closeCheckDel}>아니요</button>
      </p>
      </Modal>
      <p><FaUserEdit size='30'/><button className='userInfoBt' onClick={toUserEdit}>정보수정</button></p>
      <p><FiLogOut size='30'/><button className='userInfoBt' onClick={logout}>로그아웃</button></p>
      </div>
      </div>
    </div>
    
    </div>
  );
}

export default UserInfo;