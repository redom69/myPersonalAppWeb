const MotionMode = ['auto', 'int'];
const WalkDirection = ['fwd', 'bwd'];

export function procesarDatosCompleto(dataInvertida) {
  let totalSteps = {
    total: 0,
  };
  let step = 0;
  let tiempoEncendido = 0;
  let tiempoApagado = 0;
  let motorEncendido = false;
  let tiempoInicial = new Date(dataInvertida[0].timestamp);
  let initialTime = new Date(dataInvertida[0].timestamp);
  let time = 0;
  let intentionThreshold = {};
  let flexors = {};
  let evaluationData = {};
  let alarms = [];
  let isSession = false;
  let user_data = {};

  // Cálculo de la diferencia de tiempo
  const timeLast = new Date(dataInvertida[dataInvertida.length - 1].timestamp);
  const diferenciaEnMinutos = (initialTime - timeLast) / (1000 * 60);

  // Calculo de la fecha
  const date = { tiempoInicial: timeLast, timeLast: tiempoInicial };

  /* eslint-disable @typescript-eslint/prefer-for-of */
  for (let i = 0; i < dataInvertida.length; i++) {
    const tiempoActual = new Date(dataInvertida[i].timestamp);
    let motorActual;
    if (dataInvertida[i].general !== undefined) {
      motorActual = dataInvertida[i].general.motors_en === 1;
      if (motorActual) isSession = true;
    }
    const currentTime = new Date(dataInvertida[i].timestamp);

    if (
      dataInvertida[i].general !== undefined &&
      (dataInvertida[i].general.state === 1 ||
        dataInvertida[i].general.state === 6 ||
        dataInvertida[i].general.state === 7)
    ) {
      const deltaTime = Math.abs(currentTime - initialTime);
      time += deltaTime;
      initialTime = currentTime;
    }

    if (dataInvertida[i].general !== undefined) {
      const currentStep = dataInvertida[i].general.steps_in_mode;
      if (currentStep > step) {
        step = currentStep;
      }
    }

    if (dataInvertida[i].config_mode) {
      const mode = dataInvertida[i].config_mode.mode;
      const direction = dataInvertida[i].config_mode.direction;
      const modeDirection = `${MotionMode[mode]}${WalkDirection[direction]}`;
      if (!(modeDirection in totalSteps)) {
        totalSteps['total'] += step;
        totalSteps[modeDirection] = {
          steps: step,
          time: time / (1000 * 60),
          averageCadencia: time > 0 ? step / (time / (1000 * 60)) : 0,
        };
        step = 0;
        time = 0;
      }

      if (dataInvertida[i].config_mode.intention_threshold) {
        if (Object.keys(intentionThreshold).length === 0) {
          intentionThreshold = {
            hipFlexL:
              dataInvertida[i].config_mode.intention_threshold.hip_flex_L,
            hipFlexR:
              dataInvertida[i].config_mode.intention_threshold.hip_flex_R,
            kneeFlexL:
              dataInvertida[i].config_mode.intention_threshold.knee_flex_L,
            kneeFlexR:
              dataInvertida[i].config_mode.intention_threshold.knee_flex_R,
          };
        } else {
          // Comparar y actualizar umbrales de intención si es necesario
          Object.keys(intentionThreshold).forEach((joint) => {
            const jointKey = `${joint.charAt(0).toLowerCase()}${joint.slice(
              1
            )}`;
            if (
              intentionThreshold[joint] >
              dataInvertida[i].config_mode.intention_threshold[jointKey]
            ) {
              intentionThreshold[joint] =
                dataInvertida[i].config_mode.intention_threshold[jointKey];
            }
          });
        }
      }
    }

    if (dataInvertida[i].config_patient) {
      if (Object.keys(flexors).length === 0) {
        flexors = {
          hipAbdL: dataInvertida[i].config_patient.flexors.hip_abd_L,
          hipAbdR: dataInvertida[i].config_patient.flexors.hip_abd_R,
          hipFlexL: dataInvertida[i].config_patient.flexors.hip_flex_L,
          hipFlexR: dataInvertida[i].config_patient.flexors.hip_flex_R,
          kneeFlexL: dataInvertida[i].config_patient.flexors.knee_flex_L,
          kneeFlexR: dataInvertida[i].config_patient.flexors.knee_flex_R,
          ankleFlexL: dataInvertida[i].config_patient.flexors.ankle_flex_L,
          ankleFlexR: dataInvertida[i].config_patient.flexors.ankle_flex_R,
        };
      } else {
        // Comparar y actualizar flexores si es necesario
        Object.keys(flexors).forEach((joint) => {
          const jointKey = `${joint.charAt(0).toLowerCase()}${joint.slice(1)}`;
          if (
            flexors[joint] > dataInvertida[i].config_patient.flexors[jointKey]
          ) {
            flexors[joint] = dataInvertida[i].config_patient.flexors[jointKey];
          }
        });
      }
      user_data = {
        height: dataInvertida[i].config_patient.height,
        weight: dataInvertida[i].config_patient.weight,
        hip_width: dataInvertida[i].config_patient.hip_width,
        shoe_size: dataInvertida[i].config_patient.shoe_size,
        femur_len_L: dataInvertida[i].config_patient.femur_len_L,
        femur_len_R: dataInvertida[i].config_patient.femur_len_R,
        tibia_len_L: dataInvertida[i].config_patient.tibia_len_L,
        tibia_len_R: dataInvertida[i].config_patient.tibia_len_R,
        ankle_len_L: dataInvertida[i].config_patient.ankle_len_L,
        ankle_len_R: dataInvertida[i].config_patient.ankle_len_R,
        walker_len: dataInvertida[i].config_patient.walker_len,
      };
    }

    if (
      dataInvertida[i].evaluation_data &&
      dataInvertida[i].evaluation_data.other_clinical_evaluations
    ) {
      const otherClinicalEvaluations =
        dataInvertida[i].evaluation_data.other_clinical_evaluations.split(';');
      if (otherClinicalEvaluations.length > 1) {
        evaluationData = {
          hasChest: parseInt(otherClinicalEvaluations[0]),
          effort: parseInt(otherClinicalEvaluations[1]),
        };
      }
    }

    if (motorActual !== motorEncendido) {
      const deltaTiempo = tiempoActual - tiempoInicial;
      if (motorEncendido) {
        tiempoEncendido += deltaTiempo;
      } else {
        tiempoApagado += deltaTiempo;
      }
      motorEncendido = motorActual;
      tiempoInicial = tiempoActual;
    }

    if (dataInvertida[i].alarms !== undefined) {
      alarms.push({
        timestamp: dataInvertida[i].timestamp,
        value: dataInvertida[i].alarms.value,
        event_id: dataInvertida[i].alarms.event_id,
      });
    }
  }

  // Manejar el último estado del motor
  const deltaFinal =
    new Date(dataInvertida[dataInvertida.length - 1].timestamp) - tiempoInicial;
  if (motorEncendido) {
    tiempoEncendido += deltaFinal;
  }

  // Convertir los tiempos a minutos
  tiempoEncendido /= 1000 * 60;
  tiempoApagado /= 1000 * 60;

  return {
    totalSteps,
    tiempoMotor: {
      timeOn: Math.abs(tiempoEncendido),
      timeOff: Math.abs(tiempoApagado),
      totalTimeSession: diferenciaEnMinutos,
    },
    intentionThreshold,
    flexors,
    evaluationData,
    date,
    isSession,
    alarms,
    user_data,
  };
}
