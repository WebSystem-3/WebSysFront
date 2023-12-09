import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, friendUpdatedState, selectedFriendState } from "../../RecoilState";
import Modal from 'react-modal';
import FriendSearch from "./FriendSearch";
import { MdClose } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import './Friends.css';

const Friends = () => {
    const user_id1 = useRecoilValue(userState);
    const [friendUpdated, setFriendUpdated] = useRecoilState(friendUpdatedState);
    const [selectedFriendID, setSelectedFriendID] = useRecoilState(selectedFriendState);
    const [friends, setFriends] = useState([]);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [deleteMode, setdeleteMode] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const getFriends = () => {
      fetch(`http://43.201.197.131:8080/${user_id1}/friend`)
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            if (response.status === 200) {
              setFriends(data);
            }
          });
        });
    }

    const handleDeleteFr = (user_id2) => {
    fetch(`http://43.201.197.131:8080/${user_id1}/friend/${user_id2}`, {
      method: "DELETE",
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            setFriendUpdated((prev) => prev + 1);
          } else {
            alert(data.errorMessage);
          }
        });
      })
      .catch((error) => console.error(error));
  }

    useEffect(() => {
      console.log('친구데이터 불러오기성공');
      getFriends();
    },[friendUpdated]);

    const openSearchFr = () =>{
      setSearchIsOpen(true);
    }
    const closeSearchFr = () =>{
      setSearchIsOpen(false);
    }
    const modalStyle = {
      content: {
        width:'700px',
        height: '150px',
        top:'80%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        transform:'translate(-50%,-50%)',
        borderRadius: '10px',
        backgroundColor:'#D9D9D9',
      }
    }
    const toggleDeleteMode = () =>{
      setdeleteMode(!deleteMode);
    }
    
    return (
        <div className='friendsForm'>
          <ul className='friendList'>
            <li><button onClick={() => setSelectedFriendID(null)} className='myTodoBtn'>my</button></li>
            <li className='friendtitle'>Friends</li>
            {friends.map((fr) => (
                <li key={fr.user_id}  
                onMouseOver={()=>setIsHovering(true)}
                onMouseOut={()=>setIsHovering(false)}
                >
                {deleteMode && isHovering?
                (<div className='xBtn' onClick={()=>handleDeleteFr(fr.user_id)}>x</div>):
                (<div className='friendName' onClick={() => setSelectedFriendID(fr.user_id)} >{fr.name.length<4? fr.name : fr.name.slice(0,3)+'...'}</div> )}
                </li>
            ))}
            </ul>
          <button className='addFrBtn' onClick={openSearchFr}>+</button>
          <p>{deleteMode?(<button className='editcompleteBtn' onClick={toggleDeleteMode}>수정완료</button>):(<CiEdit className='editBtn' size='20' onClick={toggleDeleteMode}/>)}
          </p>
          <Modal 
          style={modalStyle}
          isOpen = {searchIsOpen}
          onRequestClose={closeSearchFr}
          >
            <FriendSearch />
            <MdClose className='modalCloseBt' size='30' onClick={closeSearchFr} />
          </Modal>
        </div>
    );
};

export default Friends;