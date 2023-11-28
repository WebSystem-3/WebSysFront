import React, { useState, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import { userState } from "../../RecoilState";

const FriendSearch = () => {
    const user_id = useRecoilValue(userState);
    const [user_id1, setUser_id1] = useState("");
    const [isSearched, setIsSearched] = useState(false);


    const handleSearchFr = () => {
        //아이디가 같은 회원조회 api필요
        setIsSearched(true);
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
                  //정보받아서 friend배열에 추가는 그냥 useEffect로 업데이트됨
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
            placeholder="아이디"
            onChange={(event) => setUser_id1(event.target.value)}
            />
            <button onClick={handleSearchFr}>검색</button>
            {isSearched ? (
                <div>
                <p>친구이름api에서받아오기</p>
                <button onClick={handleAddFr}>추가</button>
                </div>
            ):(
                <p>아이디로 친구를 검색하세요</p>
            )}
        </div>
    );
}

export default FriendSearch;