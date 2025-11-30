import { post, get } from '../client';
import type { ApiResponse } from '../types';

export interface ExportRequest {
  export_type: 'regular' | 'admin' | 'calls' | 'campaigns' | 'relationships';
  format: 'csv' | 'excel';
  filters?: Record<string, unknown>;
}

export interface ExportResponse {
  task_id: string;
  status: 'processing';
  export_type: string;
  format: string;
  estimated_time: string;
  check_status_url: string;
  download_url: string;
}

export interface ExportStatus {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  state: string;
  file_ready: boolean;
  message: string;
  download_url?: string;
  file_size_bytes?: number;
  expires_at?: string;
}

/**
 * Start export task
 */
export const startExport = async (
  data: ExportRequest
): Promise<ApiResponse<ExportResponse>> => {
  return post<ApiResponse<ExportResponse>, ExportRequest>(
    '/auth/admin/export/',
    data
  );
};

/**
 * Check export status
 */
export const getExportStatus = async (
  taskId: string
): Promise<ApiResponse<ExportStatus>> => {
  return get<ApiResponse<ExportStatus>>(
    `/auth/admin/exports/${taskId}/status/`
  );
};

/**
 * Download export file (returns blob URL)
 */
export const downloadExport = async (taskId: string): Promise<Blob> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admin/exports/${taskId}/download/`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_access_token')}`,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Download failed');
  }
  
  return response.blob();
};
