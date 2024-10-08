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
 * @interface Organization
 */
export interface Organization {
  /**
   * Unique identifier for the organization
   *
   * @type {string}
   * @memberof Organization
   * @example 456e8977-e89b-12d3-a456-426614174000
   */
  o_id: string;

  /**
   * Name of the organization
   *
   * @type {string}
   * @memberof Organization
   * @example Doe Enterprises
   */
  name: string;

  /**
   * Street name of the organization address
   *
   * @type {string}
   * @memberof Organization
   * @example Main Street
   */
  street_name: string;

  /**
   * Street number of the organization address
   *
   * @type {string}
   * @memberof Organization
   * @example 100A
   */
  street_number: string;

  /**
   * Postal code of the organization address
   *
   * @type {string}
   * @memberof Organization
   * @example A1A 1A1
   */
  postal_code: string;

  /**
   * Country where the organization is located
   *
   * @type {string}
   * @memberof Organization
   * @example Canada
   */
  country: string;

  /**
   * City where the organization is located
   *
   * @type {string}
   * @memberof Organization
   * @example Ottawa
   */
  city: string;

  /**
   * Role of the organization in the context of the service
   *
   * @type {string}
   * @memberof Organization
   * @example admin
   */
  role: string;

  /**
   * Whether the organization is subscribed to a premium plan
   *
   * @type {boolean}
   * @memberof Organization
   * @example true
   */
  premium: boolean;
}
