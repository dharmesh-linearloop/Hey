import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';

import axios from 'axios';

@Injectable()
export class AxiosService {
  async post(params: { url: string; data?: any; config?: AxiosRequestConfig }) {
    const { url, data = {}, config = {} } = params;

    return axios
      .post(url, data, config)
      .then((response) => {
        if (response?.data?.data) {
          return { status: 'success', data: response?.data?.data };
        } else {
          return { status: 'success', data: response?.data };
        }
      })
      .catch((error) => {
        return { status: 'error', data: error?.response?.data };
      });
  }

  async get(params: { url: string; data?: any; config?: AxiosRequestConfig }) {
    const { url, config = {} } = params;

    return axios
      .get(url, config)
      .then((response) => {
        if (response?.data?.data) {
          return { status: 'success', data: response?.data?.data };
        } else {
          return { status: 'success', data: response?.data };
        }
      })
      .catch((error) => {
        return { status: 'error', data: error?.response?.data };
      });
  }

  async delete(params: {
    url: string;
    data?: any;
    config?: AxiosRequestConfig;
  }) {
    const { url, config = {} } = params;

    return axios
      .delete(url, config)
      .then((response) => {
        if (response?.data?.data) {
          return { status: 'success', data: response?.data?.data };
        } else {
          return { status: 'success', data: response?.data };
        }
      })
      .catch((error) => {
        return { status: 'error', data: error?.response?.data };
      });
  }

  async request(params: {
    url?: string;
    data?: any;
    config: AxiosRequestConfig;
  }) {
    const { config } = params;

    return axios
      .request(config)
      .then((response) => {
        if (response?.data?.data) {
          return { status: 'success', data: response?.data?.data };
        } else {
          return { status: 'success', data: response?.data };
        }
      })
      .catch((error) => {
        return { status: 'error', data: error?.response?.data };
      });
  }
}
