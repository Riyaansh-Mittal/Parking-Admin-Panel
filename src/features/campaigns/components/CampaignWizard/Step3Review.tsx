import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { formatDateTime, formatCurrency } from '@/utils/formatters';
import type { CampaignWizardData } from '../../types';

interface Step3ReviewProps {
  data: CampaignWizardData;
}

export const Step3Review = ({ data }: Step3ReviewProps) => {
  const totalReward =
    (data.reward_for_referrer || 0) + (data.reward_for_referred || 0);
  const isValid = new Date(data.valid_from) < new Date(data.valid_until);

  return (
    <div className="space-y-6">
      <Alert variant="info">Review your campaign details before creating</Alert>

      {/* Campaign Details */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Campaign Details
        </h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Campaign Name</p>
            <p className="mt-1 font-medium text-slate-900">{data.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Description</p>
            <p className="mt-1 text-slate-700">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Validity Period */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Validity Period
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Valid From</p>
            <div className="mt-1 flex items-center gap-2">
              <Icon name="Calendar" size="sm" className="text-slate-400" />
              <p className="font-medium text-slate-900">
                {formatDateTime(data.valid_from)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500">Valid Until</p>
            <div className="mt-1 flex items-center gap-2">
              <Icon name="Calendar" size="sm" className="text-slate-400" />
              <p className="font-medium text-slate-900">
                {formatDateTime(data.valid_until)}
              </p>
            </div>
          </div>
        </div>
        {!isValid && (
          <Alert variant="error" className="mt-4">
            Invalid date range: End date must be after start date
          </Alert>
        )}
      </div>

      {/* Rewards Summary */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Reward Structure
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-emerald-100 p-2">
                <Icon name="Gift" className="text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-emerald-600">Referrer Reward</p>
                <p className="text-xl font-bold text-emerald-700">
                  {formatCurrency(data.reward_for_referrer || 0)}
                </p>
              </div>
            </div>
            <Badge variant="success">Per Referral</Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-sky-50 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-sky-100 p-2">
                <Icon name="UserPlus" className="text-sky-600" />
              </div>
              <div>
                <p className="text-sm text-sky-600">Referred User Reward</p>
                <p className="text-xl font-bold text-sky-700">
                  {formatCurrency(data.reward_for_referred || 0)}
                </p>
              </div>
            </div>
            <Badge variant="info">Per Referral</Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-slate-100 p-4">
            <div>
              <p className="text-sm text-slate-600">Total Cost per Referral</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(totalReward)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Initial Code Generation */}
      {data.initial_code_count && data.initial_code_count > 0 && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
          <div className="flex items-center gap-2">
            <Icon name="Hash" className="text-indigo-600" />
            <div>
              <p className="font-medium text-indigo-900">
                {data.initial_code_count} codes will be generated
              </p>
              <p className="text-sm text-indigo-600">
                Codes will be created immediately after campaign creation
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
