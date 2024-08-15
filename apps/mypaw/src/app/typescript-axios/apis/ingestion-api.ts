/* tslint:disable */
/* eslint-disable */
/**
 *
 * The  API description
 *
 * OpenAPI spec version: 2.1.1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, {
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from '../base';
/**
 * IngestionApi - axios parameter creator
 * @export
 */
export const IngestionApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Download the file of an ingestion
     * @param {string} name The name of the file to download
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerDownloadFile: async (
      name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'name' is not null or undefined
      if (name === null || name === undefined) {
        throw new RequiredError(
          'name',
          'Required parameter name was null or undefined when calling ingestionControllerDownloadFile.'
        );
      }
      const localVarPath = `/ingestion/download/{name}`.replace(
        `{${'name'}}`,
        encodeURIComponent(String(name))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {string} date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerDownloadFilesByDate: async (
      date: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'date' is not null or undefined
      if (date === null || date === undefined) {
        throw new RequiredError(
          'date',
          'Required parameter date was null or undefined when calling ingestionControllerDownloadFilesByDate.'
        );
      }
      const localVarPath = `/ingestion/download-file-by-day/{date}`.replace(
        `{${'date'}}`,
        encodeURIComponent(String(date))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Download a group of files of an ingestion
     * @param {Array<string>} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerDownloadGroupFiles: async (
      body: Array<string>,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling ingestionControllerDownloadGroupFiles.'
        );
      }
      const localVarPath = `/ingestion/files`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      localVarHeaderParameter['Content-Type'] = 'application/json';

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      const needsSerialization =
        typeof body !== 'string' ||
        localVarRequestOptions.headers['Content-Type'] === 'application/json';
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(body !== undefined ? body : {})
        : body || '';

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Retrieve all ingestions
     * @param {string} [page] The page number
     * @param {string} [limit] The number of items per page
     * @param {string} [search] The search term
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerFindAll: async (
      page?: string,
      limit?: string,
      search?: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/ingestion`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      if (page !== undefined) {
        localVarQueryParameter['page'] = page;
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit;
      }

      if (search !== undefined) {
        localVarQueryParameter['search'] = search;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Retrieve an ingestion by fileName to visualize it
     * @param {string} file_name The file name of the ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerFindOne: async (
      file_name: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'file_name' is not null or undefined
      if (file_name === null || file_name === undefined) {
        throw new RequiredError(
          'file_name',
          'Required parameter file_name was null or undefined when calling ingestionControllerFindOne.'
        );
      }
      const localVarPath = `/ingestion/{fileName}`.replace(
        `{${'fileName'}}`,
        encodeURIComponent(String(file_name))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Process the content of the compressed file
     * @param {string} file The compressed file to process
     * @param {any} id The ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerProcessCsv: async (
      file: string,
      id: any,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'file' is not null or undefined
      if (file === null || file === undefined) {
        throw new RequiredError(
          'file',
          'Required parameter file was null or undefined when calling ingestionControllerProcessCsv.'
        );
      }
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling ingestionControllerProcessCsv.'
        );
      }
      const localVarPath = `/ingestion/process/{file}/{id}`
        .replace(`{${'file'}}`, encodeURIComponent(String(file)))
        .replace(`{${'id'}}`, encodeURIComponent(String(id)));
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'GET',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Delete an ingestion by ID
     * @param {string} id The unique identifier of the ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerRemove: async (
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling ingestionControllerRemove.'
        );
      }
      const localVarPath = `/ingestion/{id}`.replace(
        `{${'id'}}`,
        encodeURIComponent(String(id))
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'DELETE',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @summary Upload a compressed file with a csv and a json file
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    ingestionControllerUploadFiles: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/ingestion/upload`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, 'https://example.com');
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions: AxiosRequestConfig = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication bearer required
      // http bearer authentication required
      if (configuration && configuration.accessToken) {
        const accessToken =
          typeof configuration.accessToken === 'function'
            ? await configuration.accessToken()
            : await configuration.accessToken;
        localVarHeaderParameter['Authorization'] = 'Bearer ' + accessToken;
      }

      const query = new URLSearchParams(localVarUrlObj.search);
      for (const key in localVarQueryParameter) {
        query.set(key, localVarQueryParameter[key]);
      }
      for (const key in options.params) {
        query.set(key, options.params[key]);
      }
      localVarUrlObj.search = new URLSearchParams(query).toString();
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url:
          localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * IngestionApi - functional programming interface
 * @export
 */
export const IngestionApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Download the file of an ingestion
     * @param {string} name The name of the file to download
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerDownloadFile(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerDownloadFile(name, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @param {string} date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerDownloadFilesByDate(
      date: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerDownloadFilesByDate(date, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Download a group of files of an ingestion
     * @param {Array<string>} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerDownloadGroupFiles(
      body: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerDownloadGroupFiles(body, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Retrieve all ingestions
     * @param {string} [page] The page number
     * @param {string} [limit] The number of items per page
     * @param {string} [search] The search term
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerFindAll(
      page?: string,
      limit?: string,
      search?: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerFindAll(page, limit, search, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Retrieve an ingestion by fileName to visualize it
     * @param {string} file_name The file name of the ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerFindOne(
      file_name: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerFindOne(file_name, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Process the content of the compressed file
     * @param {string} file The compressed file to process
     * @param {any} id The ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerProcessCsv(
      file: string,
      id: any,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerProcessCsv(file, id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Delete an ingestion by ID
     * @param {string} id The unique identifier of the ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerRemove(
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await IngestionApiAxiosParamCreator(
        configuration
      ).ingestionControllerRemove(id, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     *
     * @summary Upload a compressed file with a csv and a json file
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerUploadFiles(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<string>>
    > {
      const localVarAxiosArgs =
        await IngestionApiAxiosParamCreator(
          configuration
        ).ingestionControllerUploadFiles(options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs: AxiosRequestConfig = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url,
        };
        return axios.request(axiosRequestArgs);
      };
    },
  };
};

/**
 * IngestionApi - factory interface
 * @export
 */
export const IngestionApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @summary Download the file of an ingestion
     * @param {string} name The name of the file to download
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerDownloadFile(
      name: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerDownloadFile(name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {string} date
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerDownloadFilesByDate(
      date: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerDownloadFilesByDate(date, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Download a group of files of an ingestion
     * @param {Array<string>} body
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerDownloadGroupFiles(
      body: Array<string>,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerDownloadGroupFiles(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Retrieve all ingestions
     * @param {string} [page] The page number
     * @param {string} [limit] The number of items per page
     * @param {string} [search] The search term
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerFindAll(
      page?: string,
      limit?: string,
      search?: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerFindAll(page, limit, search, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Retrieve an ingestion by fileName to visualize it
     * @param {string} file_name The file name of the ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerFindOne(
      file_name: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerFindOne(file_name, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Process the content of the compressed file
     * @param {string} file The compressed file to process
     * @param {any} id The ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerProcessCsv(
      file: string,
      id: any,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerProcessCsv(file, id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Delete an ingestion by ID
     * @param {string} id The unique identifier of the ingestion
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerRemove(
      id: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return IngestionApiFp(configuration)
        .ingestionControllerRemove(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Upload a compressed file with a csv and a json file
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async ingestionControllerUploadFiles(
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<string>> {
      return IngestionApiFp(configuration)
        .ingestionControllerUploadFiles(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * IngestionApi - object-oriented interface
 * @export
 * @class IngestionApi
 * @extends {BaseAPI}
 */
export class IngestionApi extends BaseAPI {
  /**
   *
   * @summary Download the file of an ingestion
   * @param {string} name The name of the file to download
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerDownloadFile(
    name: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerDownloadFile(name, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @param {string} date
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerDownloadFilesByDate(
    date: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerDownloadFilesByDate(date, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Download a group of files of an ingestion
   * @param {Array<string>} body
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerDownloadGroupFiles(
    body: Array<string>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerDownloadGroupFiles(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Retrieve all ingestions
   * @param {string} [page] The page number
   * @param {string} [limit] The number of items per page
   * @param {string} [search] The search term
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerFindAll(
    page?: string,
    limit?: string,
    search?: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerFindAll(page, limit, search, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Retrieve an ingestion by fileName to visualize it
   * @param {string} file_name The file name of the ingestion
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerFindOne(
    file_name: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerFindOne(file_name, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Process the content of the compressed file
   * @param {string} file The compressed file to process
   * @param {any} id The ingestion
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerProcessCsv(
    file: string,
    id: any,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerProcessCsv(file, id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Delete an ingestion by ID
   * @param {string} id The unique identifier of the ingestion
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerRemove(
    id: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerRemove(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Upload a compressed file with a csv and a json file
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof IngestionApi
   */
  public async ingestionControllerUploadFiles(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<string>> {
    return IngestionApiFp(this.configuration)
      .ingestionControllerUploadFiles(options)
      .then((request) => request(this.axios, this.basePath));
  }
}
