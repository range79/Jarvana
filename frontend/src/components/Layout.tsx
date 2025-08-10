import React from 'react';
import { Package, Upload, List, Settings, Moon, Sun, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { cn } from '../utils/cn';
import { useTheme } from '../contexts/ThemeContext';
import { useConnection } from '../contexts/ConnectionContext';
import MaterialButton from './ui/MaterialButton';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab = 'upload', onTabChange }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isConnected, checkConnection, lastChecked } = useConnection();
  
  const tabs = [
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'files', label: 'JAR Files', icon: List },
    { id: 'monitor', label: 'Monitor', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-950 dark:to-dark-900 transition-all duration-500">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-dark-700/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Package className="h-8 w-8 text-primary-500 dark:text-primary-400 animate-wave" />
                <Sparkles className="h-4 w-4 text-secondary-500 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Jarvana
                </h1>
                <span className="text-sm text-gray-500 dark:text-gray-400">JAR Management System</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <button
                  onClick={checkConnection}
                  className="flex items-center space-x-2 px-3 py-1 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-dark-800"
                >
                  {isConnected ? (
                    <>
                      <Wifi className="h-4 w-4 text-success-500 animate-pulse" />
                      <span className="text-success-600 dark:text-success-400 font-medium">Connected</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-danger-500 animate-pulse" />
                      <span className="text-danger-600 dark:text-danger-400 font-medium">Disconnected</span>
                    </>
                  )}
                </button>
                {lastChecked && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {lastChecked.toLocaleTimeString()}
                  </span>
                )}
              </div>
              <MaterialButton
                variant="outlined"
                color="primary"
                size="small"
                onClick={toggleTheme}
                className="p-2"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </MaterialButton>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white/60 dark:bg-dark-900/60 backdrop-blur-sm border-b border-gray-200/50 dark:border-dark-700/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange?.(tab.id)}
                  className={cn(
                    'flex items-center space-x-2 py-4 px-3 border-b-2 font-medium text-sm transition-all duration-300 rounded-t-lg',
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-sm'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-dark-800/50'
                  )}
                >
                  <Icon className={cn('h-4 w-4 transition-transform duration-200', activeTab === tab.id && 'animate-scale-in')} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>© 2024 Jarvana. All rights reserved.</span>
            <span>Version 1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
