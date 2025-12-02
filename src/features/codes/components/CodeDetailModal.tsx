import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime, formatNumber, formatPercentage } from '@/utils/formatters';
import type { ReferralCode } from '../types';

interface CodeDetailModalProps {
  code: ReferralCode | null;
  isOpen: boolean;
  onClose: () => void;
  onDeactivate?: (codeId: string) => void;
  onUpdate?: (codeId: string) => void;
}

const getStatusBadgeVariant = (status: string): 'success' | 'neutral' | 'warning' | 'error' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'neutral';
    case 'expired':
      return 'warning';
    case 'exhausted':
      return 'error';
    default:
      return 'neutral';
  }
};

export const CodeDetailModal = ({
  code,
  isOpen,
  onClose,
  onDeactivate,
  onUpdate,
}: CodeDetailModalProps) => {
  if (!code) return null;

  const detailSections = [
    {
      title: 'Basic Information',
      items: [
        { label: 'Code', value: code.code, copyable: true },
        {
          label: 'Type',
          value: (
            <Badge variant={code.code_type === 'campaign' ? 'info' : 'neutral'}>
              {code.code_type === 'campaign' ? 'Campaign' : 'User'}
            </Badge>
          ),
        },
        {
          label: 'Status',
          value: (
            <Badge variant={getStatusBadgeVariant(code.status)}>
              {code.status.charAt(0).toUpperCase() + code.status.slice(1)}
            </Badge>
          ),
        },
        { label: 'Valid', value: code.is_valid ? 'Yes' : 'No' },
      ],
    },
    {
      title: 'Campaign Information',
      items: [
        { label: 'Campaign Name', value: code.campaign_name || '—' },
        {
          label: 'Referrer Reward',
          value: code.campaign_reward_for_referrer || '—',
        },
        {
          label: 'Referred Reward',
          value: code.campaign_reward_for_referred || '—',
        },
      ],
    },
    {
      title: 'Owner Information',
      items: [
        { label: 'Owner Email', value: code.owner_email || '—' },
        { label: 'Owner User ID', value: code.owner_user_id || '—' },
      ],
    },
    {
      title: 'Usage Statistics',
      items: [
        { label: 'Current Usage', value: formatNumber(code.usage_count) },
        { label: 'Max Usage', value: formatNumber(code.max_usage) },
        { label: 'Usage Remaining', value: formatNumber(code.usage_remaining) },
        { label: 'Usage Rate', value: formatPercentage(code.usage_percentage) },
      ],
    },
    {
      title: 'Validity Period',
      items: [
        { label: 'Valid From', value: formatDateTime(code.valid_from) },
        {
          label: 'Valid Until',
          value: code.valid_until ? formatDateTime(code.valid_until) : 'No expiry',
        },
        {
          label: 'Days Until Expiry',
          value:
            code.days_until_expiry !== null ? `${code.days_until_expiry} days` : '—',
        },
        { label: 'Is Expired', value: code.is_expired ? 'Yes' : 'No' },
      ],
    },
    {
      title: 'Timestamps',
      items: [
        { label: 'Created At', value: formatDateTime(code.created_at) },
        { label: 'Updated At', value: formatDateTime(code.updated_at) },
      ],
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>Code Details</ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          {detailSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">{section.title}</h3>
              <div className="space-y-2.5">
                {section.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start justify-between border-b border-slate-100 pb-2.5 last:border-0"
                  >
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {typeof item.value === 'string' ? (
                        <span className="font-medium text-slate-900">{item.value}</span>
                      ) : (
                        item.value
                      )}
                      {(item as { copyable?: boolean }).copyable &&
                        typeof item.value === 'string' && (
                          <button
                            onClick={() => handleCopy(item.value as string)}
                            className="rounded p-1 hover:bg-slate-100"
                          >
                            <Icon name="Copy" size="sm" className="text-slate-400" />
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          {onUpdate && code.status === 'active' && (
            <Button variant="primary" onClick={() => onUpdate(code.id)}>
              Edit Code
            </Button>
          )}
          {onDeactivate && code.status === 'active' && (
            <Button
              variant="danger"
              onClick={() => onDeactivate(code.id)}
              leftIcon={<Icon name="Ban" size="sm" />}
            >
              Deactivate
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};

CodeDetailModal.displayName = 'CodeDetailModal';
