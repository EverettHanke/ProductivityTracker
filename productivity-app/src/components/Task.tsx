//import React from 'react';
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  taskIndex: number;
  toggleBulletPointCompletion: (taskIndex: number, bulletIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
}

const Task = ({ task, taskIndex, toggleBulletPointCompletion, deleteTask }: TaskProps) => {

  //Generate Task Bullet Points
  const generateBulletPoints = () => {
    return task.bulletPoints.map((point, index) => (
      <li key = {index}>
        <input type = "checkbox" checked = {point.completed} onChange = {() => toggleBulletPointCompletion(taskIndex, index)} />
        <span style = {{ textDecoration: point.completed ? 'line-through' : 'none' }}>{point.text}</span>
      </li>
    ));
  }

  // Render Bullet Points
  const renderLinks = () => {
    return task.links.map((link, i) => (
      <li key={i}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </li>
    ));
  }
  
  // Render the Task Component
  return (
    <div className="task">
      <h2>{task.title}</h2>
      <ul>{generateBulletPoints()}</ul>
      <h3>Links</h3>
      <ul>{renderLinks()}</ul>
      <button onClick={() => deleteTask(taskIndex)}>Delete Task</button>
    </div>
  );
};

export default Task;