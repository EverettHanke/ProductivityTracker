import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Settings from './components/Settings';
import { Task } from './types';

function App() {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState<Task>({
        title: '',
        bulletPoints: [{ text: '', completed: false }],
        links: [''],
        tags: [],
        isDaily: false,
    });

    const [backgroundUrl, setBackgroundUrl] = useState<string>(() => {
        return localStorage.getItem('backgroundUrl') || ''; // Load from localStorage or use default
    });

    // SAVES TASKS AND BACKGROUND URL TO LOCAL STORAGE
    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';

        // Save tasks to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks)); 

        // Save the background URL to localStorage
        localStorage.setItem('backgroundUrl', backgroundUrl);
    }, [backgroundUrl, tasks]);

    return (
        <Router>
            <div className="App">
                {/* Navbar */}
                <nav>
                    <ul>
                        <li>
                            <Link to="/">View Tasks</Link>
                        </li>
                        <li>
                            <Link to="daily">Daily Tasks</Link>
                        </li>
                        <li>
                            <Link to="/create">Create Task</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                    </ul>
                </nav>

                {/* Routes */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <TaskList
                                tasks={tasks}
                                setTasks={setTasks}
                                toggleBulletPointCompletion={(taskIndex, bulletIndex) => {
                                    const updatedTasks = [...tasks];
                                    updatedTasks[taskIndex].bulletPoints[bulletIndex].completed =
                                        !updatedTasks[taskIndex].bulletPoints[bulletIndex].completed;
                                    setTasks(updatedTasks);
                                }}
                                deleteTask={(taskIndex) => {
                                    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
                                    setTasks(updatedTasks);
                                }}
                                isDaily={false}
                            />
                        }
                    />
                    <Route
                        path="/daily"
                        element={
                            <TaskList
                                tasks={tasks}
                                setTasks={setTasks}
                                toggleBulletPointCompletion={(taskIndex, bulletIndex) => {
                                    const updatedTasks = [...tasks];
                                    updatedTasks[taskIndex].bulletPoints[bulletIndex].completed =
                                        !updatedTasks[taskIndex].bulletPoints[bulletIndex].completed;
                                    setTasks(updatedTasks);
                                }}
                                deleteTask={(taskIndex) => {
                                    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
                                    setTasks(updatedTasks);
                                }}
                                isDaily={true} 
                            />
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            <TaskForm newTask={newTask} setNewTask={setNewTask} addTask={() => {
                                setTasks([...tasks, newTask]);
                                setNewTask({ title: '', bulletPoints: [{ text: '', completed: false }], links: [''], tags: [''], isDaily: false });
                            }} />
                        }
                    />
                    <Route
                        path="/settings"
                        element={<Settings backgroundUrl={backgroundUrl} setBackgroundUrl={setBackgroundUrl} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;