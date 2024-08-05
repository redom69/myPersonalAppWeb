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
 * @interface Alarm
 */
export interface Alarm {
  /**
   * Unique identifier of the alarm ingestion.
   *
   * @type {string}
   * @memberof Alarm
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  i_id?: string;

  /**
   * Unique identifier of the alarm.
   *
   * @type {string}
   * @memberof Alarm
   * @example 456e7891-b12c-34d5-e678-426614174001
   */
  id?: string;

  /**
   * Timestamp of when the alarm was last updated.
   *
   * @type {any}
   * @memberof Alarm
   * @example 2023-01-15T08:30:00Z
   */
  updated_at?: any;

  /**
   * Type of the event that triggered the alarm.
   *
   * @type {string}
   * @memberof Alarm
   * @example ERROR
   */
  event_type: string;

  /**
   * Unique identifier of the event.
   *
   * @type {string}
   * @memberof Alarm
   * @example e1
   */
  event_id: string;

  /**
   * Value associated with the alarm event.
   *
   * @type {number}
   * @memberof Alarm
   * @example 100
   */
  value: number;

  /**
   * Timestamp of when the event occurred.
   *
   * @type {any}
   * @memberof Alarm
   * @example 2023-01-15T08:30:00Z
   */
  timestamp: any;

  /**
   * Additional parameters associated with the alarm.
   *
   * @type {any}
   * @memberof Alarm
   * @example {"key":"value"}
   */
  params: any;

  /**
   * Version of the alarm.
   *
   * @type {string}
   * @memberof Alarm
   * @example v1
   */
  version: string;
}
