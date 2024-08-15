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
 * @interface PatientTable
 */
export interface PatientTable {
  /**
   * Unique identifier of the patient.
   *
   * @type {string}
   * @memberof PatientTable
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  p_id: string;

  /**
   * First name of the patient.
   *
   * @type {string}
   * @memberof PatientTable
   * @example John
   */
  name: string;

  /**
   * Surname of the patient.
   *
   * @type {string}
   * @memberof PatientTable
   * @example Doe
   */
  surnames: string;

  /**
   * List of institutions associated with the patient.
   *
   * @type {Array<string>}
   * @memberof PatientTable
   * @example ["Institution 1","Institution 2"]
   */
  institutions: Array<string>;

  /**
   * Total number of sessions the patient has attended.
   *
   * @type {number}
   * @memberof PatientTable
   * @example 20
   */
  total_session: number;

  /**
   * Date of the last session attended by the patient.
   *
   * @type {Date}
   * @memberof PatientTable
   */
  last_session?: Date;

  /**
   * Total number of steps taken by the patient.
   *
   * @type {number}
   * @memberof PatientTable
   * @example 5000
   */
  total_steps: number;
}
