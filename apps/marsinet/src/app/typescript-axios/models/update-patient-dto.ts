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
 * @interface UpdatePatientDto
 */
export interface UpdatePatientDto {
  /**
   * Unique identifier of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  p_id?: string;

  /**
   * List of organization IDs associated with the patient.
   *
   * @type {Array<string>}
   * @memberof UpdatePatientDto
   * @example ["123e4567-e89b-12d3-a456-426614174000"]
   */
  o_ids?: Array<string>;

  /**
   * Date of birth of the patient.
   *
   * @type {any}
   * @memberof UpdatePatientDto
   * @example 1980-01-01
   */
  birth_date?: any;

  /**
   * Sex of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example M
   */
  sex?: UpdatePatientDtoSexEnum;

  /**
   * List of diagnosed pathologies of the patient.
   *
   * @type {Array<string>}
   * @memberof UpdatePatientDto
   * @example ["Diabetes","Hypertension"]
   */
  pathology?: Array<string>;

  /**
   * List of diagnosed conditions of the patient.
   *
   * @type {Array<string>}
   * @memberof UpdatePatientDto
   * @example ["Arthritis"]
   */
  affectation?: Array<string>;

  /**
   * List of treatments assigned to the patient.
   *
   * @type {Array<string>}
   * @memberof UpdatePatientDto
   * @example ["Insulin","Metformin"]
   */
  treatment?: Array<string>;

  /**
   * City of residence of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example New York
   */
  city?: string;

  /**
   * Nationality of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example USA
   */
  nationality?: UpdatePatientDtoNationalityEnum;

  /**
   * First name of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example John
   */
  name?: string;

  /**
   * Surname of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example Doe
   */
  surnames?: string;

  /**
   * Phone number of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example +11234567890
   */
  phone?: string;

  /**
   * Email of the first legal guardian of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example guardian1@example.com
   */
  legal_guardian_email_1?: string;

  /**
   * Email of the second legal guardian of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example guardian2@example.com
   */
  legal_guardian_email_2?: string;

  /**
   * First name of the first legal guardian of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example Jane
   */
  legal_guardian_name_1?: string;

  /**
   * First name of the second legal guardian of the patient.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example Jack
   */
  legal_guardian_name_2?: string;

  /**
   * Weight of the patient in kilograms.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 70
   */
  weight?: number;

  /**
   * Height of the patient in centimeters.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 175
   */
  height?: number;

  /**
   * Shoe size of the patient.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 42
   */
  shoe_size?: number;

  /**
   * Length of the right femur in centimeters.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 25
   */
  femur_len_r?: number;

  /**
   * Length of the left femur in centimeters.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 25
   */
  femur_len_l?: number;

  /**
   * Length of the right tibia in centimeters.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 30
   */
  tibia_len_r?: number;

  /**
   * Length of the left tibia in centimeters.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 30
   */
  tibia_len_l?: number;

  /**
   * Length of the walker in meters, adjustable between 1 and 4.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 2
   */
  walker_len?: number;

  /**
   * Hip width in centimeters.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 30
   */
  hip_width?: number;

  /**
   * Chest size of the patient, either 'M' or 'L'.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example M
   */
  chest_size?: UpdatePatientDtoChestSizeEnum;

  /**
   * Hip flexion in degrees.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 10
   */
  flexos_hip?: number;

  /**
   * Knee flexion in degrees.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 15
   */
  flexos_knee?: number;

  /**
   * Indicates whether the patient has a pronounced abdomen.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   */
  abd?: number;

  /**
   * Indicates whether the patient has ankle lock.
   *
   * @type {boolean}
   * @memberof UpdatePatientDto
   * @example true
   */
  ankle_lock?: boolean;

  /**
   * Indicates whether the patient has a corset.
   *
   * @type {string}
   * @memberof UpdatePatientDto
   * @example true
   */
  corset?: UpdatePatientDtoCorsetEnum;

  /**
   * Version of the record for optimistic concurrency control.
   *
   * @type {number}
   * @memberof UpdatePatientDto
   * @example 1
   */
  version?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum UpdatePatientDtoSexEnum {
  M = 'M',
  F = 'F',
}
/**
 * @export
 * @enum {string}
 */
export enum UpdatePatientDtoNationalityEnum {
  AD = 'AD',
  AE = 'AE',
  AF = 'AF',
  AG = 'AG',
  AI = 'AI',
  AL = 'AL',
  AM = 'AM',
  AN = 'AN',
  AO = 'AO',
  AQ = 'AQ',
  AR = 'AR',
  AS = 'AS',
  AU = 'AU',
  AS_13 = 'AS',
  AW = 'AW',
  AZ = 'AZ',
  BA = 'BA',
  BB = 'BB',
  BD = 'BD',
  BE = 'BE',
  BF = 'BF',
  BH = 'BH',
  BI = 'BI',
  BJ = 'BJ',
  BM = 'BM',
  BO = 'BO',
  BR = 'BR',
  BS = 'BS',
  BT = 'BT',
  BU = 'BU',
  BV = 'BV',
  BW = 'BW',
  BX = 'BX',
  BY = 'BY',
  BZ = 'BZ',
  CA = 'CA',
  CC = 'CC',
  CF = 'CF',
  CG = 'CG',
  CH = 'CH',
  CI = 'CI',
  CK = 'CK',
  CL = 'CL',
  CM = 'CM',
  CN = 'CN',
  CO = 'CO',
  CR = 'CR',
  CU = 'CU',
  CV = 'CV',
  CX = 'CX',
  CY = 'CY',
  CZ = 'CZ',
  DE = 'DE',
  DJ = 'DJ',
  DK = 'DK',
  DM = 'DM',
  DO = 'DO',
  DZ = 'DZ',
  EC = 'EC',
  EE = 'EE',
  EG = 'EG',
  EH = 'EH',
  ER = 'ER',
  ES = 'ES',
  ET = 'ET',
  FI = 'FI',
  FJ = 'FJ',
  FK = 'FK',
  FM = 'FM',
  FO = 'FO',
  FR = 'FR',
  GA = 'GA',
  GB = 'GB',
  GD = 'GD',
  GE = 'GE',
  GF = 'GF',
  GH = 'GH',
  GI = 'GI',
  GL = 'GL',
  GM = 'GM',
  GN = 'GN',
  GP = 'GP',
  GQ = 'GQ',
  GR = 'GR',
  GS = 'GS',
  GT = 'GT',
  GU = 'GU',
  GW = 'GW',
  GY = 'GY',
  HK = 'HK',
  HM = 'HM',
  HN = 'HN',
  HR = 'HR',
  HT = 'HT',
  HU = 'HU',
  ID = 'ID',
  IE = 'IE',
  IL = 'IL',
  IN = 'IN',
  IO = 'IO',
  IQ = 'IQ',
  IR = 'IR',
  IS = 'IS',
  IT = 'IT',
  JM = 'JM',
  JO = 'JO',
  JP = 'JP',
  KE = 'KE',
  KG = 'KG',
  KH = 'KH',
  KI = 'KI',
  KM = 'KM',
  KN = 'KN',
  KP = 'KP',
  KR = 'KR',
  KW = 'KW',
  KY = 'KY',
  KZ = 'KZ',
  LA = 'LA',
  LB = 'LB',
  LC = 'LC',
  LI = 'LI',
  LK = 'LK',
  LR = 'LR',
  LS = 'LS',
  LT = 'LT',
  LU = 'LU',
  LV = 'LV',
  LY = 'LY',
  MA = 'MA',
  MC = 'MC',
  MD = 'MD',
  MG = 'MG',
  MH = 'MH',
  MK = 'MK',
  ML = 'ML',
  MM = 'MM',
  MN = 'MN',
  MO = 'MO',
  MP = 'MP',
  MQ = 'MQ',
  MR = 'MR',
  MS = 'MS',
  MT = 'MT',
  MU = 'MU',
  MV = 'MV',
  MW = 'MW',
  MX = 'MX',
  MY = 'MY',
  MZ = 'MZ',
  NA = 'NA',
  NC = 'NC',
  NE = 'NE',
  NF = 'NF',
  NG = 'NG',
  NI = 'NI',
  NE_156 = 'NE',
  NO = 'NO',
  NP = 'NP',
  NR = 'NR',
  NU = 'NU',
  NZ = 'NZ',
  OM = 'OM',
  PA = 'PA',
  PE = 'PE',
  PF = 'PF',
  PG = 'PG',
  PH = 'PH',
  PK = 'PK',
  PO = 'PO',
  PM = 'PM',
  PN = 'PN',
  PR = 'PR',
  PT = 'PT',
  PW = 'PW',
  PY = 'PY',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RU = 'RU',
  RW = 'RW',
  SA = 'SA',
  SB = 'SB',
  SC = 'SC',
  SD = 'SD',
  SE = 'SE',
  SG = 'SG',
  SH = 'SH',
  SI = 'SI',
  SJ = 'SJ',
  SK = 'SK',
  SL = 'SL',
  SM = 'SM',
  SN = 'SN',
  SO = 'SO',
  SR = 'SR',
  ST = 'ST',
  SV = 'SV',
  SY = 'SY',
  SZ = 'SZ',
  TC = 'TC',
  TD = 'TD',
  TF = 'TF',
  TG = 'TG',
  TH = 'TH',
  TI = 'TI',
  TK = 'TK',
  TM = 'TM',
  TN = 'TN',
  TO = 'TO',
  TP = 'TP',
  TR = 'TR',
  TT = 'TT',
  TV = 'TV',
  TW = 'TW',
  TZ = 'TZ',
  UA = 'UA',
  UG = 'UG',
  UK = 'UK',
  UM = 'UM',
  US = 'US',
  UY = 'UY',
  UZ = 'UZ',
  VA = 'VA',
  VC = 'VC',
  VE = 'VE',
  VG = 'VG',
  VN = 'VN',
  VU = 'VU',
  WF = 'WF',
  WS = 'WS',
  YE = 'YE',
  YT = 'YT',
  YU = 'YU',
  ZA = 'ZA',
  ZM = 'ZM',
  ZR = 'ZR',
  ZW = 'ZW',
}
/**
 * @export
 * @enum {string}
 */
export enum UpdatePatientDtoChestSizeEnum {
  M = 'M',
  L = 'L',
}
/**
 * @export
 * @enum {string}
 */
export enum UpdatePatientDtoCorsetEnum {
  SmallFlat = 'Small Flat',
  SmallCurve = 'Small Curve',
  BigFlat = 'Big Flat',
  BigCurve = 'Big Curve',
}
