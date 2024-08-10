/* tslint:disable */
/* eslint-disable */
/**
 * Marsinet
 * The marsinet API description
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
import { Organization } from '../models';
import { ToggleUserActiveDto } from '../models';
import { UsersView } from '../models';
/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @summary Retrieves all users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    usersControllerFindAll: async (
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      const localVarPath = `/users`;
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
     * @summary Retrieves organization information
     * @param {string} id Organization UUID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    usersControllerGetOrganization: async (
      id: string,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'id' is not null or undefined
      if (id === null || id === undefined) {
        throw new RequiredError(
          'id',
          'Required parameter id was null or undefined when calling usersControllerGetOrganization.'
        );
      }
      const localVarPath = `/users/organizations/{id}`.replace(
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
     * @summary Toggles the active status of a user
     * @param {ToggleUserActiveDto} body User active status data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    usersControllerToggleActiveUser: async (
      body: ToggleUserActiveDto,
      options: AxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'body' is not null or undefined
      if (body === null || body === undefined) {
        throw new RequiredError(
          'body',
          'Required parameter body was null or undefined when calling usersControllerToggleActiveUser.'
        );
      }
      const localVarPath = `/users/active`;
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
  };
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function (configuration?: Configuration) {
  return {
    /**
     *
     * @summary Retrieves all users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersControllerFindAll(
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<UsersView>>
    > {
      const localVarAxiosArgs =
        await UsersApiAxiosParamCreator(configuration).usersControllerFindAll(
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
     * @summary Retrieves organization information
     * @param {string} id Organization UUID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersControllerGetOrganization(
      id: string,
      options?: AxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => Promise<AxiosResponse<Organization>>
    > {
      const localVarAxiosArgs = await UsersApiAxiosParamCreator(
        configuration
      ).usersControllerGetOrganization(id, options);
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
     * @summary Toggles the active status of a user
     * @param {ToggleUserActiveDto} body User active status data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersControllerToggleActiveUser(
      body: ToggleUserActiveDto,
      options?: AxiosRequestConfig
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>
    > {
      const localVarAxiosArgs = await UsersApiAxiosParamCreator(
        configuration
      ).usersControllerToggleActiveUser(body, options);
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
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     *
     * @summary Retrieves all users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersControllerFindAll(
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<UsersView>> {
      return UsersApiFp(configuration)
        .usersControllerFindAll(options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Retrieves organization information
     * @param {string} id Organization UUID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersControllerGetOrganization(
      id: string,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<Organization>> {
      return UsersApiFp(configuration)
        .usersControllerGetOrganization(id, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @summary Toggles the active status of a user
     * @param {ToggleUserActiveDto} body User active status data
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async usersControllerToggleActiveUser(
      body: ToggleUserActiveDto,
      options?: AxiosRequestConfig
    ): Promise<AxiosResponse<void>> {
      return UsersApiFp(configuration)
        .usersControllerToggleActiveUser(body, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
  /**
   *
   * @summary Retrieves all users
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public async usersControllerFindAll(
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<UsersView>> {
    return UsersApiFp(this.configuration)
      .usersControllerFindAll(options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Retrieves organization information
   * @param {string} id Organization UUID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public async usersControllerGetOrganization(
    id: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<Organization>> {
    return UsersApiFp(this.configuration)
      .usersControllerGetOrganization(id, options)
      .then((request) => request(this.axios, this.basePath));
  }
  /**
   *
   * @summary Toggles the active status of a user
   * @param {ToggleUserActiveDto} body User active status data
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof UsersApi
   */
  public async usersControllerToggleActiveUser(
    body: ToggleUserActiveDto,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<void>> {
    return UsersApiFp(this.configuration)
      .usersControllerToggleActiveUser(body, options)
      .then((request) => request(this.axios, this.basePath));
  }
}