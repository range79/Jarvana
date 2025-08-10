import React from 'react';
import { WifiOff, AlertTriangle, RefreshCw } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';
import MaterialButton from './ui/MaterialButton';

const ConnectionNotification: React.FC = () => {
  const { isConnected, checkConnection } = useConnection();

  if (isConnected) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <WifiOff className="h-5 w-5 text-danger-600 dark:text-danger-400 animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-danger-800 dark:text-danger-200">
              Backend Disconnected
            </h3>
            <p className="text-sm text-danger-700 dark:text-danger-300 mt-1">
              Unable to connect to the backend API. Some features may not work properly.
            </p>
            <div className="mt-3 flex space-x-2">
              <MaterialButton
                variant="outlined"
                color="danger"
                size="small"
                onClick={checkConnection}
                className="flex items-center space-x-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Retry</span>
              </MaterialButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionNotification;
