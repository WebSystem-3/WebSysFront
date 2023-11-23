import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../RecoilState";

const Friends = () => {
    const [friends, setFriends] = useState({friend:[]});
    const user_id = useRecoilValue(userState);

    useEffect(() => {
        fetch(`http://localhost:8080/${user_id}/friend`)
        .then((response) => {
            response.json().then((data) => {
                if(response.status === 200){
                    setFriends(data);
                } 
            })
        })
    },[]);
/*
    const handleAddFr = () => {
        fetch(`http://localhost:8080/${user_id}/friend/${user_id1}`, {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            //body: JSON.stringify(userData),
          })
            .then((response) => {
              response.json().then((data) => {
                if (response.status === 200){
                  //친구추가메서드
                  alert(data.message);
                } else {
                  alert(data.errorMessage);
                }
              }); 
            })
            .catch((error) => console.log(error));
    }

    const handleDeleteFr = () => {
        fetch(`http://localhost:8080/${user_id}/friend/${user_id2}`,{
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

    const showFrTask = () => {
        fetch(`http://localhost:8080/${user_id}/friend/${user_id3}/task`)
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

    }
    

    return (
        <nav>
          <ul>
            <li><a href="/">My</a></li>
            <li><a>Friends</a></li>
            {friends.friend.map((fr) => (
                <li key = {fr.user_id}></li>
            ))}
          </ul>
          <button type='button' onClick={showUserInfo}>내 정보</button>
        </nav>
    );
};

export default Friends;