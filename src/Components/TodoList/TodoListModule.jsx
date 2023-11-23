import { useState, useRef, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { useEffect } from 'react';
import TodoListItem from './TodoListItem';

const TodoListModule = () => {
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(-1);
  const nextId = useRef(0);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      /*axios.post("/endpoint", {
        todo
      }).then((res) => {

      })
      */
      setTodos((prevTodos) => [...prevTodos, todo]);
      nextId.current += 1;
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

  const onRemove = useCallback(
    (id) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setEditingId(null);
    },
    [setTodos, setEditingId]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
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
