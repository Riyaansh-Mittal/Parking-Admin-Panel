import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime } from '@/utils/formatters';
import type { TableColumn } from '@/types/table.types';
import type { PlatformSetting } from '@api/services/settings.service';

interface SettingsTableProps {
  settings: PlatformSetting[];
  loading: boolean;
  onEdit: (setting: PlatformSetting) => void;
  onViewDetail: (key: string) => void;
}

export const SettingsTable = ({
  settings,
  loading,
  onEdit,
  onViewDetail,
}: SettingsTableProps) => {
  const getSettingTypeColor = (
    type: string
  ): 'success' | 'info' | 'warning' | 'neutral' => {
    const colorMap: Record<string, 'success' | 'info' | 'warning' | 'neutral'> = {
      string: 'neutral',
      integer: 'info',
      decimal: 'success',
      boolean: 'warning',
      json: 'info',
    };
    return colorMap[type] || 'neutral';
  };

  const getCategoryColor = (
    category: string
  ): 'success' | 'info' | 'warning' | 'error' | 'neutral' => {
    const colorMap: Record<string, 'success' | 'info' | 'warning' | 'error' | 'neutral'> = {
      call_management: 'info',
      system: 'neutral',
      billing: 'success',
      security: 'error',
      notifications: 'warning',
    };
    return colorMap[category] || 'neutral';
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

  const columns: TableColumn<PlatformSetting>[] = [
    {
      key: 'display_name',
      label: 'Setting Name',
      render: (_value, setting) => (
        <div className="flex flex-col">
          <button
            onClick={() => onViewDetail(setting.key)}
            className="text-left font-medium text-indigo-600 hover:text-indigo-800"
          >
            {setting.display_name}
          </button>
          <span className="text-xs text-slate-500">{setting.key}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (_value, setting) => (
        <Badge variant={getCategoryColor(setting.category)}>
          {setting.category.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'group',
      label: 'Group',
      render: (_value, setting) => (
        <span className="text-sm text-slate-700">{setting.group}</span>
      ),
    },
    {
      key: 'setting_type',
      label: 'Type',
      render: (_value, setting) => (
        <Badge variant={getSettingTypeColor(setting.setting_type)} size="sm">
          {setting.setting_type}
        </Badge>
      ),
    },
    {
      key: 'value',
      label: 'Current Value',
      render: (_value, setting) => (
        <span className="font-mono text-sm text-slate-900">
          {formatValue(setting)}
        </span>
      ),
    },
    {
      key: 'editable_by',
      label: 'Editable By',
      render: (_value, setting) => (
        <Badge variant={setting.editable_by === 'superuser' ? 'error' : 'neutral'} size="sm">
          {setting.editable_by}
        </Badge>
      ),
    },
    {
      key: 'updated_at',
      label: 'Last Updated',
      render: (_value, setting) => (
        <span className="text-sm text-slate-600">
          {formatDateTime(setting.updated_at)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_value, setting) => (
        <button
          onClick={() => onEdit(setting)}
          className="rounded p-1.5 text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
          title="Edit Setting"
        >
          <Icon name="Edit2" size="sm" />
        </button>
      ),
    },
  ];

  return (
    <DataTable<PlatformSetting>
      data={settings}
      columns={columns}
      loading={loading}
      emptyMessage="No settings found"
      rowKey="key"
    />
  );
};
