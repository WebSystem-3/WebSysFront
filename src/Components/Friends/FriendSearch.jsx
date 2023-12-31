import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../../RecoilState';
import { IoSearch, IoAdd } from 'react-icons/io5';
import './FriendSearch.css';

const FriendSearch = (props, {getFriendUpdated}) => { 
  const user_id1 = useRecoilValue(userState);
  const [account, setAccount] = useState('');
  const [isSearched, setIsSearched] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);

  const handleSearchFr = async () => {
    await fetch(`http://43.201.197.131:8080/${user_id1}/search/${account}`, {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setIsSearched(true);
            setSearchedUser(data);
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => console.log(error));
    }
    
    const handleAddFr = async() => {
      props.friends.map((fr)=>{
        if (fr.user_id === searchedUser.user_id)
          alert('이미 친구목록에 존재하는 친구입니다.');
      });
      const body = {
        user_id2 : searchedUser.user_id
      }
      await fetch(`http://43.201.197.131:8080/${user_id1}/friend`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        })
        .then((response) => {
          response.json().then((data) => {
            if (response.ok){
              alert(data.message);
              props.getFriendUpdated();
            } 
          }); 
        })
        .catch((error) => console.log(error));
    }

    return (
      <div>
          <input 
          type="text" 
          placeholder="   ID 검색"
          className='modalIDinput'
          onChange={(event) => setAccount(event.target.value)}
          />
          <IoSearch className='searchBtn' size='25' onClick={handleSearchFr}/>
          {isSearched ? (
              <div className='searchedFrContainer'>
              <p className='searchedFrName'>{searchedUser.name} </p>
              <p className='searchedFrID'>{searchedUser.account} </p>
              <IoAdd className='addBtn'onClick={handleAddFr} size='20'/>
              </div>
          ):(
              <></>
          )}
          <hr className='underline'/>
      </div>
    );
};
export default FriendSearch;
