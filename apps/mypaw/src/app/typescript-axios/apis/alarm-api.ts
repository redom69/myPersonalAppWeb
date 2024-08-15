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
import { Alarm } from '../models';
import { UpdateAlarm } from '../models';
/**
 * AlarmApi - axios parameter creator
 * @export
 */
export const AlarmApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Create a new alarm
     * @param {Alarm} body Alarm data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    alarmControllerCreateAlarm: async (
      body: Alarm,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling alarmControllerCreateAlarm.'
        );
      }
      const localVarPath = `/alarm`;
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
     * @summary Delete an alarm by ID
     * @param {string} id Unique alarm identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    alarmControllerDeleteAlarm: async (
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling alarmControllerDeleteAlarm.'
        );
      }
      const localVarPath = `/alarm/{id}`.replace(
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
     * @summary Retrieves all alarms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    alarmControllerFindAll: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/alarm`;
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
     * @summary Retrieves all alarms for a specific device
     * @param {string} device_id Unique device identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    alarmControllerFindAllAlarmOfDevice: async (
      device_id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'device_id' is not null or undefined
      if (device_id === null || device_id === undefined) {
        throw new RequiredError(
          'device_id',
          'Required parameter device_id was null or undefined when calling alarmControllerFindAllAlarmOfDevice.'
        );
      }
      const localVarPath = `/alarm/of-device/{device_id}`.replace(
        `{${'device_id'}}`,
        encodeURIComponent(String(device_id))
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
     * @summary Retrieves all alarms for a specific device
     * @param {string} device_id Unique device identifier
     * @param {string} date Date to filter alarms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    alarmControllerFindAllAlarmOfDevicePerDay: async (
      device_id: string,
      date: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'device_id' is not null or undefined
      if (device_id === null || device_id === undefined) {
        throw new RequiredError(
          'device_id',
          'Required parameter device_id was null or undefined when calling alarmControllerFindAllAlarmOfDevicePerDay.'
        );
      }
      // verify required parameter 'date' is not null or undefined
      if (date === null || date === undefined) {
        throw new RequiredError(
          'date',
          'Required parameter date was null or undefined when calling alarmControllerFindAllAlarmOfDevicePerDay.'
        );
      }
      const localVarPath = `/alarm/of-device-per-day/{device_id}`.replace(
        `{${'device_id'}}`,
        encodeURIComponent(String(device_id))
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

      if (date !== undefined) {
        localVarQueryParameter['date'] = date;
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
     * @summary Update an alarm by ID
     * @param {UpdateAlarm} body Updated alarm data
     * @param {string} id Unique alarm identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    alarmControllerUpdateAlarm: async (
      body: UpdateAlarm,
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling alarmControllerUpdateAlarm.'
        );
      }
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling alarmControllerUpdateAlarm.'
        );
      }
      const localVarPath = `/alarm/{id}`.replace(
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
        method: 'PATCH',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

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
  };
};

/**
 * AlarmApi - functional programming interface
 * @export
 */
export const AlarmApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Create a new alarm
     * @param {Alarm} body Alarm data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerCreateAlarm(
      body: Alarm,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Alarm>>
    > {
      const localVarAxiosArgs = await AlarmApiAxiosParamCreator(
        configuration
      ).alarmControllerCreateAlarm(body, options);
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
     * @summary Delete an alarm by ID
     * @param {string} id Unique alarm identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerDeleteAlarm(
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Alarm>>
    > {
      const localVarAxiosArgs = await AlarmApiAxiosParamCreator(
        configuration
      ).alarmControllerDeleteAlarm(id, options);
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
     * @summary Retrieves all alarms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerFindAll(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<Alarm>>>
    > {
      const localVarAxiosArgs =
        await AlarmApiAxiosParamCreator(configuration).alarmControllerFindAll(
          options
        );
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
     * @summary Retrieves all alarms for a specific device
     * @param {string} device_id Unique device identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerFindAllAlarmOfDevice(
      device_id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<Alarm>>>
    > {
      const localVarAxiosArgs = await AlarmApiAxiosParamCreator(
        configuration
      ).alarmControllerFindAllAlarmOfDevice(device_id, options);
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
     * @summary Retrieves all alarms for a specific device
     * @param {string} device_id Unique device identifier
     * @param {string} date Date to filter alarms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerFindAllAlarmOfDevicePerDay(
      device_id: string,
      date: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Array<Alarm>>>
    > {
      const localVarAxiosArgs = await AlarmApiAxiosParamCreator(
        configuration
      ).alarmControllerFindAllAlarmOfDevicePerDay(device_id, date, options);
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
     * @summary Update an alarm by ID
     * @param {UpdateAlarm} body Updated alarm data
     * @param {string} id Unique alarm identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerUpdateAlarm(
      body: UpdateAlarm,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Alarm>>
    > {
      const localVarAxiosArgs = await AlarmApiAxiosParamCreator(
        configuration
      ).alarmControllerUpdateAlarm(body, id, options);
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
 * AlarmApi - factory interface
 * @export
 */
export const AlarmApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @summary Create a new alarm
     * @param {Alarm} body Alarm data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerCreateAlarm(
      body: Alarm,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Alarm>> {
      return AlarmApiFp(configuration)
        .alarmControllerCreateAlarm(body, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Delete an alarm by ID
     * @param {string} id Unique alarm identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerDeleteAlarm(
      id: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Alarm>> {
      return AlarmApiFp(configuration)
        .alarmControllerDeleteAlarm(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Retrieves all alarms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerFindAll(
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<Alarm>>> {
      return AlarmApiFp(configuration)
        .alarmControllerFindAll(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Retrieves all alarms for a specific device
     * @param {string} device_id Unique device identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerFindAllAlarmOfDevice(
      device_id: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<Alarm>>> {
      return AlarmApiFp(configuration)
        .alarmControllerFindAllAlarmOfDevice(device_id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Retrieves all alarms for a specific device
     * @param {string} device_id Unique device identifier
     * @param {string} date Date to filter alarms
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerFindAllAlarmOfDevicePerDay(
      device_id: string,
      date: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Array<Alarm>>> {
      return AlarmApiFp(configuration)
        .alarmControllerFindAllAlarmOfDevicePerDay(device_id, date, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Update an alarm by ID
     * @param {UpdateAlarm} body Updated alarm data
     * @param {string} id Unique alarm identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async alarmControllerUpdateAlarm(
      body: UpdateAlarm,
      id: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Alarm>> {
      return AlarmApiFp(configuration)
        .alarmControllerUpdateAlarm(body, id, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * AlarmApi - object-oriented interface
 * @export
 * @class AlarmApi
 * @extends {BaseAPI}
 */
export class AlarmApi extends BaseAPI {
  /**
   *
   * @summary Create a new alarm
   * @param {Alarm} body Alarm data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AlarmApi
   */
  public async alarmControllerCreateAlarm(
    body: Alarm,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Alarm>> {
    return AlarmApiFp(this.configuration)
      .alarmControllerCreateAlarm(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Delete an alarm by ID
   * @param {string} id Unique alarm identifier
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AlarmApi
   */
  public async alarmControllerDeleteAlarm(
    id: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Alarm>> {
    return AlarmApiFp(this.configuration)
      .alarmControllerDeleteAlarm(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Retrieves all alarms
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AlarmApi
   */
  public async alarmControllerFindAll(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<Alarm>>> {
    return AlarmApiFp(this.configuration)
      .alarmControllerFindAll(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Retrieves all alarms for a specific device
   * @param {string} device_id Unique device identifier
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AlarmApi
   */
  public async alarmControllerFindAllAlarmOfDevice(
    device_id: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<Alarm>>> {
    return AlarmApiFp(this.configuration)
      .alarmControllerFindAllAlarmOfDevice(device_id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Retrieves all alarms for a specific device
   * @param {string} device_id Unique device identifier
   * @param {string} date Date to filter alarms
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AlarmApi
   */
  public async alarmControllerFindAllAlarmOfDevicePerDay(
    device_id: string,
    date: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Array<Alarm>>> {
    return AlarmApiFp(this.configuration)
      .alarmControllerFindAllAlarmOfDevicePerDay(device_id, date, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Update an alarm by ID
   * @param {UpdateAlarm} body Updated alarm data
   * @param {string} id Unique alarm identifier
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof AlarmApi
   */
  public async alarmControllerUpdateAlarm(
    body: UpdateAlarm,
    id: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Alarm>> {
    return AlarmApiFp(this.configuration)
      .alarmControllerUpdateAlarm(body, id, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
