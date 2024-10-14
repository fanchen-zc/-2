import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, CheckCircle, Settings, Trophy, User } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <ul className="flex justify-around py-2">
        <NavItem to="/" icon={<CheckCircle size={24} />} label="Habits" />
        <NavItem to="/calendar" icon={<Calendar size={24} />} label="Calendar" />
        <NavItem to="/rewards" icon={<Trophy size={24} />} label="Rewards" />
        <NavItem to="/settings" icon={<Settings size={24} />} label="Settings" />
        <NavItem to="/profile" icon={<User size={24} />} label="Profile" />
      </ul>
    </nav>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center ${isActive ? 'text-blue-500' : 'text-gray-600'}`
        }
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </NavLink>
    </li>
  );
};

export default Navigation;