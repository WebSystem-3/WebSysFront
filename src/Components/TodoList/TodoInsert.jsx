import React, { useState, useCallback } from 'react';
import { CgAdd } from 'react-icons/cg';
import './TodoInsert.css';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');

      e.preventDefault();
    },
    [onInsert, value]
  );

  return (
    <form className='TodoInsert' onSubmit={onSubmit}>
      <input
        className='writeTodo'
        placeholder='할 일을 입력하세요'
        value={value}
        onChange={onChange}
      />
      <CgAdd
        className='addbox'
        onClick={onSubmit}
        size='30'
        stroke='black'
        stroke-linejoin='round'
      />
    </form>
  );
};

export default TodoInsert;
