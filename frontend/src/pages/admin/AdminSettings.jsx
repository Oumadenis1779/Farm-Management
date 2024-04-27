import React, { useState } from 'react';
import AdmSidebar from './adminsidebar';
import AdmNavbar from './AdminNavbar';

const Settings = () => {
    // Define state variables for settings
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    // Function to handle toggle of notifications setting
    const handleNotificationsToggle = () => {
        setNotificationsEnabled(prevState => !prevState);
    };

    // Function to handle toggle of dark mode setting
    const handleDarkModeToggle = () => {
        setDarkModeEnabled(prevState => !prevState);
    };

    return (
        <div>
            <AdmNavbar/>
            <div className="content-container" style={{ marginLeft: '400px', marginTop: '100px', marginRight: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                <h2>Settings</h2>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={handleNotificationsToggle}
                        />
                        Enable Notifications
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={darkModeEnabled}
                            onChange={handleDarkModeToggle}
                        />
                        Enable Dark Mode
                    </label>
                </div>
            </div>
            <AdmSidebar/>
        </div>

    );
};

export default Settings;
