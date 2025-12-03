import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { fetchBalanceDetail, clearCurrentBalance } from '@/redux/slices/balancesSlice';

interface UseBalanceDetailParams {
  userId: string | null;
  autoFetch?: boolean;
}

export const useBalanceDetail = ({
  userId,
  autoFetch = true,
}: UseBalanceDetailParams) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentBalance, detailLoading, error } = useSelector(
    (state: RootState) => state.balances
  );

  const fetchData = useCallback(() => {
    if (userId) {
      dispatch(fetchBalanceDetail(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (autoFetch && userId) {
      fetchData();
    }

    return () => {
      dispatch(clearCurrentBalance());
    };
  }, [autoFetch, userId, fetchData, dispatch]);

  return {
    balance: currentBalance?.balance || null,
    recentChanges: currentBalance?.recent_changes || [],
    loading: detailLoading,
    error,
    refetch: fetchData,
  };
};
