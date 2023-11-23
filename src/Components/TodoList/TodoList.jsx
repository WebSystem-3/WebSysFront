import TodoListItem from './TodoListItem.jsx';
import TodoListModule from './TodoListModule.jsx';
import './TodoList.css';

const TodoList = ({
  todos,
  onRemove,
  onToggle,
  editingId,
  onEditStart,
  onEditCancel,
  onEditSave,
}) => {
  return (
    <div className='TodoList'>
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onToggle={onToggle}
          editing={editingId === todo.id}
          onEditStart={onEditStart}
          onEditCancel={onEditCancel}
          onEditSave={onEditSave}
        />
      ))}
    </div>
  );
};

export default TodoList;
