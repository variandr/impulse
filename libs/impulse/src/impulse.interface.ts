export interface SuccessResponse<T> {
  timestamp: number;
  data: T;
}

export interface FailResponse {
  timestamp: number;
  error: {
    code: number;
    message: string;
  };
}

export interface CampaignResponse {
  csv: string;
  pagination: {
    next: string;
  };
}
