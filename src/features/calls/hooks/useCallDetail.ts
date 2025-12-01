import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCallDetail } from '@/redux/slices/callsSlice';

export const useCallDetail = (callId: string | undefined) => {
  const dispatch = useAppDispatch();
  const { currentCall, loading, error } = useAppSelector((state) => state.calls);

  useEffect(() => {
    if (callId) {
      dispatch(fetchCallDetail(callId));
    }
  }, [dispatch, callId]);

  return {
    call: currentCall,
    loading,
    error,
  };
};
