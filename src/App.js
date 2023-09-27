import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);


  // Function to load TODOs from local storage
  const loadTodosFromLocalStorage = () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    setTodos(storedTodos);
    setCompletedTodos(storedCompletedTodos);
  };

  useEffect(() => {
    loadTodosFromLocalStorage();
  }, []); // Run this effect only on component mount

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    // Update the state
    setTodos([newTodo, ...todos]);

    // Save to local storage
    localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]));
  };

  const completeTodo = (id) => {
    // Check if the todo with the given id is already completed
    const isAlreadyCompleted = completedTodos.some((todo) => todo.id === id);
  
    if (!isAlreadyCompleted) {
      const updatedActiveTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      );
      const completedTodo = todos.find((todo) => todo.id === id);
  
      // Update the state
      setTodos(updatedActiveTodos);
      setCompletedTodos([completedTodo, ...completedTodos]);
  
      // Save to local storage
      localStorage.setItem('todos', JSON.stringify(updatedActiveTodos));
      localStorage.setItem('completedTodos', JSON.stringify([completedTodo, ...completedTodos]));
    }
  };
  
  

  const resetTodos = () => {
    // Clear state
    setTodos([]);
    setCompletedTodos([]);

    // Clear local storage
    localStorage.removeItem('todos');
    localStorage.removeItem('completedTodos');
  };

  return (
    <div className="app">
      <p className='heading'>Offline Todo-App</p>
      <TodoInput addTodo={addTodo} />
      <div className="buttons">
        <button onClick={resetTodos} className="reset-button">
          Reset
        </button>
      </div>
      <div>
      {todos.length>0 ?<h2 style={{textAlign:"left"}}>Todo</h2>:""}
      <TodoList todos={todos} completeTodo={completeTodo}/>
      </div>
      <div className="completed-list">
        {completedTodos.length>0 ?<h2 style={{textAlign:"left"}}>Completed</h2>:""}
        <TodoList todos={completedTodos} completeTodo={completeTodo} />
      </div>
    </div>
  );
}

export default App;
