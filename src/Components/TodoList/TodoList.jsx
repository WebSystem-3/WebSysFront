import TodoListItem from './TodoListItem.jsx';
import './TodoList.css';
import React from 'react';

const TodoList = ({
  tasks,
  onRemove,
  onToggle,
  editingId,
  onEditStart,
  onEditSave,
}) => {
  return (
    <div className='TodoList'>
      {tasks.map((task) => (
        <TodoListItem
          key={task.task_id}
          task={{
            task_id: task.task_id,
            task_name: task.task_name,
            task_date: task.task_date,
            isChecked: task.isChecked || false,
          }}
          onRemove={() => onRemove(task.task_id)}
          onToggle={() => onToggle(task.task_id)}
          editing={editingId === task.task_id}
          onEditStart={() => onEditStart(task.task_id)}
          onEditSave={onEditSave}
        />
      ))}
    </div>
  );
};

export default TodoList;
