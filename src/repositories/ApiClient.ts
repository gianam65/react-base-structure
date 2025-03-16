import { getParameterQuery } from "@/utils";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

const params = getParameterQuery();

axios.defaults.baseURL = process.env.VITE_BASE_URL || "";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl: string = null) => {
  const baseURL = baseUrl ? baseUrl : process.env.VITE_BASE_URL + "/api/v1";
  const options: CreateAxiosDefaults = {
    baseURL,
  };

  options.headers = {
    // "Cache-Control": "max-age=3600",
  };

  options.params = params;
  options.params = {
    // hmac_keys: Object.keys(params),
    ...options.params,
  };
  const client = axios.create(options);

  // Add a response interceptor
  // client.interceptors.response.use(
  //     (response) => {
  //         if (response.config.method != 'get') {
  //             axios.get(`${baseURL}/public/sync-metafield?shop=${shop}`);
  //         }
  //         return response;
  //     },
  //     (error: AxiosError) => {
  //         if (error.response.status == 401) {
  //             return window.location.replace(
  //                 process.env.VITE_BASE_URL +
  //                     '/unauthorized' +
  //                     window.location.search,
  //             );
  //         }
  //         return Promise.reject(error);
  //     },
  // );

  return client;
};

class ApiClient {
  client: AxiosInstance;

  constructor(baseUrl: string = null) {
    this.client = getClient(baseUrl);
  }

  get(url: string, conf = {}) {
    return this.client
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  delete(url: string, conf = {}) {
    return this.client
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  head(url: string, conf = {}) {
    return this.client
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  options(url: string, conf = {}) {
    return this.client
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  post(url: string, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  put(url: string, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }

  patch(url: string, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url: string, conf = {}) {
    return getClient()
      .get(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  delete(url: string, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  head(url: string, conf = {}) {
    return getClient()
      .head(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  options(url: string, conf = {}) {
    return getClient()
      .options(url, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  post(url: string, data = {}, conf = {}) {
    return getClient()
      .post(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  put(url: string, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },

  patch(url: string, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error));
  },
};
