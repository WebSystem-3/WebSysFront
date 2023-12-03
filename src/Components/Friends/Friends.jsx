import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../RecoilState";
import Modal from 'react-modal';
import FriendSearch from "./FriendSearch";
import { MdClose } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import './Friends.css';

const Friends = ({onFriendClicked}) => {
    const [friends, setFriends] = useState([]);
    const user_id = useRecoilValue(userState);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [deleteMode, setdeleteMode] = useState(false);
    const[isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        getFriends();
    },[friends]);//handleDeleteFr추가

    const getFriends = () => {
      fetch(`http://43.201.197.131:8080/${user_id}/friend`)
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
    const handleModalUpdate = (handleAddFr) => {
      setFriends(handleAddFr);
    }
    const modalStyle = {
      content: {
        width:'500px',
        height: '100px',
        top:'80%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        transform:'translate(-50%,-50%)',
        borderRadius: '10px',
      }
    }
    const setFr = (user_id1) => {
      onFriendClicked(user_id1);
    }
    const toggleDeleteMode = () =>{
      setdeleteMode(!deleteMode);
    }
    
/*
    const handleDeleteFr = (user_id1) => {
        fetch(`http://43.201.197.131:8080/${user_id}/friend/${user_id1}`,{
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
    onClick={()=>handleDeleteFr(fr.user_id)}*/


    return (
        <nav>
          <ul>
            <li><a href="/main">My</a></li>
            <li>Friends</li>
            {deleteMode?(<button onClick={toggleDeleteMode}>수정완료</button>):(<button onClick={toggleDeleteMode}>편집</button>)}
            <li 
            onMouseOver={()=>setIsHovering(true)}
            onMouseOut={()=>setIsHovering(false)}
            >{deleteMode && isHovering?(<button>x</button>):(<div>친구이름</div> )}</li>
            
            {friends.map((fr) => (
                <li key={fr.user_id} onClick={() => setFr(fr.user_id)} >
                {fr.user_name}
                </li>
            ))}
          </ul>
          <IoAddCircle size='30' onClick={openSearchFr}/>
          <Modal 
          style={modalStyle}
          isOpen = {searchIsOpen}
          onRequestClose={closeSearchFr}
          onUpdate = {handleModalUpdate}
          >
            <FriendSearch />
            <MdClose className='modalCloseBt' size='30' onClick={closeSearchFr} />
          </Modal>
          
        </nav>
    );
};

export default Friends;