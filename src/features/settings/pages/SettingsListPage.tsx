import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Pagination } from '@/components/molecules/Pagination';
import {
  SettingsTable,
  SettingEditDialog,
  SettingsByCategory,
  SettingFilters,
  ExecuteCronDialog,
  InitializeSettingsDialog,
} from '../components';
import { useSettings } from '../hooks';
import type { PlatformSetting, SettingFilters as Filters } from '../types';

export const SettingsListPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'table' | 'category'>('category');
  const [selectedSetting, setSelectedSetting] = useState<PlatformSetting | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCronDialogOpen, setIsCronDialogOpen] = useState(false);
  const [isInitDialogOpen, setIsInitDialogOpen] = useState(false);

  const { settings, pagination, loading, error, fetchSettings, refetch } = useSettings({
    page: 1,
    page_size: 100, // Fetch all for category view
  });

  const handleEdit = (setting: PlatformSetting) => {
    setSelectedSetting(setting);
    setIsEditDialogOpen(true);
  };

  const handleViewDetail = (key: string) => {
    navigate(`/settings/${key}`);
  };

  const handleFiltersChange = (filters: Filters) => {
    fetchSettings(filters);
  };

  const handleReset = () => {
    fetchSettings({ page: 1, page_size: 100 });
  };

  const handlePageChange = (page: number) => {
    fetchSettings({ page, page_size: pagination?.page_size || 20 });
  };

  const handlePageSizeChange = (pageSize: number) => {
    fetchSettings({ page: 1, page_size: pageSize });
  };

  return (
    <ListLayout
      title="Platform Settings"
      description="Manage system configuration and platform settings"
      actions={
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setIsInitDialogOpen(true)}
            leftIcon={<Icon name="Settings2" size="sm" />}
          >
            Initialize
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsCronDialogOpen(true)}
            leftIcon={<Icon name="Clock" size="sm" />}
          >
            Execute Cron
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Settings</p>
                <p className="text-2xl font-bold text-slate-900">
                  {pagination?.count || settings.length}
                </p>
              </div>
              <Icon name="Settings" size="lg" className="text-slate-400" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Admin Editable</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {settings.filter((s) => s.editable_by === 'admin').length}
                </p>
              </div>
              <Icon name="User" size="lg" className="text-emerald-400" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Superuser Only</p>
                <p className="text-2xl font-bold text-rose-600">
                  {settings.filter((s) => s.editable_by === 'superuser').length}
                </p>
              </div>
              <Icon name="ShieldAlert" size="lg" className="text-rose-400" />
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && <Alert variant="error">{error}</Alert>}

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('table')}
              leftIcon={<Icon name="List" size="sm" />}
            >
              Table View
            </Button>
            <Button
              variant={viewMode === 'category' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setViewMode('category')}
              leftIcon={<Icon name="LayoutGrid" size="sm" />}
            >
              Category View
            </Button>
          </div>
        </div>

        {/* Filters */}
        <SettingFilters
          filters={{}}
          onFiltersChange={handleFiltersChange}
          onReset={handleReset}
        />

        {/* Content */}
        {viewMode === 'table' ? (
          <>
            <SettingsTable
              settings={settings}
              loading={loading}
              onEdit={handleEdit}
              onViewDetail={handleViewDetail}
            />

            {pagination && pagination.total_pages > 1 && (
              <Pagination
                currentPage={pagination.current_page}
                totalPages={pagination.total_pages}
                pageSize={pagination.page_size}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </>
        ) : (
          <SettingsByCategory settings={settings} onEdit={handleEdit} />
        )}
      </div>

      {/* Dialogs */}
      <SettingEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        setting={selectedSetting}
        onSuccess={refetch}
      />

      <ExecuteCronDialog
        isOpen={isCronDialogOpen}
        onClose={() => setIsCronDialogOpen(false)}
        onSuccess={refetch}
      />

      <InitializeSettingsDialog
        isOpen={isInitDialogOpen}
        onClose={() => setIsInitDialogOpen(false)}
        onSuccess={refetch}
      />
    </ListLayout>
  );
};
