import React, { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim()) {
        onEdit(todo.id, editText.trim());
      }
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className={`group p-2 mb-2 rounded-lg items-center gap-3 transition-all border border-transparent hover:border-gray-200 hover:bg-white flex ${
      todo.completed ? 'opacity-50' : 'bg-white border-gray-100'
    }`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-4 h-4 accent-black cursor-pointer rounded border-gray-300"
      />
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            onBlur={handleEdit}
            className="w-full px-2 py-1 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-400 focus:ring-0 focus:ring-offset-0 text-sm"
            autoFocus
          />
        ) : (
          <span className={`text-sm transition-all ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleEdit}
          className="p-2 text-gray-400 hover:text-black rounded hover:bg-gray-100 transition-all"
          title={isEditing ? '保存' : '编辑'}
        >
          {isEditing ? '✓' : '✎'}
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-all"
          title="删除"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
