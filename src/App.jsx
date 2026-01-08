import React, { useState, useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('active');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const result = await window.electron.ipcRenderer.invoke('load-todos');
    if (result.success) {
      setTodos(result.todos);
    }
  };

  const saveTodos = async (newTodos) => {
    const result = await window.electron.ipcRenderer.invoke('save-todos', newTodos);
    if (result.success) {
      setTodos(newTodos);
    }
  };

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    saveTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    saveTodos(newTodos);
  };

  const editTodo = (id, newText) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    saveTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  const counts = {
    all: total,
    active: active,
    completed: completed
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 px-4 pb-4 box-border">
      <div className="max-w-2xl mx-auto h-full flex flex-col pt-4">
        <AddTodo onAdd={addTodo} />
        <FilterBar filter={filter} setFilter={setFilter} counts={counts} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
