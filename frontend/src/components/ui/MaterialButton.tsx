import React, { useState, useRef } from 'react';
import { cn } from '../../utils/cn';

interface MaterialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const MaterialButton: React.FC<MaterialButtonProps> = ({
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading = false,
  children,
  className,
  disabled,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.(e);
  };

  const baseClasses = 'relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-95';
  
  const variants = {
    contained: {
      primary: 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 text-white shadow-lg hover:shadow-xl',
      secondary: 'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-500 text-white shadow-lg hover:shadow-xl',
      success: 'bg-success-500 hover:bg-success-600 focus:ring-success-500 text-white shadow-lg hover:shadow-xl',
      warning: 'bg-warning-500 hover:bg-warning-600 focus:ring-warning-500 text-white shadow-lg hover:shadow-xl',
      danger: 'bg-danger-500 hover:bg-danger-600 focus:ring-danger-500 text-white shadow-lg hover:shadow-xl',
    },
    outlined: {
      primary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
      secondary: 'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-500',
      success: 'border-2 border-success-500 text-success-500 hover:bg-success-50 focus:ring-success-500',
      warning: 'border-2 border-warning-500 text-warning-500 hover:bg-warning-50 focus:ring-warning-500',
      danger: 'border-2 border-danger-500 text-danger-500 hover:bg-danger-50 focus:ring-danger-500',
    },
    text: {
      primary: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
      secondary: 'text-secondary-500 hover:bg-secondary-50 focus:ring-secondary-500',
      success: 'text-success-500 hover:bg-success-50 focus:ring-success-500',
      warning: 'text-warning-500 hover:bg-warning-50 focus:ring-warning-500',
      danger: 'text-danger-500 hover:bg-danger-50 focus:ring-danger-500',
    },
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        baseClasses,
        variants[variant][color],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <span className={cn('flex items-center justify-center', loading && 'opacity-0')}>
        {children}
      </span>

      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white opacity-30 animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </button>
  );
};

export default MaterialButton;
