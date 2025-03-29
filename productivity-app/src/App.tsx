import { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types';

function App() {
  // Initialize tasks from localStorage or set to an empty array if none exist
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if(savedTasks === null) {
      return []
    }
    else {
      return JSON.parse(savedTasks)
    }
  });
  // Initialize newTask with default values
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    bulletPoints: [{ text: '', completed: false }],
    links: [''],
  });
  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  //Function that allows users to add tasks
  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ title: '', bulletPoints: [{ text: '', completed: false }], links: [''] });
  };
  // Allows users to mark bulletpoints as complete or incomplete
  const toggleBulletPointCompletion = (taskIndex: number, bulletIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].bulletPoints[bulletIndex].completed =
      !updatedTasks[taskIndex].bulletPoints[bulletIndex].completed;
    setTasks(updatedTasks);
  };
  // Allows users to delete tasks
  const deleteTask = (taskIndex: number) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };
  // Render the main application component
  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <TaskList tasks={tasks} toggleBulletPointCompletion={toggleBulletPointCompletion} deleteTask={deleteTask} />
    </div>
  );
}

export default App;