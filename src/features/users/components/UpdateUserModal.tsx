import { useForm } from 'react-hook-form';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import type { User, UpdateUserPayload } from '@/features/users/types';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSubmit: (data: UpdateUserPayload) => Promise<void>;
  loading: boolean;
}

export const UpdateUserModal = ({
  isOpen,
  onClose,
  user,
  onSubmit,
  loading,
}: UpdateUserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserPayload>({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number || '',
      license_plate_number: user.license_plate_number || '',
      vehicle_type: user.vehicle_type || '',
      vehicle_model: user.vehicle_model || '',
    },
  });

  const handleFormSubmit = async (data: UpdateUserPayload) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <ModalHeader onClose={handleClose}>Update User</ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First Name" error={errors.first_name?.message}>
                <Input
                  {...register('first_name', { required: 'First name is required' })}
                  placeholder="John"
                  error={!!errors.first_name}
                />
              </FormField>

              <FormField label="Last Name" error={errors.last_name?.message}>
                <Input
                  {...register('last_name', { required: 'Last name is required' })}
                  placeholder="Doe"
                  error={!!errors.last_name}
                />
              </FormField>
            </div>

            {/* Phone */}
            <FormField label="Phone Number" error={errors.phone_number?.message}>
              <Input
                {...register('phone_number')}
                type="tel"
                placeholder="+1234567890"
                error={!!errors.phone_number}
              />
            </FormField>

            {/* Vehicle Info */}
            <div className="border-t border-slate-200 pt-4">
              <h4 className="mb-3 text-sm font-semibold text-slate-700">Vehicle Information</h4>

              <FormField label="License Plate" error={errors.license_plate_number?.message}>
                <Input
                  {...register('license_plate_number')}
                  placeholder="ABC123"
                  error={!!errors.license_plate_number}
                />
              </FormField>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <FormField label="Vehicle Type" error={errors.vehicle_type?.message}>
                  <Input
                    {...register('vehicle_type')}
                    placeholder="Sedan"
                    error={!!errors.vehicle_type}
                  />
                </FormField>

                <FormField label="Vehicle Model" error={errors.vehicle_model?.message}>
                  <Input
                    {...register('vehicle_model')}
                    placeholder="Tesla Model 3"
                    error={!!errors.vehicle_model}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button type="button" variant="ghost" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
