import { getTotalsOfSessions } from '@mypaw/commons';
import { prisma } from './utils';

export async function get_patient_report(
  patient_id: string,
  start: string,
  end: string
): Promise<any> {
  const patient = await prisma.patients.findFirstOrThrow({
    where: { p_id: patient_id },
  });

  const sessions: any[] = await prisma.sessions.findMany({
    where: {
      p_id: patient_id,
    },
  });

  console.table(
    sessions.map((s) => {
      return {
        // id: s.id,
        created_at: s.created_at,
        // updated_at: s.updated_at,
        // s_auto_forward: s.steps_automatic_forward,
        // s_auto_backward: s.steps_automatic_backward,
        // s_inte_forward: s.steps_intention_forward,
        // s_inte_backward: s.steps_intention_backward,
        // flexos_hip: s.flexos_hip,
        // flexos_knee: s.flexos_knee,
        // flexos_ankle: s.flexos_ankle,
        // threshold_hip: s.threshold_hip,
        // threshold_knee: s.threshold_knee,
        // therapist_dungarees: s.therapist_dungarees,
        // therapist_effort: s.therapist_effort,
        // d_id: s.d_id,
        // date: s.date,
        // start: s.start,
        // end: s.end,
        // p_id: s.p_id,
        t_auto_forward: s.time_automatic_forward,
        t_auto_backward: s.time_automatic_backward,
        t_inte_forward: s.time_intentiton_forward,
        t_inte_backward: s.time_intention_backward,
        // steps_total: s.steps_total,
        // time_total: s.time_total,
        // cadence_automatic_forward: s.cadence_automatic_forward,
        // cadence_automatic_backward: s.cadence_automatic_backward,
        // cadence_intention_forward: s.cadence_intention_forward,
        // cadence_intention_backward: s.cadence_intention_backward,
      };
    })
  );

  return {
    patient: {
      ...patient,
      sessions,
    },
  };
}
