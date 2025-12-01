import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { AdminListTable } from '../components/AdminListTable';
import { AdminFilters } from '../components/AdminFilters';
import { AdminStatsCard } from '../components/AdminStatsCard';
import { Pagination } from '@/components/molecules/Pagination';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { useAdmins } from '../hooks/useAdmins';
import { useAdminStats } from '../hooks/useAdminStats';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateAdminStatus } from '@/redux/slices/adminsSlice';
import { useDebounce } from '@/hooks/useDebounce';

export const AdminsListPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    admins,
    pagination,
    filters,
    loading,
    error,
    loadAdmins,
    applyFilters,
    resetFilters,
  } = useAdmins();
  const { stats, loading: statsLoading } = useAdminStats();
  const isSuperuser = useAppSelector(
    (state) => state.auth.user?.is_superuser ?? false
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Load admins on mount and when dependencies change
  useEffect(() => {
    loadAdmins(currentPage, pageSize);
  }, [currentPage, pageSize, loadAdmins]);

  // Apply search filter
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      applyFilters({ ...filters, search: debouncedSearch });
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

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
    try {
      await dispatch(
        updateAdminStatus({
          userId,
          data: {
            is_active: isActive,
            reason: isActive
              ? 'Reactivated by superuser'
              : 'Deactivated by superuser',
          },
        })
      ).unwrap();

      // Reload admins list
      loadAdmins(currentPage, pageSize);
    } catch {
      // Error handled by Redux state
    }
  };

  const handleViewDetail = (userId: string) => {
    navigate(`/admins/${userId}`);
  };

  const handleRegisterAdmin = () => {
    navigate('/admins/register');
  };

  return (
    <ListLayout
      title="Admin Users"
      description="Manage admin users and superusers"
      actions={
        isSuperuser ? (
          <Button
            variant="primary"
            onClick={handleRegisterAdmin}
            leftIcon={<Icon name="UserPlus" size="sm" />}
          >
            Register Admin
          </Button>
        ) : null
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <AdminStatsCard stats={stats} loading={statsLoading} />

        {/* Error Alert */}
        {error && (
          <Alert variant="error" onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Filters and Search */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AdminFilters
            filters={filters}
            onFiltersChange={applyFilters}
            onReset={resetFilters}
          />
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by email or name..."
            fullWidth={false}
          />
        </div>

        {/* Admins Table */}
        <AdminListTable
          admins={admins}
          loading={loading}
          onStatusChange={isSuperuser ? handleStatusChange : undefined}
          onViewDetail={handleViewDetail}
        />

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
