export interface ApiResponse<T = unknown> {
  message: string;
  data: T;
  status?: number | string;
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

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  access_expires_in: number;
  refresh_expires_in: number;
  token_version: number;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  admin_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: 'admin' | 'superuser';
  is_superuser: boolean;
  session_id: string;
  token_version: number;
  access_expires_in: number;
  refresh_expires_in: number;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
}
