import React from 'react';
import { useState, useEffect } from 'react';

function UserInfo() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/user/info/:{user_id}')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data); 
      })
      .catch((error) => console.error(error));
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      {userData ? (
        <div>
          <p>{userData.userName} 님,</p>
          <p>{userData.userId}</p>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
    </div>
  );
}

export default UserInfo;