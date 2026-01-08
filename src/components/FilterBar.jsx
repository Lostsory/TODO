import React from 'react';

function FilterBar({ filter, setFilter, counts }) {
  const filters = [
    { value: 'all', label: '全部' },
    { value: 'active', label: '进行中' },
    { value: 'completed', label: '已完成' },
  ];

  return (
    <div className="flex gap-1 mb-4 p-1 bg-gray-100 rounded-lg w-full">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            filter === f.value
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span>{f.label}</span>
          <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
            filter === f.value ? 'bg-gray-100 text-gray-900' : 'bg-gray-200 text-gray-600'
          }`}>
            {counts ? counts[f.value] : 0}
          </span>
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
