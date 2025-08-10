export interface JarMetadataDto {
  id?: number;
  name: string;
  sizeInKb: number;
  createdAt: string;
}

export interface PageableObject {
  paged?: boolean;
  pageNumber?: number;
  pageSize?: number;
  unpaged?: boolean;
  offset?: number;
  sort?: SortObject;
}

export interface SortObject {
  sorted?: boolean;
  unsorted?: boolean;
  empty?: boolean;
}

export interface PageJarMetadataDto {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  first?: boolean;
  last?: boolean;
  size?: number;
  content?: JarMetadataDto[];
  number?: number;
  sort?: SortObject;
  numberOfElements?: number;
  empty?: boolean;
}

export interface ExecutionResponseDto {
  id?: number;
  pid?: number;
  executionStatus?: 'PENDING' | 'RUNNING' | 'FAILED' | 'KILLED';
  startedAt: string;
  endedAt?: string;
}

export interface ResponseDtoExecutionResponseDto {
  success: boolean;
  message: string;
  timestamp: string;
  data?: ExecutionResponseDto;
}

export interface PaginationParams {
  size?: number;
  page?: number;
  direction?: 'ASC' | 'DESC';
  properties?: string;
}
