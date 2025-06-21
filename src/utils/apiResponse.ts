interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T | null;
  error?: any;
}

export const successResponse = <T>(message: string, data: T | null = null): ApiResponse<T> => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message: string, error: any): ApiResponse<null> => {
  return {
    success: false,
    message,
    error,
  };
};
