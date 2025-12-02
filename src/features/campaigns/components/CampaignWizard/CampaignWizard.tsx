import { useState } from 'react';
import { Stepper, type Step } from '@/components/molecules/Stepper';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Step1Details } from './Step1Details';
import { Step2Rewards } from './Step2Rewards';
import { Step3Review } from './Step3Review';
import { useCreateCampaign } from '../../hooks';
import type { CampaignWizardData } from '../../types';

interface CampaignWizardProps {
  onSuccess?: (campaignId: string) => void;
  onCancel?: () => void;
}

const steps: Step[] = [
  { id: 'details', label: 'Details', description: 'Basic information', icon: 'FileText' },
  { id: 'rewards', label: 'Rewards', description: 'Set reward amounts', icon: 'Gift' },
  { id: 'review', label: 'Review', description: 'Confirm & create', icon: 'CheckCircle' },
];

export const CampaignWizard = ({ onSuccess, onCancel }: CampaignWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<CampaignWizardData>({
    name: '',
    description: '',
    valid_from: '',
    valid_until: '',
    reward_for_referrer: 0,
    reward_for_referred: 0,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CampaignWizardData, string>>>({});

  const { createCampaign, loading, error: createError } = useCreateCampaign();

  const handleChange = (field: keyof CampaignWizardData, value: string | number | undefined) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof CampaignWizardData, string>> = {};

    if (step === 0) {
      if (!data.name.trim()) newErrors.name = 'Campaign name is required';
      if (!data.description.trim()) newErrors.description = 'Description is required';
      if (!data.valid_from) newErrors.valid_from = 'Start date is required';
      if (!data.valid_until) newErrors.valid_until = 'End date is required';
      if (data.valid_from && data.valid_until) {
        if (new Date(data.valid_from) >= new Date(data.valid_until)) {
          newErrors.valid_until = 'End date must be after start date';
        }
      }
    }

    if (step === 1) {
      if (!data.reward_for_referrer || data.reward_for_referrer <= 0) {
        newErrors.reward_for_referrer = 'Referrer reward must be greater than 0';
      }
      if (!data.reward_for_referred || data.reward_for_referred <= 0) {
        newErrors.reward_for_referred = 'Referred reward must be greater than 0';
      }
      if (data.initial_code_count && (data.initial_code_count < 0 || data.initial_code_count > 1000)) {
        newErrors.initial_code_count = 'Must be between 0 and 1000';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    const payload = {
      name: data.name,
      description: data.description,
      reward_for_referrer: data.reward_for_referrer,
      reward_for_referred: data.reward_for_referred,
      valid_from: new Date(data.valid_from).toISOString(),
      valid_until: new Date(data.valid_until).toISOString(),
    };

    const success = await createCampaign(payload);
    if (success) {
      // Note: API doesn't return campaign ID directly, need to handle this
      onSuccess?.('created');
    }
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        allowClickToNavigate
      />

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 0 && (
          <Step1Details data={data} errors={errors} onChange={handleChange} />
        )}
        {currentStep === 1 && (
          <Step2Rewards data={data} errors={errors} onChange={handleChange} />
        )}
        {currentStep === 2 && <Step3Review data={data} />}
      </div>

      {/* Error Alert */}
      {createError && <Alert variant="error">{createError}</Alert>}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        <div>
          {currentStep > 0 && (
            <Button variant="ghost" onClick={handleBack} disabled={loading}>
              <Icon name="ChevronLeft" size="sm" />
              Back
            </Button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>

          {currentStep < steps.length - 1 ? (
            <Button variant="primary" onClick={handleNext}>
              Next
              <Icon name="ChevronRight" size="sm" />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit} loading={loading}>
              <Icon name="Check" size="sm" />
              Create Campaign
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
