export class CreateResponse<T> {
  success: boolean;
  data: T | any;
}

export class CreateOrderResponse<R> extends CreateResponse<R> {
  transaction?: any;
}

export class UpdateResponse<T> {
  success: boolean;
  data: T;
}

export class FindAllResponse<T> {
  success: boolean;
  data: T[];
  currentPage?: number;
  numberOfPages?: number;
  numberOfRecords?: number;
}

export class FindOneResponse<T> {
  success: boolean;
  data: T;
}

export class RemoveResponse {
  success: boolean;
}

export class AuthResponse<T> {
  success: boolean;
  status?: number;
  message?: string;
  user: T;
  accessToken: string;
}

export class OTPResponse {
  message: string;
  to: string;
  status?: string;
}

export class changePasswordResponse<T> {
  success: boolean;
  data: T;
}