import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { GlowingEffect } from '../ui/glowing-effect';

interface GlowingCardProps {
  children: ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'white';
  glow?: boolean;
  disabled?: boolean;
  type?: 'template' | 'model' | 'message' | 'default';
}

const GlowingCard: React.FC<GlowingCardProps> = ({
  children,
  title,
  className = '',
  variant = 'default',
  glow = false,
  disabled = false,
  type = 'default'
}) => {
  // Define type-specific styles
  const typeStyles = {
    template: {
      borderColor: 'border-purple-200 dark:border-purple-800',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      glowColor: 'purple'
    },
    model: {
      borderColor: 'border-blue-200 dark:border-blue-800',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      glowColor: 'blue'
    },
    message: {
      borderColor: 'border-green-200 dark:border-green-800',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      glowColor: 'green'
    },
    default: {
      borderColor: 'border-gray-200 dark:border-gray-700',
      bgColor: 'bg-white dark:bg-gray-800',
      glowColor: 'default'
    }
  };

  const styles = typeStyles[type];

  return (
    <div className={cn(
      "relative rounded-lg border p-4 shadow-sm transition-all duration-200",
      styles.borderColor,
      styles.bgColor,
      "hover:shadow-md",
      glow ? "overflow-hidden" : "",
      className
    )}>
      <GlowingEffect
        variant={variant}
        glow={glow}
        disabled={disabled}
        blur={8}
        spread={40}
        borderWidth={1.5}
      />
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default GlowingCard;
