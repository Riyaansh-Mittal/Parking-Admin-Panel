import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';

interface UserActionsProps {
  onEdit: () => void;
  onStatusChange: () => void;
  isActive: boolean;
  disabled?: boolean;
}

export const UserActions = ({
  onEdit,
  onStatusChange,
  isActive,
  disabled = false,
}: UserActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={onEdit}
        disabled={disabled}
        leftIcon={<Icon name="Edit" size="sm" />}
      >
        Edit Profile
      </Button>
      <Button
        variant={isActive ? 'danger' : 'primary'}
        size="sm"
        onClick={onStatusChange}
        disabled={disabled}
        leftIcon={<Icon name={isActive ? 'Ban' : 'Check'} size="sm" />}
      >
        {isActive ? 'Deactivate' : 'Activate'}
      </Button>
    </div>
  );
};
