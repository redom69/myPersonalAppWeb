export interface GraphsProps {
  ingestionId: string;
  setShowGraphs: (showGraphs: boolean) => void;
  zip_data: string;
}

export interface MotorsAng {
  timestamp: string;
  motorsAngRef1: number;
  motorsAngRef2: number;
  motorsAngRef3: number;
  motorsAngRef4: number;
  motorsMotor1AngSens1: number;
  motorsMotor2AngSens1: number;
  motorsMotor3AngSens1: number;
  motorsMotor4AngSens1: number;
  motorsMotor1AngSens2: number;
  motorsMotor2AngSens2: number;
  motorsMotor3AngSens2: number;
  motorsMotor4AngSens2: number;
}

export interface SessionData {
  timestamp: string;
  motorsEn: number;
  timeWalking: number;
}

export interface BatteryData {
  timestamp: string;
  voltage: number;
  current: number;
  temperature: number;
  capacity: number;
}

export interface MotorVoltageData {
  timestamp: string;
  voltage: number;
}

export interface TemperatureData {
  timestamp: string;
  motorTemperature: number;
  environmentTemperature: number;
}

export interface TorqueData {
  timestamp: string;
  torque: number;
}

export interface EnergyMonitor {
  timestamp: string;
  energy: number;
}

export interface GlobalPosition {
  timestamp: string;
  globalPosition: number;
}

export interface ElevSens {
  timestamp: string;
  elevation: number;
}

export interface ElevCtrl {
  timestamp: string;
  elevation: number;
}

export interface MotorsInt {
  timestamp: string;
  motorsInt1: number;
  motorsInt2: number;
  motorsInt3: number;
  motorsInt4: number;
}
