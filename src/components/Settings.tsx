import React from 'react';
import { Bell, Globe, Lock, Palette, Sliders } from 'lucide-react';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const SettingSection = ({ 
  title, 
  icon: Icon, 
  children 
}: { 
  title: string; 
  icon: React.ElementType; 
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
    <div className="flex items-center space-x-2">
      <Icon className="w-5 h-5 text-gray-600" />
      <h3 className="text-lg font-medium">{title}</h3>
    </div>
    {children}
  </div>
);

const Toggle = ({ label, checked, onChange }: { 
  label: string; 
  checked: boolean; 
  onChange: () => void;
}) => (
  <label className="flex items-center justify-between cursor-pointer">
    <span className="text-sm text-gray-700">{label}</span>
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className={`block w-14 h-8 rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
          checked ? 'transform translate-x-6' : ''
        }`} />
      </div>
    </div>
  </label>
);

export default function Settings() {
  const { settings, updateSettings } = useStore();

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h2>

      <div className="space-y-6">
        <SettingSection title="Notifications" icon={Bell}>
          <div className="space-y-4">
            <Toggle
              label="Email notifications for scheduled posts"
              checked={settings.emailNotifications}
              onChange={() => updateSettings({ emailNotifications: !settings.emailNotifications })}
            />
            <Toggle
              label="Push notifications for engagement"
              checked={settings.pushNotifications}
              onChange={() => updateSettings({ pushNotifications: !settings.pushNotifications })}
            />
          </div>
        </SettingSection>

        <SettingSection title="Appearance" icon={Palette}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select
                value={settings.theme}
                onChange={(e) => updateSettings({ theme: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </SettingSection>

        <SettingSection title="AI Settings" icon={Sliders}>
          <div className="space-y-4">
            <Toggle
              label="Use AI for content suggestions"
              checked={settings.aiSuggestions}
              onChange={() => updateSettings({ aiSuggestions: !settings.aiSuggestions })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Model
              </label>
              <select
                value={settings.aiModel}
                onChange={(e) => updateSettings({ aiModel: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="gpt-4">GPT-4 (Best quality)</option>
                <option value="gpt-3.5">GPT-3.5 (Faster)</option>
              </select>
            </div>
          </div>
        </SettingSection>

        <SettingSection title="Security" icon={Lock}>
          <div className="space-y-4">
            <Toggle
              label="Two-factor authentication"
              checked={settings.twoFactorAuth}
              onChange={() => updateSettings({ twoFactorAuth: !settings.twoFactorAuth })}
            />
            <Toggle
              label="Login notifications"
              checked={settings.loginNotifications}
              onChange={() => updateSettings({ loginNotifications: !settings.loginNotifications })}
            />
          </div>
        </SettingSection>

        <button
          onClick={handleSave}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}