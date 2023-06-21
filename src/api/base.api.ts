import qs from 'qs';
import { Response } from 'src/common/types/api.types';

export class BaseAPI {
  baseURL = 'http://localhost:8080/api/v1/';
  baseQueryParams = {};

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
    return { data, status, ok };
  }
  handleError(
    params: Record<string, unknown>,
    status: number = 0,
    ok: boolean = false,
  ): Response<any, Error> {
    return { error: Error(JSON.stringify(params)), status, ok };
  }

  async doNetworkRequest({
    url,
    queryParams = {},
    method,
    body = {},
  }: {
    url: string;
    queryParams?: Record<string, unknown>;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown>;
  }) {
    const query = this.getQuery(queryParams);

    try {
      const response = await fetch(`${this.baseURL}${url}?${query}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

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

      return this.handleResponse(data, response.status, response.ok);
    } catch (e) {
      return this.handleError({ error: e });
    }
  }

  async get(url: string, query?: Record<string, unknown>) {
    return await this.doNetworkRequest({
      method: 'GET',
      url,
      queryParams: query,
    });
  }

  async post(
    url: string,
    body: Record<string, unknown>,
    query?: Record<string, unknown>,
  ) {
    return await this.doNetworkRequest({
      method: 'POST',
      url,
      body,
      queryParams: query,
    });
  }
}

export const baseApi = new BaseAPI();
