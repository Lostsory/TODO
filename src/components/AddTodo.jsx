import React, { useState } from 'react';

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="添加新的待办事项..."
        className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:bg-white focus:border-gray-400 focus:ring-0 focus:ring-offset-0 transition-all text-sm h-[38px]"
      />
      <button
        type="submit"
        className="px-4 py-1.5 bg-transparent text-gray-500 hover:text-black text-sm font-medium rounded-lg hover:bg-gray-100 active:transform active:scale-95 transition-all h-[38px]"
      >
        添加
      </button>
    </form>
  );
}

export default AddTodo;
