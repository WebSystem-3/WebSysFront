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
  //console.log(user_id1); //친구아이디 가져오는지 확인
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(-1);
  const [user_id, setUser_id] = useRecoilState(userState);
  const task_date = useRecoilValue(dateState);
  const handle_time = useRecoilValue(timeState);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const friendId = useRecoilValue(selectedFriendState);

  const isChecked = useRecoilValue(taskState);

  useEffect(() => {
    const showTheDateList = () => {
      fetch(`http://43.201.197.131:8080/${user_id}/task/${task_date}`, {}).then(
        (response) => {
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
        }
      );
    };
    showTheDateList();
  }, [user_id, task_date]);
  //캘린더에서 handle_date 가져오기

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

  useEffect(() => {
    console.log('task 추가됨', tasks);
  }, [tasks]);

  const onEditStart = (task_id) => {
    setEditingId(task_id);
    //console.log('수정: ' + task_id);
  };

  // const onEditStart = useCallback(
  //   (id) => {
  //     setEditingId(id);
  //   },
  //   [setEditingId]
  // );

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
          throw new Error('Network response was not ok');
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

  // const EditTime = (task_id) => {
  //   fetch(`http://43.201.197.131:8080/${user_id}/task/${task_id}/timer`, {
  //     method: 'PATCH',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({ task_time: handle_time }),
  //   })
  //     .then((response) => {
  //       response.json().then((data) => {
  //         if (response.status === 200) {
  //           alert(data.message);
  //         } else {
  //           alert(data.message);
  //         }
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // };

  const onRemove =
    // (id) => {
    //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    //   setEditingId(null);

    (task_id) => {
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
        isChecked: true, // isChecked 를 true로 설정
        task_time: time, // task_time 설정
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.task_id === task_id
              ? { ...task, isChecked: true } // isChecked 를 true로 설정
              : task
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
      {user_id !== friendId && (
        <TodoInsert className='TodoInsert' onInsert={onInsert} />
      )}
    </div>
  );
};

export default TodoListModule;
