import { HTMLAttributes } from 'react';
import { cn } from '@utils';
import * as Icons from 'lucide-react';

export type IconName = keyof typeof Icons;

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  strokeWidth?: number;
}

export const Icon = ({
  name,
  size = 'md',
  color,
  strokeWidth = 2,
  className,
  ...props
}: IconProps) => {
  const IconComponent = Icons[name] as React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
  }>;

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const iconSize = typeof size === 'number' ? size : sizeMap[size];

  return (
    <span className={cn('inline-flex items-center', className)} {...props}>
      <IconComponent
        size={iconSize}
        color={color}
        strokeWidth={strokeWidth}
        className="shrink-0"
      />
    </span>
  );
};

Icon.displayName = 'Icon';
