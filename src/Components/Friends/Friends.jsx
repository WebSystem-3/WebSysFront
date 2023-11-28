import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../RecoilState";
import Modal from 'react-modal';
import FriendSearch from './FriendSearch';
import { useNavigate } from "react-router-dom";

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const user_id = useRecoilValue(userState);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getFriends();
    },[setFriends]);

    const getFriends = () => {
      fetch(`http://localhost:8080/${user_id}/friend`)
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    setFriends(data);
                } 
            })
        })
    }

    const openSearchFr = () =>{
      setSearchIsOpen(true);
    }

    const closeSearchFr = () =>{
      setSearchIsOpen(false);
    }
/*
    const handleDeleteFr = (user_id1) => {
        fetch(`http://localhost:8080/${user_id}/friend/${user_id1}`,{
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
    .catch((error) => console.error(error));
    }

    const showFrTask = (user_id1) => {
        fetch(`http://localhost:8080/${user_id}/friend/${user_id1}/task`)
        .then((response) => {
            response.json.then((data) => {
                if(response.status === 200){
                    //태스크 조회
                } 
            })
        })
    }
*/
    const showUserInfo = () => {
      navigate('/main'); //userInfoPage로 수정필요
    }
    

    return (
        <nav>
          <ul>
            <li><a href="/main">My</a></li>
            <li><a>Friends</a></li>
            {friends.map((fr) => (
                <li key = {fr.user_id}>
                {fr.user_name}
                </li>
            ))}
          </ul>
          <button type='button' onClick={openSearchFr}>+</button>
          <button type='button' onClick={showUserInfo}>내 정보</button>
          <Modal 
          isOpen = {searchIsOpen}
          onRequestClose={closeSearchFr}
          contentLabel='SearchFriend'
          >
            <FriendSearch />
            <button type='button' onClick={closeSearchFr}>x</button>
          </Modal>
          
        </nav>
    );
};

export default Friends;