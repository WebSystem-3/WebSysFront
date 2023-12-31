import { useRecoilValue } from 'recoil';
import { dateState, userState, selectedNameState } from '../RecoilState';
import Calendar from '../Components/Calendar/Calender';
import TodoListModule from '../Components/TodoList/TodoListModule';
import Friends from '../Components/Friends/Friends';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import logo from './logo2.png';
import './MainPage.css';

function Main() {
  const task_date = useRecoilValue(dateState);
  const nameUpdated = useRecoilValue(selectedNameState);

  const navigate = useNavigate();
  function myInfo() {
    navigate('/userInfo');
  }
  function toMain() {
    navigate('/main');
  }
  return (
    <>
      <header>
        <img className='logo' onClick={toMain} src={logo} alt='로고이미지' />
        <FaUser className='toMyInfo' onClick={myInfo} size='40' />
      </header>
      <div className='mainContainer'>
        <Friends />
        <div className='Components'>
          <div className='leftbox'>
            <div className='calendarContainer'>
              <p className='calendar-template'>{nameUpdated}의 기록</p>
              <Calendar className='calendar' />
              <div className='showTime'>
                <p className='zeroplus'>0+</p>
                <p className='fourplus'>4+</p>
                <p className='sevenplus'>7+</p>
                <p className='tenplus'>10+</p>
              </div>
            </div>
          </div>
          <div className='rightbox'>
            <div className='timerTodoContainer'>
              <div className='todotitle'>
                <p className='todolist-template'>To-do List</p>
                <div className='show-date'>{task_date}</div>
              </div>
              <TodoListModule className='TodoList' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
