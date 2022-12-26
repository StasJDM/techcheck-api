import { PaginationOptions } from '../dto/pagination.dto';

export interface PaginationResponse<T> {
  data: T;
  pagination: PaginationOptions;
}
