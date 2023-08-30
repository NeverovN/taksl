import qs from 'qs';
import { Response } from 'src/common/types/api.types';

export class BaseAPI {
  baseURL = 'http://localhost:8080/api/v1';
  baseQueryParams = {};
  headers: HeadersInit_ = {
    'Content-Type': 'application/json',
  };

  private getQuery = (query: Record<string, unknown>) => {
    return qs.stringify(
      {
        ...this.baseQueryParams,
        ...query,
      },
      { indices: false, arrayFormat: 'comma' },
    );
  };

  handleResponse(
    data: Record<string, unknown>,
    status: number,
    ok: boolean,
  ): Response<unknown, never> {
    return { data, status, ok, error: undefined };
  }
  handleError(
    params: Record<string, unknown>,
    status: number = 0,
    ok: boolean = false,
  ): Response<any, Error> {
    return {
      error: Error(JSON.stringify(params)),
      status,
      ok,
      data: undefined,
    };
  }

  async doNetworkRequest({
    url,
    queryParams = {},
    method,
    body = undefined,
    headers = {},
  }: {
    url: string;
    queryParams?: Record<string, unknown>;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown>;
    headers?: HeadersInit_;
  }) {
    const query = this.getQuery(queryParams);

    console.log('endpoint:', `${this.baseURL}${url}?${query}`);
    console.log('method:', method);
    console.log('header:', this.headers);
    console.log('body', body);

    try {
      const response = await fetch(`${this.baseURL}${url}?${query}`, {
        method,
        headers: {
          ...this.headers,
          ...headers,
        },
        body: JSON.stringify(body),
      });

      console.log('status:', response.status);

      if (!response.ok || response.status !== 200) {
        return this.handleError(
          {
            message: response.statusText,
            code: response.status,
          },
          response.status,
          response.ok,
        );
      }

      const data = await response.json();

      console.log('response:', data);
      console.log('=========');

      return this.handleResponse(data, response.status, response.ok);
    } catch (e) {
      console.log('error:', e);
      console.log('=========');

      return this.handleError({ error: e });
    }
  }

  async get(
    url: string,
    query?: Record<string, unknown>,
    headers?: HeadersInit_,
  ) {
    return await this.doNetworkRequest({
      method: 'GET',
      url,
      queryParams: query,
      headers,
    });
  }

  async post(
    url: string,
    body: Record<string, unknown>,
    query?: Record<string, unknown>,
    headers?: HeadersInit_,
  ) {
    return await this.doNetworkRequest({
      method: 'POST',
      url,
      body,
      queryParams: query,
      headers,
    });
  }

  async put(
    url: string,
    body: Record<string, unknown>,
    query?: Record<string, unknown>,
    headers?: HeadersInit_,
  ) {
    return await this.doNetworkRequest({
      method: 'PUT',
      url,
      body,
      queryParams: query,
      headers,
    });
  }

  setAuthorization = (token: string) => {
    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    };
  };
}

export const baseApi = new BaseAPI();
