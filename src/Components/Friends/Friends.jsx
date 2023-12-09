import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../RecoilState';
import Modal from 'react-modal';
import FriendSearch from './FriendSearch';
import { MdClose } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import './Friends.css';

const Friends = ({ onFriendClicked }) => {
  const [friends, setFriends] = useState([]);
  const user_id1 = useRecoilValue(userState);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [deleteMode, setdeleteMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleModalUpdate = () => {
    console.log('Friends updated');
  };
  const handleDeleteFr = (user_id2) => {
    fetch(`http://43.201.197.131:8080/${user_id1}/friend/${user_id2}`, {
      method: 'DELETE',
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
          } else {
            alert(data.errorMessage);
          }
        });
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    console.log('친구데이터 불러오기성공');
    const getFriends = () => {
      fetch(`http://43.201.197.131:8080/${user_id1}/friend`).then(
        (response) => {
          response.json().then((data) => {
            console.log(data);
            if (response.status === 200) {
              setFriends(data);
            }
          });
        }
      );
    };
    getFriends();
  }, []);

  // const getFriends = () => {
  //   fetch(`http://43.201.197.131:8080/${user_id1}/friend`)
  //     .then((response) => {
  //         response.json().then((data) => {
  //           console.log(data);
  //             if(response.status === 200){
  //                 setFriends(data);
  //             }
  //         })
  //     })
  // }

  const openSearchFr = () => {
    setSearchIsOpen(true);
  };
  const closeSearchFr = () => {
    setSearchIsOpen(false);
  };
  const modalStyle = {
    content: {
      width: '700px',
      height: '150px',
      top: '80%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%,-50%)',
      borderRadius: '10px',
      backgroundColor: '#D9D9D9',
    },
  };
  const setFr = (user_id2) => {
    onFriendClicked(user_id2); //todomodule에 친구아이디 전달하기 mainpage도 함께 수정필요
  };
  const toggleDeleteMode = () => {
    setdeleteMode(!deleteMode);
  };

  /*
    <ul>
            <li><a href="/main">My</a></li>
            <li>Friends</li>
            {deleteMode?(<button onClick={toggleDeleteMode}>수정완료</button>):(<button onClick={toggleDeleteMode}>편집</button>)}
            {friends.map((fr) => (
                <li key={fr.user_id}  onClick={() => setFr(fr.user_id)}
                onMouseOver={()=>setIsHovering(true)}
                onMouseOut={()=>setIsHovering(false)}
                >
                {deleteMode && isHovering?(<button>x</button>):(<div>{fr.user_name}</div> )}
                </li>
            ))}
          </ul>
*/
  return (
    <div className='friendsForm'>
      <ul className='friendList'>
        <li>
          <button className='myTodoBtn'>my</button>
        </li>
        <li className='friendtitle'>Friends</li>
        {friends.map((fr) => (
          <li
            key={fr.user_id}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
          >
            {deleteMode && isHovering ? (
              <div className='xBtn' onClick={() => handleDeleteFr(fr.user_id)}>
                x
              </div>
            ) : (
              <div className='friendName' onClick={() => setFr(fr.user_id)}>
                {fr.name.length < 4 ? fr.name : fr.name.slice(0, 3) + '...'}
              </div>
            )}
          </li>
        ))}
      </ul>
      <button className='addFrBtn' onClick={openSearchFr}>
        +
      </button>
      <p>
        {deleteMode ? (
          <button className='editcompleteBtn' onClick={toggleDeleteMode}>
            수정완료
          </button>
        ) : (
          <CiEdit className='editBtn' size='20' onClick={toggleDeleteMode} />
        )}
      </p>
      <Modal
        style={modalStyle}
        isOpen={searchIsOpen}
        onRequestClose={closeSearchFr}
      >
        <FriendSearch onUpdate={handleModalUpdate} />
        <MdClose className='modalCloseBt' size='30' onClick={closeSearchFr} />
      </Modal>
    </div>
  );
};

export default Friends;
