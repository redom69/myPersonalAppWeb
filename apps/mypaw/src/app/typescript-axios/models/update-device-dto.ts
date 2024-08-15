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

/**
 *
 *
 * @export
 * @interface UpdateDeviceDto
 */
export interface UpdateDeviceDto {
  /**
   * Indicates whether the device is active
   *
   * @type {boolean}
   * @memberof UpdateDeviceDto
   * @example true
   */
  active?: boolean;

  /**
   * Serial number of the device
   *
   * @type {string}
   * @memberof UpdateDeviceDto
   * @example SN123456789
   */
  serial?: string;

  /**
   * Version of the device structure
   *
   * @type {string}
   * @memberof UpdateDeviceDto
   * @example v1.0.0
   */
  structure_version?: string;

  /**
   * Password for the device, if applicable
   *
   * @type {string}
   * @memberof UpdateDeviceDto
   * @example p@ssw0rd
   */
  password?: string;

  /**
   * Model of the device
   *
   * @type {string}
   * @memberof UpdateDeviceDto
   * @example ModelXPro
   */
  model?: string;
}
