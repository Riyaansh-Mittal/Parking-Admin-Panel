// Extending types from src/types/api.types.ts
export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
  status?: number | string;
}

export interface PaginatedApiResponse<T> {
  message: string;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    current_page: number;
    total_pages: number;
    page_size: number;
  };
  data: T[];
  status: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    status_code: number;
    context?: Record<string, unknown>;
    type?: string;
    correlation_id?: string;
  };
}

export interface ApiRequestConfig {
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
  timeout?: number;
}
