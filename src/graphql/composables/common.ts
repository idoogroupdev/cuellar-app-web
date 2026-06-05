export interface PageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ComposableQueryArgs {
  updateRoute?: boolean;
  limit?: number;
  keyParam?: string;
}

interface PageAndOrderByParams {
  page: number;
  orderBy: string | undefined;
}

export interface CommonParams extends PageAndOrderByParams {
  query: string | undefined;
}
