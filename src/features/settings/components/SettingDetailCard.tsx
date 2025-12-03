import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime } from '@/utils/formatters';
import type { PlatformSetting } from '../types';

interface SettingDetailCardProps {
  setting: PlatformSetting;
  onEdit: () => void;
}

export const SettingDetailCard = ({
  setting,
  onEdit,
}: SettingDetailCardProps) => {
  const formatValue = (): string => {
    if (setting.setting_type === 'boolean') {
      return setting.value ? 'Yes' : 'No';
    }
    if (setting.setting_type === 'json') {
      try {
        return JSON.stringify(JSON.parse(String(setting.value)), null, 2);
      } catch {
        return String(setting.value);
      }
    }
    return String(setting.value);
  };

  const getCategoryColor = (
    category: string
  ): 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
    const colorMap: Record<
      string,
      'success' | 'info' | 'warning' | 'error' | 'neutral'
    > = {
      call_management: 'info',
      system: 'neutral',
      billing: 'success',
      security: 'error',
      notifications: 'warning',
    };
    return colorMap[category] || 'neutral';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {setting.display_name}
            </h2>
            <p className="mt-1 font-mono text-sm text-slate-500">
              {setting.key}
            </p>
          </div>
          <Button onClick={onEdit} leftIcon={<Icon name="Edit2" size="sm" />}>
            Edit Setting
          </Button>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              Description
            </h3>
            <p className="text-slate-900">{setting.description}</p>
          </div>

          {/* Current Value */}
          <div>
            <h3 className="mb-2 text-sm font-semibold text-slate-700">
              Current Value
            </h3>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              {setting.setting_type === 'json' ? (
                <pre className="overflow-x-auto text-sm">
                  <code>{formatValue()}</code>
                </pre>
              ) : (
                <p className="font-mono text-lg font-semibold text-slate-900">
                  {formatValue()}
                </p>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Category
              </h3>
              <Badge variant={getCategoryColor(setting.category)}>
                {setting.category.replace('_', ' ')}
              </Badge>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Group
              </h3>
              <p className="text-slate-900">{setting.group}</p>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Type
              </h3>
              <Badge variant="neutral">{setting.setting_type}</Badge>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Editable By
              </h3>
              <Badge
                variant={
                  setting.editable_by === 'superuser' ? 'error' : 'neutral'
                }
              >
                {setting.editable_by}
              </Badge>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Visible in UI
              </h3>
              <Badge variant={setting.visible_in_ui ? 'success' : 'neutral'}>
                {setting.visible_in_ui ? 'Yes' : 'No'}
              </Badge>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Requires Restart
              </h3>
              <Badge variant={setting.requires_restart ? 'warning' : 'neutral'}>
                {setting.requires_restart ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>

          {/* Validation Rules */}
          {(setting.min_value || setting.max_value) && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Validation Rules
              </h3>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-4">
                  {setting.min_value && (
                    <div>
                      <span className="text-sm text-slate-600">Minimum:</span>
                      <span className="ml-2 font-mono font-semibold text-slate-900">
                        {setting.min_value}
                      </span>
                    </div>
                  )}
                  {setting.max_value && (
                    <div>
                      <span className="text-sm text-slate-600">Maximum:</span>
                      <span className="ml-2 font-mono font-semibold text-slate-900">
                        {setting.max_value}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Help Text */}
          {setting.help_text && (
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                Help Text
              </h3>
              <p className="text-sm text-slate-600">{setting.help_text}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-700">
                Created At
              </h3>
              <p className="text-sm text-slate-600">
                {formatDateTime(setting.created_at)}
              </p>
            </div>

            <div>
              <h3 className="mb-1 text-sm font-semibold text-slate-700">
                Last Updated
              </h3>
              <p className="text-sm text-slate-600">
                {formatDateTime(setting.updated_at)}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
