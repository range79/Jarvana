import React, { createContext, useContext, useEffect, useState } from 'react';
import { jarInfoApi } from '../services/api';

interface ConnectionContextType {
  isConnected: boolean;
  checkConnection: () => Promise<void>;
  lastChecked: Date | null;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};

interface ConnectionProviderProps {
  children: React.ReactNode;
}

export const ConnectionProvider: React.FC<ConnectionProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const checkConnection = async () => {
    try {
      // Try to fetch a small amount of data to test connection
      await jarInfoApi.getAll({ size: 1, page: 0 });
      setIsConnected(true);
      setLastChecked(new Date());
    } catch (error) {
      console.error('Backend connection failed:', error);
      setIsConnected(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    // Check connection on mount
    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ConnectionContext.Provider value={{ isConnected, checkConnection, lastChecked }}>
      {children}
    </ConnectionContext.Provider>
  );
};
