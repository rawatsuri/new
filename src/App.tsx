import React, { useState } from 'react';
import {
  LayoutDashboard,
  PenTool,
  Calendar,
  Settings,
  BarChart3,
  Users,
  Library,
  Menu,
  X
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import ContentCalendar from './components/ContentCalendar';
import ContentLibrary from './components/ContentLibrary';
import Analytics from './components/Analytics';

type NavItem = {
  name: string;
  icon: React.ElementType;
  component?: React.ComponentType;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
  { name: 'Content Generator', icon: PenTool, component: ContentGenerator },
  { name: 'Calendar', icon: Calendar, component: ContentCalendar },
  { name: 'Content Library', icon: Library, component: ContentLibrary },
  { name: 'Analytics', icon: BarChart3, component: Analytics },
  { name: 'Team', icon: Users },
  { name: 'Settings', icon: Settings },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const ActiveComponent = navigation.find(item => item.name === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Social AI Hub</h1>
        </div>
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`mb-2 flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === item.name
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={`min-h-screen transition-all duration-200 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{activeTab}</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">
                This section is coming soon!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;