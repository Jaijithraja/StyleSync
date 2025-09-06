import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TwinklingStars from '@/components/TwinklingStars';

const Settings = () => {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Edit Profile', action: () => navigate('/profile') },
        { icon: Bell, label: 'Notifications', action: () => console.log('Notifications') },
        { icon: Shield, label: 'Privacy & Security', action: () => console.log('Privacy') },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: () => console.log('Help') },
      ]
    },
    {
      title: 'Account Actions',
      items: [
        { icon: LogOut, label: 'Sign Out', action: () => navigate('/login'), danger: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative">
      <TwinklingStars count={8} />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="flex items-center p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/home')}
            className="mr-4"
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </header>

        {/* Settings Sections */}
        <div className="px-6 space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/80 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border/50">
                <h3 className="font-semibold text-foreground">{section.title}</h3>
              </div>
              
              <div className="divide-y divide-border/30">
                {section.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={item.action}
                      className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                        item.danger ? 'text-destructive' : 'text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* App Version */}
        <div className="px-6 mt-8">
          <div className="text-center text-muted-foreground">
            <p className="text-sm">StyleSync v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;