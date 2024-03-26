import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useState } from 'react';

axios.defaults.baseURL = '';

interface AxiosMutationResult<ResponseType> {
  error: string | undefined;
  loading: boolean;
  execute: (params: AxiosRequestConfig) => Promise<AxiosResponse<ResponseType> | void>;
}

export const useAxiosMutation = <ResponseType, RequestType>(url: string): AxiosMutationResult<ResponseType> => {
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const execute = async (
    params: AxiosRequestConfig & { data?: RequestType },
  ): Promise<AxiosResponse<ResponseType> | void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<ResponseType> = await axios.request<ResponseType>({
        ...params,
        method: 'POST',
        url,
      });
      return response;
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { error, execute, loading };
};
