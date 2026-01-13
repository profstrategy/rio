'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Spinner } from './spinner'; // Ensure you have this import if using Spinner

interface ButtonProps {
  width?: string;
  height?: string;
  loading?: boolean;
  loadingSize?: string;
  iconSpacing?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset';
}

const AppButton: React.FC<ButtonProps> = ({
  type = 'button',
  width = 'auto',
  height = 'auto', // Changed to auto to fit content nicely
  loading = false,
  iconSpacing = false,
  icon,
  iconPosition = 'end',
  className = '',
  onClick,
  disabled = false,
  children,
  variant = 'primary',
}) => {
  const [active, setActive] = useState(false);

  const handleMouseDown = () => setActive(true);
  const handleMouseUp = () => setActive(false);

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  // 1. Updated Base Classes to match your specific style (text-xs, font-bold, rounded-full)
  const baseClasses = `
    flex justify-${iconSpacing ? 'around' : 'center'} items-center
    text-xs font-bold rounded-full outline-none transition-all duration-300 select-none
    ${disabled || loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
    ${active ? 'shadow-md' : ''}
    ${
      loading
        ? 'w-[40px] h-[40px] p-2 justify-center' // Circular shape when loading
        : `w-[${width}] h-[${height}] px-6 py-2` // Matches your "px-6 py-2" preference
    }
  `;

  // 2. Updated Variants to use your preferred Blue and Glow
  const variantClasses =
    variant === 'secondary'
      ? `bg-slate-700 text-white border border-white/10 hover:bg-slate-600`
      : `bg-blue-600 text-white hover:bg-blue-500 btn-glow shadow-lg shadow-blue-500/30`; 
      // ^^^ Added bg-blue-600 and btn-glow here

  const renderContent = () => {
    if (loading) return <Spinner />; // Or your specific LoadingIcon

    if (iconPosition === 'start') {
      return (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      );
    }

    return (
      <>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </>
    );
  };

  return (
    <motion.button
      className={`
        ${baseClasses}
        ${variantClasses}
        ${className} 
      `}
      type={type}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled || loading}
      initial={{ opacity: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }} // Subtle hover scale
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {renderContent()}
    </motion.button>
  );
};

export default AppButton;