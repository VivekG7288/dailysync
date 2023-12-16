import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'; // Define ItemTypes as needed

const TodoItem = ({ todo, index, moveTodo, completeTodo }) => {
  const [, drag] = useDrag({
    type: ItemTypes.TODO,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover: (item) => {
      if (item.index !== index) {
        moveTodo(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} style={{ marginBottom: '8px', cursor: 'move' }}>
      <input type="checkbox" checked={todo.completed} onChange={() => completeTodo(index)} />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.content}</span>
    </div>
  );
};

const TodoList = () => {
  const [todos, setTodos] = useState([
    { content: 'Task 1', completed: false },
    { content: 'Task 2', completed: false },
    // Add more initial tasks as needed
  ]);

  const addTodo = (content) => {
    setTodos([...todos, { content, completed: false }]);
  };

  const completeTodo = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].completed = !updatedTodos[index].completed;
      return updatedTodos;
    });
  };

  const moveTodo = (fromIndex, toIndex) => {
    const updatedTodos = [...todos];
    const [movedTodo] = updatedTodos.splice(fromIndex, 1);
    updatedTodos.splice(toIndex, 0, movedTodo);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} index={index} moveTodo={moveTodo} completeTodo={completeTodo} />
        ))}
      </div>
      <input
        type="text"
        placeholder="Add a new task"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim() !== '') {
            addTodo(e.target.value.trim());
            e.target.value = '';
          }
        }}
      />
    </div>
  );
};

export default TodoList;
