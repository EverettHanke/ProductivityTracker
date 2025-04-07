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
    return task.bulletPoints.filter((point) => point.text.trim() !== '').map((point, index) => (
      <li key={index}>
        <label>
          <input type="checkbox" checked={point.completed} onChange={() => toggleBulletPointCompletion(taskIndex, index)}/>
          <span style={{ textDecoration: point.completed ? 'line-through' : 'none' }}>
            {point.text}
          </span>
        </label>
      </li>
    ));
  }

  // Render Bullet Points
  const renderLinks = () => {
    return task.links.filter((link) => link.trim() !== '').map((link, i) => (
      <li key={i}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      </li>
    ));
  }

   // Render Tags
   const renderTags = () => {
    return task.tags.filter((tag) => tag.trim() !== '')
    .map((tag, i) => <span className="tags" key={i} style={{ marginRight: '0.5rem' }}>{tag},</span>); 
  };
  
  // Render the Task Component
  return (
    <div className="task">
      <h2>{task.title}</h2>
      <ul>{generateBulletPoints()}</ul>
      {(renderLinks().length > 0) ? (<h3>Links</h3>) : (<p></p>)}
      <ul>{renderLinks()}</ul>
      {renderTags().length > 0 && (
        <>
          <h3>Tags</h3>
          <div>{renderTags()}</div>
        </>
      )}
      <button onClick={() => deleteTask(taskIndex)}>Delete Task</button>
    </div>
  );
};

export default Task;