/* eslint-disable @typescript-eslint/no-explicit-any */
import { getURLQueryValue } from "@/utils";
import { ApiClient } from "./ApiClient";

class BaseRepository {
  shop;
  httpClient;
  headers;
  query;

  constructor() {
    this.shop = getURLQueryValue("shop");
    this.httpClient = new ApiClient();
    this.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    this.query = {
      shop: this.shop, // Default query if needed
    };
  }

  url() {
    return "";
  }

  async list(query = this.query, headers = this.headers) {
    try {
      query = { ...query, ...this.query };
      const response = await this.httpClient.get(this.url(), {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async detail(id: string, query = this.query, headers = this.headers) {
    try {
      query = { ...query, ...this.query };
      const response = await this.httpClient.get(this.url() + "/" + id, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async create(data: any, query = this.query, headers = this.headers) {
    try {
      query = { ...query, ...this.query };

      const response = await this.httpClient.post(this.url(), data, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async update(
    id: string,
    data: any,
    query = this.query,
    headers = this.headers,
  ) {
    try {
      query = { ...query, ...this.query };

      const response = await this.httpClient.put(this.url() + "/" + id, data, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  async delete(id: string, query: any = {}, headers = this.headers) {
    try {
      const response = await this.httpClient.delete(this.url() + "/" + id, {
        params: query,
        headers: headers,
      });
      return this.success(response.data);
    } catch (e) {
      return this.handlerHttpError(e);
    }
  }

  handlerHttpError(e: any) {
    if (e.response && e.response.data) {
      const errorMsg = e.message;

      return this.error(errorMsg);
    } else {
      throw e;
    }
  }

  success(data: any) {
    return { status: true, response: data };
  }

  error(error: any) {
    return { status: false, response: error };
  }
}

export default BaseRepository;
