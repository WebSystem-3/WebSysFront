import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { userState } from "../../RecoilState";
import { IoSearch, IoAdd } from "react-icons/io5";
import './Friends.css';

const FriendSearch = ({onUpdate}) => {
    const user_id = useRecoilValue(userState);
    const [user_id1, setUser_id1] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [searchedUser, setSearchedUser] = useState([]);


    const handleSearchFr = async() => {
      const account = user_id1;
      await fetch("http://43.201.197.131:8080/user", {
        body: JSON.stringify(account),
      })
        .then((response) => {
          response.json().then((data) => {
            if (response.status === 200){
              setIsSearched(true);
              setSearchedUser(data);
              console.log(searchedUser);              
            } else {
              alert(data.errorMessage);
            }
          }); 
        })
        .catch((error) => console.log(error));
        
    }
    
    const handleAddFr = () => {
        fetch(`http://localhost:8080/${user_id}/friend/${user_id1}`, {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((response) => {
              response.json().then((data) => {
                if (response.status === 200){
                  onUpdate();
                  //정보받아서 friend배열에 추가된 것 useEffect에 업데이트
                  alert(data.message);
                } else {
                  alert(data.errorMessage);
                }
              }); 
            })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <input 
            type="text" 
            placeholder="ID 검색"
            className='modalIDinput'
            onChange={(event) => setUser_id1(event.target.value)}
            />
            <IoSearch size='25' onClick={handleSearchFr}/>
            {isSearched ? (
                <div>
                <p>{searchedUser.account}</p>
                <p>{searchedUser.name}</p>
                <IoAdd onClick={handleAddFr}/>
                </div>
            ):(
                <p></p>
            )}
        </div>
    );
}

export default FriendSearch;