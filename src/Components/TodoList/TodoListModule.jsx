import { useState, useRef, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { userState } from '../../RecoilState';
import { dateState } from '../../RecoilState';
import { timeState } from '../../RecoilState';
import { useEffect } from 'react';
import TodoListItem from './TodoListItem';

const TodoListModule = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(-1);
  const nextId = useRef(0);

  //const nextId = useRef(0);
  const user_id = useRecoilValue(userState);
  const handle_date = useRecoilValue(dateState);
  const handle_time = useRecoilValue(timeState);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  /*
  //캘린더에서 handle_date 가져오기
  const showTheDateList = () => {
    fetch(`http://localhost:8080/${user_id}/task`, {
      body: JSON.stringify({ task_date: handle_date }),
    }).then((response) => {
      response.json().then((data) => {
        if (response.status === 200) {
          setTodos(data);
        } else {
          alert(data.errorMessage);
        }
      });
    });
  };

  useEffect(() => {
    showTheDateList();
  }, [showTheDateList]);*/

  const onInsert = useCallback(
    (task_name) => {
      const todo = {
        //task_id: nextId.current,
        task_name,
        task_date: formattedDate,
        isChecked: false,
      };

      fetch(`http://localhost:8080/${user_id}/task`, {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        }, body: JSON.stringify(todo),
      })
        .then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              setTodos((prevTodos) => [
                ...prevTodos,
                { ...todo, task_id: data.task_id },
              ]);
              alert(data.message);
            } else {
              alert(data.errorMessage);
            }
          });
        })
        .catch((error) => console.log(error));
      //setTodos((prevTodos) => [...prevTodos, todo]);
      //nextId.current += 1;
    },
    [nextId, setTodos]
  );
  const onEditStart = (id) => {
    setEditingId(id);
    console.log('수정: ' + id);
  };
  // const onEditStart = useCallback(
  //   (id) => {
  //     setEditingId(id);
  //   },
  //   [setEditingId]
  // );

  const onEditSave = useCallback(
    (id, newText) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        )
      );
      setEditingId(null);
    },
    [setTodos, setEditingId]
  );
/*
  //task 시간수정 이상함
  const EditTime = (task_id) => {
    fetch(`http://localhost:8080/${user_id}/task/${task_id}/timer`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ task_time: handle_time }),
    })
      .then((response) => {
        response.json().then((data) => {
          if (response.status === 200) {
            alert(data.message);
          } else {
            alert(data.errorMessage);
          }
        });
      })
      .catch((error) => console.log(error));
  };*/

  const onRemove = useCallback(
    // (id) => {
    //   setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    //   setEditingId(null);

    (task_id) => {
      fetch(`http://localhost:8080/${user_id}/task/${task_id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          response.json().then((data) => {
            if (response.status === 200) {
              alert(data.message);
              setTodos((prevTodos) =>
                prevTodos.filter((todo) => todo.task_id !== task_id)
              );
            } else {
              alert(data.errorMessage);
            }
          });
        })
        .catch((error) => console.error(error));
      //setTodos((prevTodos) => prevTodos.filter((todo) => todo.task_id !== task_id));
    },
    [setTodos, setEditingId]
  );

  const onToggle = useCallback(
    (task_id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.task_id === task_id
            ? { ...todo, isChecked: !todo.isChecked }
            : todo
        )
      );
    },
    [setTodos]
  );

  useEffect(() => {
    console.log('수정된거: ' + editingId);
  }, [editingId]);

  return (
    <>
      <TodoTemplate className='TodoTemp'>
        <TodoList
          todos={todos}
          editingId={editingId}
          onRemove={onRemove}
          onToggle={onToggle}
          onEditStart={onEditStart}
          onEditSave={onEditSave}
        />
      </TodoTemplate>
      <TodoInsert className='TodoInsert' onInsert={onInsert} />
    </>
  );
};

export default TodoListModule;
