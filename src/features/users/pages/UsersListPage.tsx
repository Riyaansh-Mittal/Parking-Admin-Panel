import { useState, useEffect, useCallback } from 'react';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { UserListTable } from '../components/UserListTable';
import { UserFilters } from '../components/UserFilters';
import { UserStatsCard } from '../components/UserStatsCard';
import { Pagination } from '@/components/molecules/Pagination';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { useUsers } from '../hooks/useUsers';
import { useUserStats } from '../hooks/useUserStats';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { startExport, checkExportStatus, clearExportTask } from '@/redux/slices/usersSlice';
import { usersService } from '@/api/services/users.service';
import { useDebounce } from '@/hooks/useDebounce';

export const UsersListPage = () => {
  const dispatch = useAppDispatch();
  const { users, pagination, filters, loading, error, loadUsers, applyFilters, resetFilters } =
    useUsers();
  const { stats, loading: statsLoading } = useUserStats();
  const { updateStatus } = useUpdateUser();
  const { exportTask, exportLoading } = useAppSelector((state) => state.users);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Load users on mount and when dependencies change
  useEffect(() => {
    loadUsers(currentPage, pageSize);
  }, [currentPage, pageSize, loadUsers]);

  // Apply search filter - wrap applyFilters in useCallback or disable the warning
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      applyFilters({ ...filters, search: debouncedSearch });
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  // Download handler - memoize with useCallback
  const handleDownload = useCallback(async () => {
    if (!exportTask?.task_id) return;

    try {
      const blob = await usersService.downloadExport(exportTask.task_id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Clear export task after download
      setTimeout(() => {
        dispatch(clearExportTask());
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [exportTask?.task_id, dispatch]);

  // Poll export status
  useEffect(() => {
    if (exportTask && exportTask.status === 'processing') {
      const interval = setInterval(async () => {
        await dispatch(checkExportStatus(exportTask.task_id));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [exportTask, dispatch]);

  // Handle export completion
  useEffect(() => {
    if (exportTask?.status === 'completed' && exportTask.file_ready) {
      handleDownload();
    }
  }, [exportTask?.status, exportTask?.file_ready, handleDownload]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleStatusChange = async (userId: string, isActive: boolean) => {
    const success = await updateStatus(userId, {
      is_active: isActive,
      reason: isActive ? 'Reactivated by admin' : 'Deactivated by admin',
    });

    if (success) {
      loadUsers(currentPage, pageSize);
    }
  };

  const handleExport = async () => {
    await dispatch(startExport(filters));
  };

  const handleCancelExport = () => {
    dispatch(clearExportTask());
  };

  return (
    <ListLayout
      title="Users"
      description="Manage and monitor all registered users"
      actions={
        <Button
          variant="primary"
          onClick={handleExport}
          disabled={exportLoading || !!exportTask}
          leftIcon={<Icon name="Download" size="sm" />}
        >
          {exportLoading ? 'Starting Export...' : 'Export Users'}
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <UserStatsCard stats={stats} loading={statsLoading} />

        {/* Error Alert */}
        {error && (
          <Alert variant="error" onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Export Progress */}
        {exportTask && (
          <Alert
            variant={exportTask.status === 'completed' ? 'success' : 'info'}
            onClose={exportTask.status !== 'processing' ? handleCancelExport : undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {exportTask.status === 'processing' && 'Exporting users...'}
                  {exportTask.status === 'completed' && 'Export completed!'}
                  {exportTask.status === 'failed' && 'Export failed'}
                </p>
                <p className="text-sm">{exportTask.message}</p>
              </div>
              {exportTask.status === 'completed' && exportTask.file_ready && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDownload}
                  leftIcon={<Icon name="Download" size="sm" />}
                >
                  Download
                </Button>
              )}
            </div>
          </Alert>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <UserFilters
            filters={filters}
            onFiltersChange={applyFilters}
            onReset={resetFilters}
          />
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by name, email, or phone..."
            fullWidth={false}
          />
        </div>

        {/* Users Table */}
        <UserListTable users={users} loading={loading} onStatusChange={handleStatusChange} />

        {/* Pagination */}
        {pagination && pagination.total_pages > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.total_pages}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </ListLayout>
  );
};
