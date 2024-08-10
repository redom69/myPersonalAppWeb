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

/**
 *
 *
 * @export
 * @interface CreateUser
 */
export interface CreateUser {
  /**
   * First name of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example Jane
   */
  name: string;

  /**
   * Last name of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example Doe
   */
  surnames: string;

  /**
   * Email address of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example jane.doe@example.com
   */
  email: string;

  /**
   * Password of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example SecurePassword123!
   */
  password: string;

  /**
   * Phone number of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example +1234567890
   */
  phone: string;

  /**
   * Birth date of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example 1990-01-01
   */
  birth_date: string;

  /**
   * Nationality of the user
   *
   * @type {string}
   * @memberof CreateUser
   * @example Canadian
   */
  nationality: string;

  /**
   * Organization ID to which the user belongs
   *
   * @type {string}
   * @memberof CreateUser
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  organization_id: string;
}