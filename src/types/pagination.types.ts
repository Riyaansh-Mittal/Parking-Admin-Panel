export interface PaginationParams {
  page: number;
  page_size: number;
}

export interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  total_pages: number;
  page_size: number;
}

export interface PaginatedResponse<T> {
  message: string;
  pagination: PaginationMeta;
  data: T[];
  status: number;
}

export interface SimplePaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
