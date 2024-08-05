import { readFileSync } from 'fs';
import { Datum, RootObject } from './calculation-v1-type';

export function test_transform_data_v1() {
  console.log('test');
  const datos = readFileSync(
    'mbd-20230829-111303_ejemplo_informe.json',
    'utf8'
  );

  const ejemplo = JSON.parse(datos);
  const result = transform_data_v1(ejemplo);
  console.log(result);
}

export function transform_data_v1(object: RootObject) {
  const device_id = object.device_id;
  const model = object.model;
  let patient_id = null;
  let session_id = null;

  // Sort Data reverse
  sort_data_by_date_reverse(object.data);

  const reverse_session: {
    mode: number;
    direction: number;
    data: Datum[];
  }[] = [];

  let current_mode = null;
  let current_direction = null;
  const curren_data_reverse = [];

  object.data.forEach((d) => {
    // Set session and patient
    patient_id = d.patient_id;
    session_id = d.session_id;

    const has_config_mod = d.config_mode !== undefined;
    curren_data_reverse.push(d);

    // Push when change mode or direction
    if (has_config_mod) {
      current_direction = d.config_mode.direction;
      current_mode = d.config_mode.mode;
      if (current_mode !== null && current_direction !== null) {
        reverse_session.push({
          mode: current_mode,
          direction: current_direction,
          data: curren_data_reverse,
        });
      }
    }
  });

  // Rotamos los datos correctamente
  reverse_session.forEach((session) => {
    session.data = session.data.reverse();
  });
  reverse_session.reverse();

  // Primero es el modo y luego es la dirección
  const recuento = {
    0: {
      0: {
        steps: 0,
        time: 0,
      },
      1: {
        steps: 0,
        time: 0,
      },
    },
    1: {
      0: {
        steps: 0,
        time: 0,
      },
      1: {
        steps: 0,
        time: 0,
      },
    },
  };

  reverse_session.forEach((session) => {
    session.data.forEach((d, index) => {
      const steps = Math.round(d?.general?.steps_per_mode) || 0;
      recuento[session.mode][session.direction].steps += steps;
      // Time

      const current_time = new Date(d.timestamp).getTime();
      const last_time = new Date(
        session.data[index - 1]?.timestamp || current_time
      ).getTime();
      const time = Math.round(current_time - last_time);
      recuento[session.mode][session.direction].time += time;
    });
  });

  return {
    device_id,
    model,
    patient_id,
    session_id,
    recuento,
  };
}

function sort_data_by_date_reverse(data: Datum[]) {
  return data.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}
