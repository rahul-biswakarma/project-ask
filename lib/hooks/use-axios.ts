import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

axios.defaults.baseURL = '';

interface AxiosHookResult<ResponseType> {
  data: ResponseType | undefined;
  error: string | undefined;
  loading: boolean;
}

interface PaginationParams {
  page: number;
  pageSize: number;
}

interface AxiosProps<RequestType> extends AxiosRequestConfig {
  url: string;
  data?: RequestType & PaginationParams;
}

export const useAxios = <ResponseType, RequestType>(
  axiosParams: AxiosProps<RequestType>,
): AxiosHookResult<ResponseType> => {
  const [data, setData] = useState<ResponseType>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (params: AxiosProps<RequestType>): Promise<void> => {
    try {
      const result: AxiosResponse<ResponseType> = await axios.request<ResponseType>({
        ...params,
        method: params?.method ?? 'POST',
      });
      setData(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Serialize axiosParams before passing it to useEffect dependency
  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { data, error, loading };
};
