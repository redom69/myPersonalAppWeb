export interface RootObject {
  device_id: string;
  model: string;
  components: Component[];
  data: Datum[];
}
export interface Datum {
  data_id: number;
  timestamp: string;
  patient_id: string;
  session_id: string;
  general: General;
  motors: Motors;
  config_mode?: Configmode;
  config_patient?: Configpatient;
  alarms?: Alarm[];
  evaluation_data?: Evaluationdata;
}
interface Evaluationdata {
  other_clinical_evaluations: number[];
  goal_comments: string;
  final_comments: string;
}
interface Alarm {
  event_type: string;
  event_id: number;
  value: number;
  message: string;
  params: Param[];
}
interface Param {
  key: string;
  value: number;
}
interface Configpatient {
  heigth: number;
  weight: number;
  shoe_size: number;
  femur_len_1: number;
  tibia_len_1: number;
  ankle_len: number;
  flexors: Flexors;
}
interface Flexors {
  hip_abd_L: number;
  hip_abd_R: number;
  hip_flex_L: number;
  hip_flex_R: number;
  knee_flex_L: number;
  knee_flex_R: number;
  ankle_flex_L: number;
  ankle_flex_R: number;
}
interface Configmode {
  mode: number;
  direction: number;
  speed: number;
  step_height: number;
  step_length: number;
  intention_threshold: Intentionthreshold;
}
interface Intentionthreshold {
  hip_flex_L: number;
  hip_flex_R: number;
  knee_flex_L: number;
  knee_flex_R: number;
}
interface Motors {
  motor1: Motor1;
  motor2: Motor1;
  motor3: Motor1;
  motor4: Motor1;
}
interface Motor1 {
  ang_sens_1: number;
  curr: number;
}
interface General {
  sys_status: number;
  state: number;
  battery: number;
  motors_en: number;
  steps_per_mode: number;
}
interface Component {
  name: string;
  software_version: string;
  hardware_version: string;
}
