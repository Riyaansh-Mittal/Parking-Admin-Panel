import { ImgHTMLAttributes, useState } from 'react';
import { cn } from '@utils';

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
  shape?: 'circle' | 'square';
}

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  shape = 'circle',
  className,
  ...props
}: AvatarProps) => {
  const [imageError, setImageError] = useState(false);

  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    away: 'bg-amber-500',
    busy: 'bg-rose-500',
  };

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const getInitials = (name: string): string => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative inline-block">
      {src && !imageError ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn(
            'object-cover',
            sizes[size],
            shapeStyles[shape],
            className
          )}
          onError={() => setImageError(true)}
          {...props}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center bg-indigo-100 font-semibold text-indigo-700',
            sizes[size],
            shapeStyles[shape],
            className
          )}
        >
          {name ? getInitials(name) : '?'}
        </div>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            statusSizes[size],
            statusColors[status]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
