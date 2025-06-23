import React from 'react';
import Button from '../Button'
import { Home, Calendar, Info, ArrowLeft } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, onBackToLanding }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'History', icon: Calendar },
    { id: 'about', label: 'About Us', icon: Info }
  ];

  return (
    <nav className="mb-8">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(id)}
              className="px-6 py-3"
            >
              <Icon size={18} />
              {label}
            </Button>
          ))}
        </div>
        <Button variant="secondary" onClick={onBackToLanding} className="px-6 py-3">
          <ArrowLeft size={18} />
          Return
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
