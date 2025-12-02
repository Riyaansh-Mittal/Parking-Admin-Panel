import { Input } from '@/components/atoms/Input';
import { Textarea } from '@/components/atoms/Textarea';
import { Alert } from '@/components/molecules/Alert';
import type { CampaignWizardData } from '../../types';

interface Step1DetailsProps {
  data: CampaignWizardData;
  errors: Partial<Record<keyof CampaignWizardData, string>>;
  onChange: (field: keyof CampaignWizardData, value: string) => void;
}

export const Step1Details = ({ data, errors, onChange }: Step1DetailsProps) => {
  return (
    <div className="space-y-6">
      <Alert variant="info">
        Provide basic information about your referral campaign
      </Alert>

      <Input
        label="Campaign Name"
        placeholder="e.g., Summer 2025 Referral Campaign"
        value={data.name}
        onChange={(e) => onChange('name', e.target.value)}
        error={errors.name}
        required
        fullWidth
      />

      <Textarea
        label="Description"
        placeholder="Describe the purpose and details of this campaign..."
        value={data.description}
        onChange={(e) => onChange('description', e.target.value)}
        error={errors.description}
        rows={4}
        required
        fullWidth
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Valid From"
          type="datetime-local"
          value={data.valid_from}
          onChange={(e) => onChange('valid_from', e.target.value)}
          error={errors.valid_from}
          required
          fullWidth
        />

        <Input
          label="Valid Until"
          type="datetime-local"
          value={data.valid_until}
          onChange={(e) => onChange('valid_until', e.target.value)}
          error={errors.valid_until}
          required
          fullWidth
        />
      </div>

      {errors.valid_from && errors.valid_until && (
        <Alert variant="error">Please ensure valid dates are selected</Alert>
      )}
    </div>
  );
};
