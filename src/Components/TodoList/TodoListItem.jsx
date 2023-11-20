import React from 'react';
import './TodoListItem.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md';
import Timer from '../Timer/Timer';
import TimerModal from '../Timer/TimerModal';

const TodoListItem = ({ todo, onRemove, onToggle }) => {
  const { id, text, checked } = todo;

  return (
    <div className={`TodoListItem ${checked ? 'checked' : ''}`}>
      <div className='checkbox' onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className='text'>{text}</div>
      </div>
      <TimerModal className='SetTimer' />
      <div className='remove' onClick={() => onRemove(id)}>
        <MdDelete className='deleteBtn' />
      </div>
    </div>
  );
};

export default TodoListItem;
