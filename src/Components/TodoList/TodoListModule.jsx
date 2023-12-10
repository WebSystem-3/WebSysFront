import { useState, useEffect } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userState,
  dateState,
  timeState,
  taskState,
  selectedFriendState,
} from '../../RecoilState';

import './TodoListModule.css';

const TodoListModule = () => {
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(-1);
  const [user_id, setUser_id] = useRecoilState(userState);
  const task_date = useRecoilValue(dateState);
  const handle_time = useRecoilValue(timeState);
  const selectedFriendID = useRecoilValue(selectedFriendState);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const friendId = useRecoilValue(selectedFriendState);

  const isChecked = useRecoilValue(taskState);

  useEffect(() => {
    const showTheDateList = () => {
      let user_id2 = user_id;
      if (selectedFriendID !== null) {
        user_id2 = selectedFriendID;
      }
      fetch(
        `http://43.201.197.131:8080/${user_id2}/task/${task_date}`,
        {}
      ).then((response) => {
        response.json().then((data) => {
          if (response.status) {
            const receivedTask = data.map((task) => ({
              task_id: task.task_id,
              task_name: task.task_name,
              task_date: task.task_date,
              isChecked: task.isChecked || false,
            }));
            setTasks(receivedTask);
          } else {
            alert(data.message);
          }
        });
      });
    };
    showTheDateList();
  }, [user_id, task_date, selectedFriendID, isChecked]);

  const onInsert = async (task_name) => {
    const task = {
      task_name: task_name,
      task_date: formattedDate,
      isChecked: false,
    };
    await fetch(`http://43.201.197.131:8080/${user_id}/task`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            setTasks(data.result);
            console.log(data);
            console.log('Taskname', task);
          } else {
            alert('안들어감' + data.message);
          }
        });
      })
      .catch((error) => console.log(error));
  };

  const onEditStart = (task_id) => {
    setEditingId(task_id);
  };

  const onEditSave = (task_id, newTask) => {
    fetch(`http://43.201.197.131:8080/${user_id}/task/${task_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        task_name: newTask,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response error');
        }
        return response.json();
      })
      .then((data) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === task_id ? { ...task, task_name: newTask } : task
          )
        );
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onRemove = (task_id) => {
    fetch(`http://43.201.197.131:8080/${user_id}/task/${task_id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
            setTasks((prevTasks) =>
              prevTasks.filter((todo) => todo.task_id !== task_id)
            );
          } else {
            alert(data.message);
          }
        });
      })
      .catch((error) => console.error(error));
  };

  const onToggle = (task_id, isChecked) => {
    const hours = Math.floor(handle_time / 3600);
    const minutes = Math.floor((handle_time % 3600) / 60);
    const seconds = handle_time % 60;

    const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;

    fetch(`http://43.201.197.131:8080/${user_id}/task/${task_id}/timer`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isChecked: true,
        task_time: time,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response error');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === task_id ? { ...task, isChecked: true } : task
          )
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <TodoTemplate className='TodoTemp'>
        <TodoList
          tasks={tasks}
          editingId={editingId}
          onRemove={onRemove}
          onToggle={onToggle}
          onEditStart={onEditStart}
          onEditSave={onEditSave}
        />
      </TodoTemplate>
      {selectedFriendID === null && formattedDate === task_date && (
        <TodoInsert className='TodoInsert' onInsert={onInsert} />
      )}
    </div>
  );
};

export default TodoListModule;
