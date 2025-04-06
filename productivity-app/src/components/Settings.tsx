import React, { useState } from 'react';

interface SettingsProps {
    backgroundUrl: string;
    setBackgroundUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Settings = ({ backgroundUrl, setBackgroundUrl }: SettingsProps) => {
    const [newUrl, setNewUrl] = useState(backgroundUrl);

    const handleSave = () => {
        if (newUrl.trim() !== '') {
            setBackgroundUrl(newUrl);

            // Dynamically update the body background
            document.body.style.backgroundImage = `url(${newUrl})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundRepeat = 'no-repeat';
        } else {
            alert('Please enter a valid URL');
        }
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <label htmlFor="backgroundUrl">Background URL:</label>
            <input
                type="text"
                id="backgroundUrl"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter a new background URL"
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Settings;