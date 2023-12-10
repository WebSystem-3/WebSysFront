import React, { useState, useEffect } from 'react';
import './TodoListItem.css';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdDelete } from 'react-icons/md';
import TimerModal from '../Timer/TimerModal';
import { useRecoilValue } from 'recoil';
import { selectedFriendState, taskState, userState } from '../../RecoilState';

const TodoListItem = ({
  task,
  editing,
  onEditStart,
  onEditSave,
  onRemove,
  onToggle,
}) => {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const { task_id, task_name, isChecked, task_date } = task;
  const [editingText, setEditText] = useState(task_name);
  const today = `${new Date().getFullYear()}-${pad(
    new Date().getMonth() + 1
  )}-${pad(new Date().getDate())}`;
  const friendId = useRecoilValue(selectedFriendState);
  const user_id = useRecoilValue(userState);

  const task_State = useRecoilValue(taskState);

  useEffect(() => {
    if (task_State.task_id === task_id && task_State.isChecked !== isChecked) {
      onToggle(task_id, task_State.isChecked);
    }
  }, [task_State]);

  useEffect(() => {
    setEditText(task_name);
  }, [editing, task_id, task_name]);

  // useEffect(() => {
  //   console.log(task_date);
  //   console.log(today);
  // }, [task_date]);

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSave = () => {
    onEditSave(task_id, editingText);
  };

  return (
    <div className={`TodoListItem ${isChecked ? 'checked' : ''}`}>
      <div className='checkbox'>
        {isChecked ? (
          <MdCheckBox className='checkedbox' />
        ) : (
          <MdCheckBoxOutlineBlank className='checkedbox' />
        )}
      </div>
      {task_date === today ? (
        <div className='itemsector'>
          {editing ? (
            <input type='text' value={editingText} onChange={handleChange} />
          ) : (
            <div className='text'>{task_name}</div>
          )}
          <div className='taskComponents'>
            {editing ? (
              <button className='saveTask' onClick={handleEditSave}>
                저장
              </button>
            ) : (
              !isChecked &&
              friendId === null && (
                <div className='editingForm'>
                  <button
                    className='editTask'
                    onClick={() => {
                      onEditStart(task_id);
                    }}
                  >
                    수정
                  </button>
                  <div className='remove' onClick={() => onRemove(task_id)}>
                    <MdDelete className='deleteBtn' />
                  </div>
                  <TimerModal
                    task_id={task_id}
                    onToggle={onToggle}
                    className='SetTimer'
                  />
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className='text'>{task_name}</div>
      )}
    </div>
  );
};

export default TodoListItem;
