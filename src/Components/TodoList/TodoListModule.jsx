import { useState, useRef, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';
import { useEffect } from 'react';

const TodoListModule = () => {
  const [todos, setTodos] = useState([]);
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
    [todos]
  );

  const onRemove = useCallback(
    (id) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  const onToggle = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      );
    },
    [todos]
  );

  return (
    <TodoTemplate className='TodoTemp'>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      <TodoInsert onInsert={onInsert} />
    </TodoTemplate>
  );
};

export default TodoListModule;
