import React from 'react';
import { Task } from '../types';

interface TaskFormProps {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  addTask: () => void;
}

// This component is responsible for rendering the form to create a new task.
const TaskForm = ({ newTask, setNewTask, addTask }: TaskFormProps) => {


  // Function that updates the bullet point text in the newTask state
  const updateBulletPoint = (index: number, value: string) => {
    const updatedBulletPoints = newTask.bulletPoints.slice();
    updatedBulletPoints[index].text = value;
    setNewTask({ ...newTask, bulletPoints: updatedBulletPoints });
  };

  // Function that updates the links in the newTask state
  const updateLink = (index: number, value: string) => {
    const updatedLinks = newTask.links.slice();
    updatedLinks[index] = value;
    setNewTask({ ...newTask, links: updatedLinks });
  };

  // Displays the Form
  return (
    <div className="task-form">
      <input type="text" placeholder="Task Title" value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
      <h3>Bullet Points</h3>
      {newTask.bulletPoints.map((point, index) => (
        <input key={index} type="text" placeholder={`Bullet Point ${index + 1}`} value={point.text}
          onChange={(e) => updateBulletPoint(index, e.target.value)} />
      ))}
      <button onClick={() => setNewTask({ ...newTask, bulletPoints: [...newTask.bulletPoints, { text: '', completed: false }] })}>
        Add Bullet Point
      </button>
      <h3>Links</h3>
      {newTask.links.map((link, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Link ${index + 1}`}
          value={link}
          onChange={(e) => updateLink(index, e.target.value)}
        />
      ))}
      <button onClick={() => setNewTask({ ...newTask, links: [...newTask.links, ''] })}> Add Link </button>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;