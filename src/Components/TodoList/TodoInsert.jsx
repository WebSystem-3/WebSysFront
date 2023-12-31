import React, { useState, useCallback } from 'react';
import './TodoInsert.css';

const TodoInsert = ({ onInsert }) => {
  const [task, setTask] = useState('');

  const onChange = useCallback((e) => {
    setTask(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(task);
      setTask('');

      e.preventDefault();
    },
    [onInsert, task]
  );

  return (
    <form className='TodoInsert' onSubmit={onSubmit}>
      <input
        className='writeTodo'
        placeholder='할 일을 입력하세요'
        value={task}
        onChange={onChange}
      />
      <button className='addbox' onClick={onSubmit}>+</button>

    </form>
  );
};

export default TodoInsert;
