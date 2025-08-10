import React from 'react';
import { cn } from '../../utils/cn';

interface MaterialCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  hoverable?: boolean;
  animated?: boolean;
}

interface MaterialCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MaterialCardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface MaterialCardActionsProps {
  children: React.ReactNode;
  className?: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ 
  children, 
  className, 
  elevation = 1,
  hoverable = false,
  animated = true
}) => {
  const elevationClasses = {
    0: 'shadow-none',
    1: 'shadow-sm',
    2: 'shadow',
    3: 'shadow-md',
    4: 'shadow-lg',
    5: 'shadow-xl',
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 transition-all duration-300',
        elevationClasses[elevation],
        hoverable && 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer',
        animated && 'animate-material-bounce',
        className
      )}
    >
      {children}
    </div>
  );
};

const MaterialCardHeader: React.FC<MaterialCardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-200 dark:border-dark-700', className)}>
      {children}
    </div>
  );
};

const MaterialCardContent: React.FC<MaterialCardContentProps> = ({ children, className }) => {
  return (
    <div className={cn('px-6 py-4', className)}>
      {children}
    </div>
  );
};

const MaterialCardActions: React.FC<MaterialCardActionsProps> = ({ children, className }) => {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-200 dark:border-dark-700 flex justify-end space-x-2', className)}>
      {children}
    </div>
  );
};

export { MaterialCard, MaterialCardHeader, MaterialCardContent, MaterialCardActions };
