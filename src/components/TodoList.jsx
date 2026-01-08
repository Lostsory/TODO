import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-center py-16">
        <div className="text-gray-400 text-sm">
          暂无待办事项
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-1.5 custom-scrollbar">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
