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
 * @interface Session
 */
export interface Session {
  /**
   * Unique identifier of the session.
   *
   * @type {string}
   * @memberof Session
   * @example a3f5ad56-2c0b-4efb-b8e9-68c2a4a96b4d
   */
  id: string;

  /**
   * Number of automatic forward steps recorded in the session.
   *
   * @type {number}
   * @memberof Session
   * @example 100
   */
  steps_automatic_forward: number;

  /**
   * Number of automatic backward steps recorded in the session.
   *
   * @type {number}
   * @memberof Session
   * @example 50
   */
  steps_automatic_backward: number;

  /**
   * Number of intentional forward steps recorded in the session.
   *
   * @type {number}
   * @memberof Session
   * @example 75
   */
  steps_intention_forward: number;

  /**
   * Number of intentional backward steps recorded in the session.
   *
   * @type {number}
   * @memberof Session
   * @example 25
   */
  steps_intention_backward: number;

  /**
   * Degrees of hip flexion achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 30
   */
  flexos_hip: number;

  /**
   * Degrees of knee flexion achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 45
   */
  flexos_knee: number;

  /**
   * Degrees of ankle flexion achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 15
   */
  flexos_ankle: number;

  /**
   * Left hip threshold achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 20
   */
  threshold_hip_l: number;

  /**
   * Left knee threshold achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 25
   */
  threshold_knee_l: number;

  /**
   * Right hip threshold achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 20
   */
  threshold_hip_r: number;

  /**
   * Right knee threshold achieved during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 25
   */
  threshold_knee_r: number;

  /**
   * Score given by the therapist for the use of dungarees during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 8
   */
  therapist_dungarees: number;

  /**
   * Effort level perceived by the therapist during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 5
   */
  therapist_effort: number;

  /**
   * Device identifier associated with the session.
   *
   * @type {string}
   * @memberof Session
   * @example 8e5ac92a-db8f-4c28-aac1-5e4d2b3c5c18
   */
  d_id?: string;

  /**
   * Date of the session.
   *
   * @type {string}
   * @memberof Session
   * @example 2024-04-26
   */
  date: string;

  /**
   * Start time of the session.
   *
   * @type {string}
   * @memberof Session
   * @example 2024-04-26T08:00:00Z
   */
  start?: string;

  /**
   * End time of the session.
   *
   * @type {string}
   * @memberof Session
   * @example 2024-04-26T09:00:00Z
   */
  end: string;

  /**
   * Total time in minutes of automatic forward steps during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 10
   */
  time_automatic_forward: number;

  /**
   * Total time in minutes of automatic backward steps during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 5
   */
  time_automatic_backward: number;

  /**
   * Total time in minutes of intentional forward steps during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 15
   */
  time_intentiton_forward: number;

  /**
   * Total time in minutes of intentional backward steps during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 10
   */
  time_intention_backward: number;

  /**
   * Total number of steps taken by the patient during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 200
   */
  steps_total: number;

  /**
   * Total session time in minutes.
   *
   * @type {number}
   * @memberof Session
   * @example 60
   */
  time_total: number;

  /**
   * Step cadence of automatic forward steps per minute during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 2
   */
  cadence_automatic_forward: number;

  /**
   * Step cadence of automatic backward steps per minute during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 1
   */
  cadence_automatic_backward: number;

  /**
   * Step cadence of intentional forward steps per minute during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 1.5
   */
  cadence_intention_forward: number;

  /**
   * Step cadence of intentional backward steps per minute during the session.
   *
   * @type {number}
   * @memberof Session
   * @example 0.5
   */
  cadence_intention_backward: number;

  /**
   * Chest level achieved during the session. Can be used to assess the posture or equipment used.
   *
   * @type {number}
   * @memberof Session
   * @example 1
   */
  chest: number;

  /**
   * Overall session evaluation score, possibly based on a set of metrics or therapist's judgement.
   *
   * @type {number}
   * @memberof Session
   * @example 7
   */
  evaluation: number;

  /**
   * Identifier of the ingestion associated with the session.
   *
   * @type {string}
   * @memberof Session
   * @example fe338788-8b9a-4666-92b6-dd3b44c5a91d
   */
  ingestion_id: string;
}
