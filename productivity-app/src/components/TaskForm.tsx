import React from 'react';
import { BulletPoint, Task } from '../types';

interface TaskFormProps {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  addTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ newTask, setNewTask, addTask }) => {
  const updateBulletPoint = (index: number, value: string) => {
    const updatedBulletPoints = [...newTask.bulletPoints];
    updatedBulletPoints[index].text = value;
    setNewTask({ ...newTask, bulletPoints: updatedBulletPoints });
  };

  const updateLink = (index: number, value: string) => {
    const updatedLinks = [...newTask.links];
    updatedLinks[index] = value;
    setNewTask({ ...newTask, links: updatedLinks });
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
      />
      <h3>Bullet Points</h3>
      {newTask.bulletPoints.map((point, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Bullet Point ${index + 1}`}
          value={point.text}
          onChange={(e) => updateBulletPoint(index, e.target.value)}
        />
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
      <button onClick={() => setNewTask({ ...newTask, links: [...newTask.links, ''] })}>
        Add Link
      </button>
      <button onClick={addTask}>Add Task</button>
    </div>
  );
};

export default TaskForm;