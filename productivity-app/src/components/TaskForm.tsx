import React, {useState} from 'react';
import { Task } from '../types';

interface TaskFormProps {
  newTask: Task;
  setNewTask: React.Dispatch<React.SetStateAction<Task>>;
  addTask: () => void;
}



// This component is responsible for rendering the form to create a new task.
const TaskForm = ({ newTask, setNewTask, addTask }: TaskFormProps) => {
  const [error, setTitleError] = useState('');
  const [bulletError, setBulletError] = useState('');
  const [linkError, setLinkError] = useState('');

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

  // Function that updates the tags in the newTask state
  const updateTag = (index: number, value: string) => {
    const updatedTags = newTask.tags.slice();
    updatedTags[index] = value;
    setNewTask({ ...newTask, tags: updatedTags });
  };

 // Function to add a new tag
 const addTag = () => {
  setNewTask({ ...newTask, tags: [...newTask.tags, ''] });
};

// Function to remove a tag
const removeTag = (index: number) => {
  const updatedTags = newTask.tags.filter((_, i) => i !== index);
  setNewTask({ ...newTask, tags: updatedTags });
};

// Function to toggle the isDaily property
const toggleIsDaily = () => {
  setNewTask({ ...newTask, isDaily: !newTask.isDaily });
};

// Validates all bullet points
const validateBulletPoints = () => {
  const allBulletPointsValid = newTask.bulletPoints.every(point => point.text.trim() !== '');
  return allBulletPointsValid;
}
// Validates all links
const validateLinks = () => {
  const allLinksValid = newTask.links.every((link) => {
    if (link.trim() === '') {
      return false;
    }
    try {
      new URL(link.trim()); 
      return true;
    } catch {
      setLinkError('Please ensure links are valid')
      return false; 
    }
  });

  if (!allLinksValid) {
    setLinkError('Please ensure all links are not empty.');
  } else {
    setLinkError('');
  }

  return allLinksValid;
};

//Validation for the task title
const handleAddTask = () => {
  let error = false;
  if (newTask.title.trim() === '') {
    setTitleError('Please enter a task title.');
    error = true;
  } else {
    setTitleError('');
  }
  if(!validateBulletPoints()){
      setBulletError('Please remove all unused bullet points');
      error = true;
  }
  else{ 
    setBulletError('');
  }
  if(!validateLinks()){
      error = true;
  } else{
    setLinkError('');
  } 
  if(error) return;
  addTask();
}





  // Displays the Form
  return (
    <div className="task-form">
      <input type="text" placeholder="Task Title" value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      <h3>Bullet Points</h3>
      {newTask.bulletPoints.map((point, index) => (
        <div>
          <div className="form-input-and-button">
            <input key={index} type="text" placeholder={`Bullet Point ${index + 1}`} value={point.text} 
              onChange={(e) => updateBulletPoint(index, e.target.value)} />
              <button className="remove-button" type="button" aria-label='remove previous bullet point'
                onClick={() => setNewTask({...newTask,bulletPoints: newTask.bulletPoints.filter((_, i) => i !== index),})}
              > X
              </button>
          </div>
          {bulletError && <p style={{ color: 'red' }}>{bulletError}</p>}
        </div>
      ))}
      
      <button onClick={() => setNewTask({ ...newTask, bulletPoints: [...newTask.bulletPoints, { text: '', completed: false }] })}>
        Add Bullet Point
      </button>
      <h3>Links</h3>
      {newTask.links.map((link, index) => (
        <div>
          <div className="form-input-and-button">
            <input
              key={index}
              type="text"
              placeholder={`Link ${index + 1}`}
              value={link}
              onChange={(e) => updateLink(index, e.target.value)}
            />
            <button type="button" className="remove-button" aria-label='remove previous link'
              onClick={() => setNewTask({...newTask, links: newTask.links.filter((_, i) => i !== index),})}>
              X
            </button>
          </div>
          {linkError && <p style={{ color: 'red' }}>{linkError}</p>}
        </div>
      ))}
      
      <button onClick={() => setNewTask({ ...newTask, links: [...newTask.links, ''] })}> Add Link </button>
      <h3>Tags</h3>
      {newTask.tags.map((tag, index) => (
        <div key={index} className="form-input-and-button">
          <input
            type="text"
            placeholder={`Tag ${index + 1}`}
            value={tag}
            onChange={(e) => updateTag(index, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="remove-button"
            aria-label='remove previous tag'
          >X</button>
        
        </div>
      ))}
      <button
          type= "button"
          onClick={() => addTag()}
          style={{ marginLeft: '0.5rem' }}
        >Add Tag</button>

      <h3>Daily Task</h3>
      <label>
        <input
          type="checkbox"
          checked={newTask.isDaily}
          onChange={toggleIsDaily}
        />
        Mark as Daily Task
      </label>
          
      <br></br>
      <button onClick={handleAddTask} style={{marginTop: '0.5rem'}}>Upload Task</button>

    </div>
  );
};

export default TaskForm;