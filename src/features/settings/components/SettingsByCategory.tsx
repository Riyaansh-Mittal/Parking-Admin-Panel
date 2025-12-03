import { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import type { PlatformSetting } from '@api/services/settings.service';
import type { SettingsByCategoryMap } from '../types';

interface SettingsByCategoryProps {
  settings: PlatformSetting[];
  onEdit: (setting: PlatformSetting) => void;
}

type IconName = 'Phone' | 'Settings' | 'DollarSign' | 'Shield' | 'Bell';

export const SettingsByCategory = ({ settings, onEdit }: SettingsByCategoryProps) => {
  const settingsByCategory = useMemo(() => {
    const grouped: SettingsByCategoryMap = {};

    settings.forEach((setting) => {
      if (!grouped[setting.category]) {
        grouped[setting.category] = [];
      }
      grouped[setting.category].push(setting);
    });

    // Sort within each category by sort_order
    Object.keys(grouped).forEach((category) => {
      grouped[category].sort((a, b) => a.sort_order - b.sort_order);
    });

    return grouped;
  }, [settings]);

  const getCategoryIcon = (category: string): IconName => {
    const iconMap: Record<string, IconName> = {
      call_management: 'Phone',
      system: 'Settings',
      billing: 'DollarSign',
      security: 'Shield',
      notifications: 'Bell',
    };
    return iconMap[category] || 'Settings';
  };

  const formatValue = (setting: PlatformSetting): string => {
    if (setting.setting_type === 'boolean') {
      return setting.value ? 'Yes' : 'No';
    }
    if (setting.setting_type === 'json') {
      return 'JSON Object';
    }
    return String(setting.value);
  };

  return (
    <div className="space-y-6">
      {Object.entries(settingsByCategory).map(([category, categorySettings]) => (
        <Card key={category}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Icon name={getCategoryIcon(category)} size="md" />
              <h3 className="text-lg font-semibold capitalize">
                {category.replace('_', ' ')}
              </h3>
              <Badge variant="neutral" size="sm">
                {categorySettings.length}
              </Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {categorySettings.map((setting) => (
                <div
                  key={setting.key}
                  className="flex items-start justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
                >
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <h4 className="font-medium text-slate-900">
                        {setting.display_name}
                      </h4>
                      <Badge variant="neutral" size="sm">
                        {setting.setting_type}
                      </Badge>
                      {setting.editable_by === 'superuser' && (
                        <Badge variant="error" size="sm">
                          Superuser Only
                        </Badge>
                      )}
                    </div>
                    <p className="mb-2 text-sm text-slate-600">{setting.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-slate-500">Current Value:</span>
                      <span className="font-mono text-sm font-semibold text-slate-900">
                        {formatValue(setting)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onEdit(setting)}
                    className="ml-4 rounded p-2 text-slate-600 hover:bg-slate-200 hover:text-indigo-600"
                    title="Edit Setting"
                  >
                    <Icon name="Edit2" size="sm" />
                  </button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
