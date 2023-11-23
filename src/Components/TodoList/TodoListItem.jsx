import React, { useState, useEffect } from 'react';
import './TodoListItem.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md';
import TimerModal from '../Timer/TimerModal';

const TodoListItem = ({
  todo,
  editing,
  onEditStart,
  onEditSave,
  onRemove,
  onToggle,
}) => {
  const { id, text, checked } = todo;
  const [edittingText, setEditText] = useState(text);

  useEffect(() => {
    setEditText(text);
  }, [editing, id, text]);

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = () => {
    fetch(`http://localhost:8080/${user_id}/task/${task_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        }, body: JSON.stringify(edittingText),
    })
    onEditSave(id, edittingText);
  };

  return (
    <div className={`TodoListItem ${checked ? 'checked' : ''}`}>
      <div className='checkbox' onClick={() => onToggle(id)}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </div>
      {editing ? (
        <input type='text' value={edittingText} onChange={handleChange} />
      ) : (
        <div className='text'>{text}</div>
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
              onEditStart(id);
            }}
          >
            수정
          </button>
        )}
      </div>
      <TimerModal className='SetTimer' />
      <div className='remove' onClick={() => onRemove(id)}>
        <MdDelete className='deleteBtn' />
      </div>
    </div>
  );
};

export default TodoListItem;
