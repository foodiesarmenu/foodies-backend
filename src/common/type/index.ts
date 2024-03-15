export type FindAll<T> = {
  data: T[];
  currentPage: number;
  numberOfPages: number;
  numberOfRecords: number;
};

export type GetAll = {
  limit?: number;
  skip?: number;
  sort?: string;
  order?: string;
  search?: string;
  paginate?: boolean;
  populate?: string[] | any[];
};
