/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'right',
  id
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-lg overflow-hidden transition-all duration-300 select-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    solid: "bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30",
    outline: "bg-transparent border-2 border-primary text-slate-800 dark:text-white hover:bg-primary hover:text-white",
    ghost: "bg-transparent text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    accent: "bg-accent text-white hover:bg-accent/90 shadow-md shadow-accent/20 hover:shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const buttonContent = (
    <span className="flex items-center justify-center gap-2">
      {icon && iconPosition === 'left' && <span className="transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </span>
  );

  return (
    <motion.button
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`group ${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {buttonContent}
    </motion.button>
  );
};
