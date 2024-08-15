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
 * @interface CreateDeviceDto
 */
export interface CreateDeviceDto {
  /**
   * Optional model of the device.
   *
   * @type {string}
   * @memberof CreateDeviceDto
   * @example Model X Pro
   */
  model?: string;

  /**
   * Optional serial number of the device.
   *
   * @type {string}
   * @memberof CreateDeviceDto
   * @example SN123456789
   */
  serial?: string;

  /**
   * Optional version of the device structure, indicating the device`s hardware or software configuration.
   *
   * @type {string}
   * @memberof CreateDeviceDto
   * @example v1.0.0
   */
  structure_version?: string;

  /**
   * Optional password for device access or configuration, if applicable.
   *
   * @type {string}
   * @memberof CreateDeviceDto
   * @example P@ssw0rd!
   */
  password?: string;

  /**
   * Optional identifier of the organization that owns the device.
   *
   * @type {string}
   * @memberof CreateDeviceDto
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  o_id?: string;
}
