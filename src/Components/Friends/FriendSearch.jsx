import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { userState } from "../../RecoilState";
import { IoSearch, IoAdd } from "react-icons/io5";
import './FriendSearch.css';

const FriendSearch = ({onUpdate}) => {
    const user_id1 = useRecoilValue(userState);
    const [user_id2, setUser_id2] = useState("");
    const [isSearched, setIsSearched] = useState(false);
    const [searchedUser, setSearchedUser] = useState(null);


    const handleSearchFr = async() => {
      const account = user_id2;
      await fetch(`http://43.201.197.131:8080/${user_id1}/search/${account}`, {
        headers: {
          "content-type": "application/json"},
      })
        .then((response) => {
          console.log(response);  
          response.json().then((data) => {
            console.log(data);
            if (response.status === 200){
              console.log('받은데이터:'+data);
              setIsSearched(true);
              setSearchedUser(data);
              console.log('검색성공'+searchedUser);              
            } else {
              alert(data.message);
            }
          }); 
        })
        .catch((error) => console.log(error));
        
    }
    
    const handleAddFr = async() => {
      console.log(searchedUser.user_id);
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
                console.log(data);
                if (response.status === 200){
                  onUpdate();
                  //정보받아서 friend배열에 추가된 것 useEffect에 업데이트
                  alert(data.message);
                } else {
                  alert(data.message);
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
            onChange={(event) => setUser_id2(event.target.value)}
            />
            <IoSearch className='searchBtn' size='25' onClick={handleSearchFr}/>
            {isSearched ? (
                <div>
                <p>{searchedUser.account}</p>
                <p>{searchedUser.name}</p>
                <IoAdd className='addBtn'onClick={handleAddFr}/>
                </div>
            ):(
                <></>
            )}
        </div>
    );
}

export default FriendSearch;