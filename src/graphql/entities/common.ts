export interface Pagination {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ComposableQueryArgs {
  [key: string]: any;
  updateRoute?: boolean;
  limit?: number;
  keyParam?: string;
}

interface PageAndOrderByParams {
  page: number;
  itemsPerPage: number;
  orderBy: string | undefined;
}

export interface CommonParams extends PageAndOrderByParams {
  query: string | undefined;
}
