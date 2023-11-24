import React, { useState, useEffect } from 'react';
import './TodoListItem.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md';
import TimerModal from '../Timer/TimerModal';

const TodoListItem = ({
  task,
  editing,
  onEditStart,
  onEditSave,
  onRemove,
  onToggle,
}) => {
  const { task_id, task_name, isChecked } = task;
  const [edittingText, setEditText] = useState(task_name);

  useEffect(() => {
    setEditText(task_name);
  }, [editing, task_id, task_name]);

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = () => {
    onEditSave(task_id, edittingText);
  };

  return (
    <div className={`TodoListItem ${isChecked ? 'checked' : ''}`}>
      <div className='checkbox' onClick={() => onToggle(task_id)}>
        {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </div>
      {editing ? (
        <input type='text' value={edittingText} onChange={handleChange} />
      ) : (
        <div className='text'>{task_name}</div>
      )}
      <div>
        {editing ? (
          <button className='saveTask' onClick={handleEditSave}>
            저장
          </button>
        ) : (
          <button
            className='editTask'
            onClick={() => {
              onEditStart(task_id);
            }}
          >
            수정
          </button>
        )}
      </div>
      <TimerModal className='SetTimer' />
      <div className='remove' onClick={() => onRemove(task_id)}>
        <MdDelete className='deleteBtn' />
      </div>
    </div>
  );
};

export default TodoListItem;
