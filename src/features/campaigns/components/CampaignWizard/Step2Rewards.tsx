import { Input } from '@/components/atoms/Input';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { formatCurrency } from '@/utils/formatters';
import type { CampaignWizardData } from '../../types';

interface Step2RewardsProps {
  data: CampaignWizardData;
  errors: Partial<Record<keyof CampaignWizardData, string>>;
  onChange: (field: keyof CampaignWizardData, value: string | number) => void;
}

export const Step2Rewards = ({ data, errors, onChange }: Step2RewardsProps) => {
  const totalRewardPerReferral =
    (data.reward_for_referrer || 0) + (data.reward_for_referred || 0);

  return (
    <div className="space-y-6">
      <Alert variant="info">
        Set reward amounts for both the referrer and the referred user
      </Alert>

      {/* Referrer Reward */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon name="Gift" className="text-emerald-600" />
          <h3 className="text-lg font-semibold text-emerald-900">
            Referrer Reward
          </h3>
        </div>
        <Input
          label="Amount"
          type="number"
          min={0}
          step={0.01}
          placeholder="0.00"
          value={data.reward_for_referrer || ''}
          onChange={(e) =>
            onChange('reward_for_referrer', parseFloat(e.target.value) || 0)
          }
          error={errors.reward_for_referrer}
          required
          fullWidth
          leftIcon={<Icon name="DollarSign" size="sm" />}
        />
        <p className="mt-2 text-sm text-emerald-700">
          Reward given to the user who shares the referral code
        </p>
      </div>

      {/* Referred User Reward */}
      <div className="rounded-lg border border-sky-200 bg-sky-50 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon name="UserPlus" className="text-sky-600" />
          <h3 className="text-lg font-semibold text-sky-900">
            Referred User Reward
          </h3>
        </div>
        <Input
          label="Amount"
          type="number"
          min={0}
          step={0.01}
          placeholder="0.00"
          value={data.reward_for_referred || ''}
          onChange={(e) =>
            onChange('reward_for_referred', parseFloat(e.target.value) || 0)
          }
          error={errors.reward_for_referred}
          required
          fullWidth
          leftIcon={<Icon name="DollarSign" size="sm" />}
        />
        <p className="mt-2 text-sm text-sky-700">
          Reward given to the user who uses the referral code
        </p>
      </div>

      {/* Total Cost Preview */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">
            Total cost per referral
          </span>
          <span className="text-xl font-bold text-slate-900">
            {formatCurrency(totalRewardPerReferral)}
          </span>
        </div>
      </div>

      {/* Optional: Initial Code Generation */}
      <div className="rounded-lg border border-slate-200 p-4">
        <Input
          label="Initial Code Count (Optional)"
          type="number"
          min={0}
          max={1000}
          placeholder="0"
          value={data.initial_code_count || ''}
          onChange={(e) =>
            onChange(
              'initial_code_count',
              e.target.value ? parseInt(e.target.value, 10) : ''
            )
          }
          error={errors.initial_code_count}
          fullWidth
        />
        <p className="mt-2 text-sm text-slate-500">
          Generate codes immediately after creating the campaign (can be done
          later)
        </p>
      </div>
    </div>
  );
};
