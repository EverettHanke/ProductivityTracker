import React, { useState, useEffect } from 'react';

interface SettingsProps {
    backgroundUrl: string;
    setBackgroundUrl: React.Dispatch<React.SetStateAction<string>>;
}

const Settings = ({ backgroundUrl, setBackgroundUrl }: SettingsProps) => {
    const [newUrl, setNewUrl] = useState(backgroundUrl);
    const [customUrl, setCustomUrl] = useState('');
    const [selectedOption, setSelectedOption] = useState('default');

    // Pre-baked background options
    const preBakedBackgrounds = [
        { label: 'Default Background', url: '' },
        { label: 'Abstract Waves', url: '/assets/ChillPinkWaves.gif' },
        { label: 'Blue Stars', url: '/assets/BlueStars.gif' },
        { label: 'Cherry Blossums', url: '/assets/CherryBlossums.gif' },
        { label: 'City Skyline', url: '/assets/Skylines.gif' },
        { label: 'Tower in the woods', url: '/assets/Tower.gif' },
        { label: 'Custom URL', url: '' }, // Placeholder for custom URL
    ];

    const handleSave = () => {
        let finalUrl = newUrl;

        if (selectedOption === 'custom') {
            if (customUrl.trim() === '') {
                alert('Please enter a valid custom URL');
                return;
            }
            finalUrl = customUrl;
        }

        setBackgroundUrl(finalUrl);

        // Save the background URL to localStorage
        localStorage.setItem('backgroundUrl', finalUrl);

        // Dynamically update the body background
        document.body.style.backgroundImage = `url(${finalUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    };

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);

        if (selectedValue === 'custom') {
            setNewUrl(''); // Clear the newUrl for custom input
        } else {
            const selectedBackground = preBakedBackgrounds.find((bg) => bg.label === selectedValue);
            if (selectedBackground) {
                setNewUrl(selectedBackground.url);
            }
        }
    };

    return (
        <div className="settings">
            <h2>Settings</h2>
            <label htmlFor="backgroundOptions">Choose a Background:</label>
            <select
                id="backgroundOptions"
                value={selectedOption}
                onChange={handleOptionChange}
            >
                {preBakedBackgrounds.map((bg, index) => (
                    <option key={index} value={bg.label === 'Custom URL' ? 'custom' : bg.label}>
                        {bg.label}
                    </option>
                ))}
            </select>

            {selectedOption === 'custom' && (
                <div>
                    <label htmlFor="customUrl">Enter Custom Background URL:</label>
                    <input
                        type="text"
                        id="customUrl"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="Enter a custom background URL"
                    />
                </div>
            )}
            <br></br>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default Settings;