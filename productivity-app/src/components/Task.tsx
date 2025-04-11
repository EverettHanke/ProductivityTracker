import {useState} from 'react';
import { Task as TaskType } from '../types';

interface TaskProps {
  task: TaskType;
  taskIndex: number;
  toggleBulletPointCompletion: (taskIndex: number, bulletIndex: number) => void;
  deleteTask: (taskIndex: number) => void;
  updateTask: (taskIndex: number, updatedTask: TaskType) => void;
}

const Task = ({ task, taskIndex, toggleBulletPointCompletion, deleteTask, updateTask }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<TaskType>(task);

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
  }

  // Handle Save Changes
  const handleSave = () => {
    updateTask(taskIndex, editedTask);
    setIsEditing(false);
  }

  
  // Render the Task Component
  return (
    <div className="task">
      <div className="task-header">
        <h2>{task.title}</h2>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)} aria-label="Edit Task">
          ⚙️
        </button>
      </div>
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

      {/* Edit Form Popup */}
      {isEditing && (
        <div className="edit-form">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            placeholder="Task Title"
          />
          <textarea
            value={editedTask.bulletPoints.map((bp) => bp.text).join('\n')}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                bulletPoints: e.target.value.split('\n').map((text) => ({ text, completed: false })),
              })
            }
            placeholder="Bullet Points (one per line)"
          />
          <textarea
            value={editedTask.links.join('\n')}
            onChange={(e) =>
              setEditedTask({ ...editedTask, links: e.target.value.split('\n') })
            }
            placeholder="Links (one per line)"
          />
          <textarea
            value={editedTask.tags.join(', ')}
            onChange={(e) =>
              setEditedTask({ ...editedTask, tags: e.target.value.split(',').map((tag) => tag.trim()) })
            }
            placeholder="Tags (comma-separated)"
          />
          <label>
            <input
              type="checkbox"
              checked={editedTask.isDaily}
              onChange={(e) => setEditedTask({ ...editedTask, isDaily: e.target.checked })}
            />
            Mark as Daily Task
          </label>
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)} style={{ marginLeft: '0.5rem' }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;