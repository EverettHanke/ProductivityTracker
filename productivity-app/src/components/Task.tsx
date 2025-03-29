import React from 'react';
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  taskIndex: number;
  toggleBulletPointCompletion: (taskIndex: number, bulletIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, taskIndex, toggleBulletPointCompletion, deleteTask }) => {
  return (
    <div className="task">
      <h2>{task.title}</h2>
      <ul>
        {task.bulletPoints.map((point, bulletIndex) => (
          <li key={bulletIndex}>
            <input
              type="checkbox"
              checked={point.completed}
              onChange={() => toggleBulletPointCompletion(taskIndex, bulletIndex)}
            />
            <span style={{ textDecoration: point.completed ? 'line-through' : 'none' }}>
              {point.text}
            </span>
          </li>
        ))}
      </ul>
      <h3>Links</h3>
      <ul>
        {task.links.map((link, i) => (
          <li key={i}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {link}
            </a>
          </li>
        ))}
      </ul>
      <button onClick={() => deleteTask(taskIndex)}>Delete Task</button>
    </div>
  );
};

export default Task;