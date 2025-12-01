import { Icon } from '@/components/atoms/Icon';

interface CallRatingDisplayProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
}

export const CallRatingDisplay = ({
  rating,
  maxRating = 5,
  size = 'md',
  label,
  showValue = true,
}: CallRatingDisplayProps) => {
  // Map size to Icon component's size prop
  const iconSize = size;

  const stars = Array.from({ length: maxRating }, (_, index) => {
    const starValue = index + 1;
    const isFilled = rating >= starValue;
    const isHalfFilled = rating >= starValue - 0.5 && rating < starValue;

    return (
      <span key={index} className="relative">
        <Icon
          name="Star"
          size={iconSize}
          className={
            isFilled
              ? 'fill-amber-400 text-amber-400'
              : isHalfFilled
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-slate-300'
          }
        />
      </span>
    );
  });

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-slate-500">{label}</span>}
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm font-medium text-slate-700">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};
