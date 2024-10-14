import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Bell, Moon, Sun } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // TODO: Implement dark mode functionality
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // TODO: Implement notifications functionality
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <div className="flex items-center justify-between">
            <span>Email</span>
            <span className="text-gray-600">{user?.name}@example.com</span>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Moon size={24} className="mr-2" />
              <span>Dark Mode</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Bell size={24} className="mr-2" />
              <span>Notifications</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={notifications} onChange={handleNotificationsToggle} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;