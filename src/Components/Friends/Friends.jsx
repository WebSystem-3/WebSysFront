import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userState,
  friendUpdatedState,
  selectedFriendState,
  selectedNameState,
} from '../../RecoilState';
import { CiEdit } from 'react-icons/ci';
import { IoMdRefresh } from 'react-icons/io';

import './Friends.css';
import FriendSearchModal from './FriendSearchModal';

const Friends = () => {
  const user_id1 = useRecoilValue(userState);
  const [friendUpdated, setFriendUpdated] = useRecoilState(friendUpdatedState);
  const [nameUpdated, setNameUpdated] = useRecoilState(selectedNameState);
  const [selectedFriendID, setSelectedFriendID] =
    useRecoilState(selectedFriendState);
  const [friends, setFriends] = useState([]);
  const [deleteMode, setdeleteMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const getFriends = async () => {
    try {
      const response = await fetch(
        `http://43.201.197.131:8080/${user_id1}/friend`
      );
      const data = await response.json();
      if (response.status === 200) {
        setFriends(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFr = async (user_id2) => {
    await fetch(`http://43.201.197.131:8080/${user_id1}/friend/${user_id2}`, {
      method: 'DELETE',
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            setFriendUpdated((prev) => prev + 1);
          } else {
            alert(data.message);
          }
        });
      })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            setFriendUpdated((prev) => prev + 1);
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => console.error(error));
  };
  const refreshClicked = () => {
    console.log('새로고침눌림');
    setFriendUpdated((prev) => prev + 1);
  };

  useEffect(() => {
    console.log('친구데이터 불러오기성공');
    console.log('useEffect:' + friendUpdated);
    console.log(selectedFriendID);
    getFriends();
  }, [friendUpdated]);

  const toggleDeleteMode = () => {
    setdeleteMode(!deleteMode);
  };

  return (
    <div className='friendsForm'>
      <ul className='friendList'>
        <li>
          <button
            onClick={() => {
              setSelectedFriendID(null);
              setNameUpdated('나');
            }}
            className='myTodoBtn'
          >
            my
          </button>
        </li>
        <li className='friendtitle'>Friends</li>
        {friends.map((fr) => (
          <li
            key={fr.user_id}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
          >
            {deleteMode && isHovering ? (
              <button
                className='xBtn'
                onClick={() => handleDeleteFr(fr.user_id)}
              >
                x
              </button>
            ) : (
              <button
                className='friendName'
                onClick={() => {
                  setSelectedFriendID(fr.user_id);
                  setNameUpdated(fr.name);
                }}
              >
                {fr.name.length < 4 ? fr.name : fr.name.slice(0, 3) + '...'}
              </button>
            )}
          </li>
        ))}
      </ul>
      <FriendSearchModal />
      <p>
        {deleteMode ? (
          <button className='editcompleteBtn' onClick={toggleDeleteMode}>
            수정완료
          </button>
        ) : (
          <CiEdit className='editBtn' size='20' onClick={toggleDeleteMode} />
        )}
        <IoMdRefresh
          className='refreshBtn'
          size='20'
          onClick={refreshClicked}
        />
      </p>
    </div>
  );
};

export default Friends;
