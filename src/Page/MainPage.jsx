import { useState, useCallback } from "react";
import Calendar from '../Components/Calendar/Calender';
import TimerModal from '../Components/Timer/TimerModal';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Main() {
  const navigate = useNavigate();
  const [friendId, setfriendId] = useState(null);

  const handleFriendClick = useCallback(async (user_id1) => {
    console.log("friend clicked!")
    setfriendId(user_id1);
  }, [friendId]);

    function myInfo(){
      navigate("/userInfo");
    }
    /*
      */
    

  return (
    <div className='mainContainer'>
      <div className='calendarContainer'>
        <p>나의 기록</p>
        <Calendar className='calendar' />
      </div>
      <div className='timerTodoContainer'>
        <p>To-do List</p>

        <TodoListModule className='TodoList' />

      </div> 
      <Friends onFriendClicked={handleFriendClick} />
      {friendId && <TodoListModule user_id1={friendId}/>}
      
      <FaUser onClick={myInfo} size="30"/>
    </div>
  );
}
//<TimerModal className='Timer' />

/* <Friends/>
<button onClick={myInfo}>내정보</button> */

export default Main;
