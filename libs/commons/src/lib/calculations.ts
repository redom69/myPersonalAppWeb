import type { ChartData, ChartOptions } from 'chart.js';
import type { TFunction } from 'i18next';
import type { sessions } from '@prisma/client';
import { get_percentage } from './commons';

export interface SessionData {
  total_steps_automatic_forward: number;
  total_steps_automatic_backward: number;
  total_steps_intention_forward: number;
  total_steps_intention_backward: number;
  total_steps_automatic: number;
  total_steps_intention: number;
  total_steps_forward: number;
  total_steps_backward: number;
  total_time_automatic_forward: number;
  total_time_automatic_backward: number;
  total_time_intentiton_forward: number;
  total_time_intention_backward: number;
  total_time_automatic: number;
  total_time_intention: number;
  total_time_forward: number;
  total_time_backward: number;
  total_steps_total: number;
  total_time_total: number;
  median_total_steps: number;
  median_total_steps_automatic_forward: number;
  median_total_steps_automatic_backward: number;
  median_total_steps_intention_forward: number;
  median_total_steps_intention_backward: number;
  median_total_steps_automatic: number;
  median_total_steps_intention: number;
  median_total_steps_forward: number;
  median_total_steps_backward: number;
  median_total_time: number;
  median_total_time_automatic_forward: number;
  median_total_time_automatic_backward: number;
  median_total_time_intentiton_forward: number;
  median_total_time_intention_backward: number;
  median_total_time_automatic: number;
  median_total_time_intention: number;
  median_total_time_forward: number;
  median_total_time_backward: number;
  evaluation: number;
  median_evaluation: number;
  cadence_automatic_forward: number;
  cadence_automatic_backward: number;
  cadence_intention_forward: number;
  cadence_intention_backward: number;
  flexos_hip: number;
  flexos_knee: number;
  flexos_ankle: number;
  threshold_hipl: number;
  threshold_hipr: number;
  threshold_kneel: number;
  threshold_kneer: number;
  threshold_anklel: number;
  threshold_ankler: number;
  chest: number;
  effort: number;
  total_time_use: number;
  total_time_walking: number;
  total_time_standing: number;
}

function sumarValoresNumericos(objeto: any) {
  const camposASumar = [
    'steps_automatic_forward',
    'steps_automatic_backward',
    'steps_intention_forward',
    'steps_intention_backward',
    'flexos_hip',
    'flexos_knee',
    'flexos_ankle',
    'effort',
    'time_automatic_forward',
    'time_automatic_backward',
    'time_intentiton_forward',
    'time_intention_backward',
    'steps_total',
    'time_total',
    'cadence_automatic_forward',
    'cadence_automatic_backward',
    'cadence_intention_forward',
    'cadence_intention_backward',
    'evaluation',
    'has_chest',
    'threshold_hipl',
    'threshold_kneel',
    'threshold_hipr',
    'threshold_kneer',
    'timeWalking',
    'timeUse',
    'timeSession',
  ];

  return camposASumar.reduce((acum, campo) => {
    const valor = objeto[campo];
    if (valor !== null && !isNaN(valor)) {
      // Considerar solo valores numéricos no nulos
      return acum + valor;
    }
    return acum;
  }, 0);
}

/**
 * Process a list of sessions to group them by date and merge the data
 *
 * @export
 * @param {any[]} sessions
 * @return {*}  {any[]}
 *
 */

export function processSessions(sessions: any[]): any[] {
  const groupedSessions = sessions.reduce(
    (acc, session) => {
      const sessionDate = session.date.toISOString().split('T')[0];
      if (!acc[sessionDate]) {
        acc[sessionDate] = [];
      }
      acc[sessionDate].push(session);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const mergedSessions = (Object.values(groupedSessions) as any[][])
    .map((group: any[]) => {
      return group.reduce(
        (merged, session) => {
          merged.steps_automatic_forward +=
            session.steps_automatic_forward || 0;
          merged.steps_automatic_backward +=
            session.steps_automatic_backward || 0;
          merged.steps_intention_forward +=
            session.steps_intention_forward || 0;
          merged.steps_intention_backward +=
            session.steps_intention_backward || 0;
          merged.time_automatic_forward += session.time_automatic_forward || 0;
          merged.time_automatic_backward +=
            session.time_automatic_backward || 0;
          merged.time_intentiton_forward +=
            session.time_intentiton_forward || 0;
          merged.time_intention_backward +=
            session.time_intention_backward || 0;
          merged.steps_total += session.steps_total || 0;
          merged.time_total += session.time_total || 0;
          merged.timeWalking += session.timeWalking || 0;
          merged.timeUse += session.timeUse || 0;
          merged.timeSession += session.timeSession || 0;

          merged.flexos_hip = Math.min(merged.flexos_hip, session.flexos_hip);
          merged.flexos_knee = Math.min(
            merged.flexos_knee,
            session.flexos_knee
          );
          merged.flexos_ankle = Math.min(
            merged.flexos_ankle,
            session.flexos_ankle
          );

          merged.threshold_hipl = Math.max(
            merged.threshold_hipl,
            session.threshold_hipl
          );
          merged.threshold_kneel = Math.max(
            merged.threshold_kneel,
            session.threshold_kneel
          );
          merged.threshold_hipr = Math.max(
            merged.threshold_hipr,
            session.threshold_hipr
          );
          merged.threshold_kneer = Math.max(
            merged.threshold_kneer,
            session.threshold_kneer
          );
          merged.threshold_anklel = Math.max(
            merged.threshold_anklel,
            session.threshold_anklel
          );
          merged.threshold_ankler = Math.max(
            merged.threshold_ankler,
            session.threshold_ankler
          );

          merged.start_time = merged.start_time
            ? new Date(
                Math.min(
                  merged.start_time.getTime(),
                  session.start_time ? session.start_time.getTime() : Infinity
                )
              )
            : session.start_time;
          merged.end_time = merged.end_time
            ? new Date(
                Math.max(
                  merged.end_time.getTime(),
                  session.end_time ? session.end_time.getTime() : -Infinity
                )
              )
            : session.end_time;

          // Actualizamos la fecha al valor más antiguo encontrado
          merged.date = merged.date
            ? new Date(Math.min(merged.date.getTime(), session.date.getTime()))
            : session.date;

          // Para valores que no deben ser combinados, simplemente usamos el primero del grupo
          merged.id = merged.id || session.id;
          merged.created_at = merged.created_at
            ? new Date(
                Math.min(
                  merged.created_at.getTime(),
                  session.created_at.getTime()
                )
              )
            : session.created_at;
          merged.updated_at = merged.updated_at
            ? new Date(
                Math.max(
                  merged.updated_at.getTime(),
                  session.updated_at.getTime()
                )
              )
            : session.updated_at;
          merged.effort = session.effort || merged.effort;
          merged.d_id = merged.d_id || session.d_id;
          merged.p_id = merged.p_id || session.p_id;
          merged.evaluation = session.evaluation ?? merged.evaluation;
          merged.has_chest = session.has_chest ?? merged.has_chest;
          merged.i_id = merged.i_id || session.i_id;

          return merged;
        },
        {
          steps_automatic_forward: 0,
          steps_automatic_backward: 0,
          steps_intention_forward: 0,
          steps_intention_backward: 0,
          time_automatic_forward: 0,
          time_automatic_backward: 0,
          time_intentiton_forward: 0,
          time_intention_backward: 0,
          steps_total: 0,
          time_total: 0,
          timeWalking: 0,
          timeUse: 0,
          timeSession: 0,
          flexos_hip: Infinity,
          flexos_knee: Infinity,
          flexos_ankle: Infinity,
          threshold_hipl: -Infinity,
          threshold_kneel: -Infinity,
          threshold_hipr: -Infinity,
          threshold_kneer: -Infinity,
          threshold_anklel: -Infinity,
          threshold_ankler: -Infinity,
          start_time: null,
          end_time: null,
          date: null,
          id: '',
          created_at: null,
          updated_at: null,
          effort: 0,
          d_id: null,
          p_id: '',
          evaluation: null,
          has_chest: null,
          i_id: null,
        }
      );
    })
    .map((session) => {
      // Calcular las cadencias después de haber sumado los valores de los pasos y tiempos
      session.cadence_automatic_forward =
        session.steps_automatic_forward / (session.time_automatic_forward || 1);
      session.cadence_automatic_backward =
        session.steps_automatic_backward /
        (session.time_automatic_backward || 1);
      session.cadence_intention_forward =
        session.steps_intention_forward /
        (session.time_intentiton_forward || 1);
      session.cadence_intention_backward =
        session.steps_intention_backward /
        (session.time_intention_backward || 1);

      return session;
    });

  return mergedSessions;
}

/**
 * Process a list of sessions to group them by patient and merge the data
 *
 * @export
 * @param {any[]} sessions
 * @return {*}  {any[]}
 *
 */
export function processSessionsByPatient(sessions: any[]): any[] {
  const groupedSessions = sessions.reduce(
    (acc, session) => {
      const sessionDate = session.date.toISOString().split('T')[0];
      const key = `${session.p_id}-${sessionDate}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(session);
      return acc;
    },
    {} as Record<string, any[]>
  );

  const mergedSessions = (Object.values(groupedSessions) as any[][])
    .map((group: any[]) => {
      return group.reduce(
        (merged, session) => {
          merged.steps_automatic_forward +=
            session.steps_automatic_forward || 0;
          merged.steps_automatic_backward +=
            session.steps_automatic_backward || 0;
          merged.steps_intention_forward +=
            session.steps_intention_forward || 0;
          merged.steps_intention_backward +=
            session.steps_intention_backward || 0;
          merged.time_automatic_forward += session.time_automatic_forward || 0;
          merged.time_automatic_backward +=
            session.time_automatic_backward || 0;
          merged.time_intentiton_forward +=
            session.time_intentiton_forward || 0;
          merged.time_intention_backward +=
            session.time_intention_backward || 0;
          merged.steps_total += session.steps_total || 0;
          merged.time_total += session.time_total || 0;
          merged.timeWalking += session.timeWalking || 0;
          merged.timeUse += session.timeUse || 0;
          merged.timeSession += session.timeSession || 0;

          merged.flexos_hip = Math.min(merged.flexos_hip, session.flexos_hip);
          merged.flexos_knee = Math.min(
            merged.flexos_knee,
            session.flexos_knee
          );
          merged.flexos_ankle = Math.min(
            merged.flexos_ankle,
            session.flexos_ankle
          );

          merged.threshold_hipl = Math.max(
            merged.threshold_hipl,
            session.threshold_hipl
          );
          merged.threshold_kneel = Math.max(
            merged.threshold_kneel,
            session.threshold_kneel
          );
          merged.threshold_hipr = Math.max(
            merged.threshold_hipr,
            session.threshold_hipr
          );
          merged.threshold_kneer = Math.max(
            merged.threshold_kneer,
            session.threshold_kneer
          );
          merged.threshold_anklel = Math.max(
            merged.threshold_anklel,
            session.threshold_anklel
          );
          merged.threshold_ankler = Math.max(
            merged.threshold_ankler,
            session.threshold_ankler
          );

          merged.start_time = merged.start_time
            ? new Date(
                Math.min(
                  merged.start_time.getTime(),
                  session.start_time ? session.start_time.getTime() : Infinity
                )
              )
            : session.start_time;
          merged.end_time = merged.end_time
            ? new Date(
                Math.max(
                  merged.end_time.getTime(),
                  session.end_time ? session.end_time.getTime() : -Infinity
                )
              )
            : session.end_time;

          // Actualizamos la fecha al valor más antiguo encontrado
          merged.date = merged.date
            ? new Date(Math.min(merged.date.getTime(), session.date.getTime()))
            : session.date;

          // Para valores que no deben ser combinados, simplemente usamos el primero del grupo
          merged.id = merged.id || session.id;
          merged.created_at = merged.created_at
            ? new Date(
                Math.min(
                  merged.created_at.getTime(),
                  session.created_at.getTime()
                )
              )
            : session.created_at;
          merged.updated_at = merged.updated_at
            ? new Date(
                Math.max(
                  merged.updated_at.getTime(),
                  session.updated_at.getTime()
                )
              )
            : session.updated_at;
          merged.effort = session.effort || merged.effort;
          merged.d_id = merged.d_id || session.d_id;
          merged.p_id = merged.p_id || session.p_id;
          merged.evaluation = session.evaluation ?? merged.evaluation;
          merged.has_chest = session.has_chest ?? merged.has_chest;
          merged.i_id = merged.i_id || session.i_id;

          return merged;
        },
        {
          steps_automatic_forward: 0,
          steps_automatic_backward: 0,
          steps_intention_forward: 0,
          steps_intention_backward: 0,
          time_automatic_forward: 0,
          time_automatic_backward: 0,
          time_intentiton_forward: 0,
          time_intention_backward: 0,
          steps_total: 0,
          time_total: 0,
          timeWalking: 0,
          timeUse: 0,
          timeSession: 0,
          flexos_hip: Infinity,
          flexos_knee: Infinity,
          flexos_ankle: Infinity,
          threshold_hipl: -Infinity,
          threshold_kneel: -Infinity,
          threshold_hipr: -Infinity,
          threshold_kneer: -Infinity,
          threshold_anklel: -Infinity,
          threshold_ankler: -Infinity,
          start_time: null,
          end_time: null,
          date: null,
          id: '',
          created_at: null,
          updated_at: null,
          effort: 0,
          d_id: null,
          p_id: '',
          evaluation: null,
          has_chest: null,
          i_id: null,
        }
      );
    })
    .map((session) => {
      // Calcular las cadencias después de haber sumado los valores de los pasos y tiempos
      session.cadence_automatic_forward =
        session.steps_automatic_forward / (session.time_automatic_forward || 1);
      session.cadence_automatic_backward =
        session.steps_automatic_backward /
        (session.time_automatic_backward || 1);
      session.cadence_intention_forward =
        session.steps_intention_forward /
        (session.time_intentiton_forward || 1);
      session.cadence_intention_backward =
        session.steps_intention_backward /
        (session.time_intention_backward || 1);

      return session;
    });

  return mergedSessions;
}

/**
 * Obtener las sesiones filtradas por fecha
 *
 * @export
 * @param {any[]} sessions
 * @return {*}  {SessionData}
 */

export function getSessionsFilteredByDate(sessions: any[]): any[] {
  const sessionsByDate: any = {};

  sessions.forEach((session) => {
    const date = session.date.split('T')[0]; // Assuming date is 'YYYY-MM-DD' format in the 'date' field

    if (!sessionsByDate[date]) {
      // Initialize with the first session of that date
      sessionsByDate[date] = { ...session };
    } else {
      // Aggregate data for sessions of the same date
      const aggregatedSession = sessionsByDate[date];
      Object.keys(session).forEach((key) => {
        if (typeof session[key] === 'number') {
          // Sum numerical values
          aggregatedSession[key] = (aggregatedSession[key] || 0) + session[key];
        } else if (
          key === 'created_at' ||
          key === 'updated_at' ||
          key === 'start_time' ||
          key === 'end_time'
        ) {
          // Keep the most recent non-null timestamp
          if (new Date(session[key]) > new Date(aggregatedSession[key])) {
            aggregatedSession[key] = session[key];
          }
        }
        // For non-numerical and non-timestamp fields, we'll keep the last non-null value
        else if (session[key] !== null) {
          aggregatedSession[key] = session[key];
        }
      });
    }
  });

  // Convert dictionary to array
  return Object.values(sessionsByDate);
}

/**
 * Obtener calculos totales de un listado de sesiones
 *
 * @export
 * @param {any[]} sessions
 * @return {*}  {SessionData}
 */
export function getTotalsOfSessions(sessions: any[]): SessionData {
  let total_steps_automatic_forward = 0;
  let total_steps_automatic_backward = 0;
  let total_steps_intention_forward = 0;
  let total_steps_intention_backward = 0;
  let total_steps_automatic = 0;
  let total_steps_intention = 0;
  let total_steps_forward = 0;
  let total_steps_backward = 0;

  let total_time_automatic_forward = 0;
  let total_time_automatic_backward = 0;
  let total_time_intentiton_forward = 0;
  let total_time_intention_backward = 0;
  let total_time_automatic = 0;
  let total_time_intention = 0;
  let total_time_forward = 0;
  let total_time_backward = 0;

  let total_steps_total = 0;
  let total_time_total = 0;

  let total_time_use = 0;
  let total_time_walking = 0;
  let total_time_standing = 0;

  // Median

  let median_total_steps = 0;
  let median_total_steps_automatic_forward = 0;
  let median_total_steps_automatic_backward = 0;
  let median_total_steps_intention_forward = 0;
  let median_total_steps_intention_backward = 0;
  let median_total_steps_automatic = 0;
  let median_total_steps_intention = 0;
  let median_total_steps_forward = 0;
  let median_total_steps_backward = 0;
  let median_total_time = 0;
  let median_total_time_automatic_forward = 0;
  let median_total_time_automatic_backward = 0;
  let median_total_time_intentiton_forward = 0;
  let median_total_time_intention_backward = 0;
  let median_total_time_automatic = 0;
  let median_total_time_intention = 0;
  let median_total_time_forward = 0;
  let median_total_time_backward = 0;
  let evaluation = 0;
  let median_evaluation = 0;
  let cadence_automatic_forward = 0;
  let cadence_automatic_backward = 0;
  let cadence_intention_forward = 0;
  let cadence_intention_backward = 0;
  let flexos_hip = 0;
  let flexos_knee = 0;
  let flexos_ankle = 0;
  let threshold_hipl = 0;
  let threshold_hipr = 0;
  let threshold_kneel = 0;
  let threshold_kneer = 0;
  let threshold_anklel = 0;
  let threshold_ankler = 0;
  let chest = 0;
  let effort = 0;

  sessions.forEach((session) => {
    total_steps_automatic_forward += session.steps_automatic_forward;
    total_steps_automatic_backward += session.steps_automatic_backward;
    total_steps_intention_forward += session.steps_intention_forward;
    total_steps_intention_backward += session.steps_intention_backward;
    total_time_automatic_forward += session.time_automatic_forward;
    total_time_automatic_backward += session.time_automatic_backward;
    total_time_intentiton_forward += session.time_intentiton_forward;
    total_time_intention_backward += session.time_intention_backward;
    total_time_total += session.time_total;
    total_time_use += session.timeUse;
    total_time_walking += session.timeWalking;
    total_time_standing += session.timeSession;
    evaluation += session.evaluation;
    cadence_automatic_forward += session.cadence_automatic_forward;
    cadence_automatic_backward += session.cadence_automatic_backward;
    cadence_intention_forward += session.cadence_intention_forward;
    cadence_intention_backward += session.cadence_intention_backward;
    flexos_hip = Math.min(flexos_hip, session.flexos_hip);
    flexos_knee = Math.min(flexos_knee, session.flexos_knee);
    flexos_ankle = Math.min(flexos_ankle, session.flexos_ankle);
    threshold_hipl = Math.max(threshold_hipl, session.threshold_hipl);
    threshold_hipr = Math.max(threshold_hipr, session.threshold_hipr);
    threshold_kneel = Math.max(threshold_kneel, session.threshold_kneel);
    threshold_kneer = Math.max(threshold_kneer, session.threshold_kneer);
    threshold_anklel = Math.max(threshold_anklel, session.threshold_anklel);
    threshold_ankler = Math.max(threshold_ankler, session.threshold_ankler);
    chest = Math.min(chest, session.has_chest);
    effort = Math.max(effort, session.effort);
  });

  // Totals steps
  total_steps_automatic =
    total_steps_automatic_forward + total_steps_automatic_backward;
  total_steps_intention =
    total_steps_intention_forward + total_steps_intention_backward;
  total_steps_forward =
    total_steps_automatic_forward + total_steps_intention_forward;
  total_steps_backward =
    total_steps_automatic_backward + total_steps_intention_backward;

  total_steps_total = total_steps_automatic + total_steps_intention;

  // Totals time
  total_time_automatic =
    total_time_automatic_forward + total_time_automatic_backward;
  total_time_intention =
    total_time_intentiton_forward + total_time_intention_backward;
  total_time_forward =
    total_time_automatic_forward + total_time_intentiton_forward;
  total_time_backward =
    total_time_automatic_backward + total_time_intention_backward;

  if (sessions.length > 0) {
    median_total_steps = total_steps_total / sessions.length;
    median_total_steps_automatic_forward =
      total_steps_automatic_forward / sessions.length;
    median_total_steps_automatic_backward =
      total_steps_automatic_backward / sessions.length;
    median_total_steps_intention_forward =
      total_steps_intention_forward / sessions.length;
    median_total_steps_intention_backward =
      total_steps_intention_backward / sessions.length;
    median_total_steps_automatic = total_steps_automatic / sessions.length;
    median_total_steps_intention = total_steps_intention / sessions.length;
    median_total_steps_forward = total_steps_forward / sessions.length;
    median_total_steps_backward = total_steps_backward / sessions.length;
    // Time
    median_total_time = total_time_use / sessions.length;
    median_total_time_automatic_forward =
      total_time_automatic_forward / sessions.length;
    median_total_time_automatic_backward =
      total_time_automatic_backward / sessions.length;
    median_total_time_intentiton_forward =
      total_time_intentiton_forward / sessions.length;
    median_total_time_intention_backward =
      total_time_intention_backward / sessions.length;
    median_total_time_automatic = total_time_automatic / sessions.length;
    median_total_time_intention = total_time_intention / sessions.length;
    median_total_time_forward = total_time_forward / sessions.length;
    median_total_time_backward = total_time_backward / sessions.length;
    median_evaluation = evaluation / sessions.length;
    cadence_automatic_forward = cadence_automatic_forward / sessions.length;
    cadence_automatic_backward = cadence_automatic_backward / sessions.length;
    cadence_intention_forward = cadence_intention_forward / sessions.length;
    cadence_intention_backward = cadence_intention_backward / sessions.length;
  }

  return {
    total_steps_automatic_forward: parseFloat(
      total_steps_automatic_forward.toFixed(2)
    ),
    total_steps_automatic_backward: parseFloat(
      total_steps_automatic_backward.toFixed(2)
    ),
    total_steps_intention_forward: parseFloat(
      total_steps_intention_forward.toFixed(2)
    ),
    total_steps_intention_backward: parseFloat(
      total_steps_intention_backward.toFixed(2)
    ),
    total_steps_automatic: parseFloat(total_steps_automatic.toFixed(2)),
    total_steps_intention: parseFloat(total_steps_intention.toFixed(2)),
    total_steps_forward: parseFloat(total_steps_forward.toFixed(2)),
    total_steps_backward: parseFloat(total_steps_backward.toFixed(2)),
    total_time_automatic_forward: parseFloat(
      total_time_automatic_forward.toFixed(2)
    ),
    total_time_automatic_backward: parseFloat(
      total_time_automatic_backward.toFixed(2)
    ),
    total_time_intentiton_forward: parseFloat(
      total_time_intentiton_forward.toFixed(2)
    ),
    total_time_intention_backward: parseFloat(
      total_time_intention_backward.toFixed(2)
    ),
    total_time_automatic: parseFloat(total_time_automatic.toFixed(2)),
    total_time_intention: parseFloat(total_time_intention.toFixed(2)),
    total_time_forward: parseFloat(total_time_forward.toFixed(2)),
    total_time_backward: parseFloat(total_time_backward.toFixed(2)),
    total_steps_total: parseFloat(total_steps_total.toFixed(2)),
    total_time_total: parseFloat(total_time_total.toFixed(2)),
    total_time_use: parseFloat(total_time_use.toFixed(2)),
    total_time_walking: parseFloat(total_time_walking.toFixed(2)),
    total_time_standing:
      parseFloat(total_time_standing.toFixed(2)) -
      parseFloat(total_time_walking.toFixed(2)),
    evaluation: parseFloat(evaluation.toFixed(2)),
    median_evaluation: parseFloat(median_evaluation.toFixed(2)),
    median_total_steps: parseFloat(median_total_steps.toFixed(2)),
    median_total_steps_automatic_forward: parseFloat(
      median_total_steps_automatic_forward.toFixed(2)
    ),
    median_total_steps_automatic_backward: parseFloat(
      median_total_steps_automatic_backward.toFixed(2)
    ),
    median_total_steps_intention_forward: parseFloat(
      median_total_steps_intention_forward.toFixed(2)
    ),
    median_total_steps_intention_backward: parseFloat(
      median_total_steps_intention_backward.toFixed(2)
    ),
    median_total_steps_automatic: parseFloat(
      median_total_steps_automatic.toFixed(2)
    ),
    median_total_steps_intention: parseFloat(
      median_total_steps_intention.toFixed(2)
    ),
    median_total_steps_forward: parseFloat(
      median_total_steps_forward.toFixed(2)
    ),
    median_total_steps_backward: parseFloat(
      median_total_steps_backward.toFixed(2)
    ),
    median_total_time: parseFloat(median_total_time.toFixed(2)),
    median_total_time_automatic_forward: parseFloat(
      median_total_time_automatic_forward.toFixed(2)
    ),
    median_total_time_automatic_backward: parseFloat(
      median_total_time_automatic_backward.toFixed(2)
    ),
    median_total_time_intentiton_forward: parseFloat(
      median_total_time_intentiton_forward.toFixed(2)
    ),
    median_total_time_intention_backward: parseFloat(
      median_total_time_intention_backward.toFixed(2)
    ),
    median_total_time_automatic: parseFloat(
      median_total_time_automatic.toFixed(2)
    ),
    median_total_time_intention: parseFloat(
      median_total_time_intention.toFixed(2)
    ),
    median_total_time_forward: parseFloat(median_total_time_forward.toFixed(2)),
    median_total_time_backward: parseFloat(
      median_total_time_backward.toFixed(2)
    ),
    cadence_automatic_forward: parseFloat(cadence_automatic_forward.toFixed(2)),
    cadence_automatic_backward: parseFloat(
      cadence_automatic_backward.toFixed(2)
    ),
    cadence_intention_forward: parseFloat(cadence_intention_forward.toFixed(2)),
    cadence_intention_backward: parseFloat(
      cadence_intention_backward.toFixed(2)
    ),
    flexos_hip: parseFloat(flexos_hip.toFixed(2)),
    flexos_knee: parseFloat(flexos_knee.toFixed(2)),
    flexos_ankle: parseFloat(flexos_ankle.toFixed(2)),
    threshold_hipl: parseFloat(threshold_hipl.toFixed(2)),
    threshold_hipr: parseFloat(threshold_hipr.toFixed(2)),
    threshold_kneel: parseFloat(threshold_kneel.toFixed(2)),
    threshold_kneer: parseFloat(threshold_kneer.toFixed(2)),
    threshold_anklel: parseFloat(threshold_anklel.toFixed(2)),
    threshold_ankler: parseFloat(threshold_ankler.toFixed(2)),

    chest: parseFloat(chest.toFixed(2)),
    effort: parseFloat(effort.toFixed(2)),
  };
}

/**
 * Obtener última y primera sesión de un listado de sesiones
 *
 * @export
 * @param {any[]} sessions
 * @return {*}
 */
export function getEarlyAndLastSession(sessions: any[]) {
  const sortedSessions = sessions.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const earlySession = sortedSessions[sortedSessions.length - 1];
  const lastSession = sortedSessions[0];

  return {
    earlySession,
    lastSession,
  };
}

/**
 * Obtener última y primera alarma de un listado de alarmas
 *
 * @export
 * @param {any[]} sessions
 * @return {*}
 */
export function getEarlyAndLastAlarm(alarms: any[]) {
  const sortedAlarms = alarms.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const earlyAlarm = sortedAlarms[sortedAlarms.length - 1];
  const lastAlarm = sortedAlarms[0];

  return {
    earlyAlarm,
    lastAlarm,
  };
}

// Gráfica circular distribución de pasos
export function getStepGraph(
  data: SessionData,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  window: any,
  legend: boolean,
  inform?: boolean
) {
  const dataStepsDistribution: ChartData = {
    labels: [
      t('pages.reports.graphs.automaticForward'),
      t('pages.reports.graphs.automaticBackward'),
      t('pages.reports.graphs.backwardIntention'),
      t('pages.reports.graphs.forwardIntention'),
    ],
    datasets: [
      {
        data: [
          get_percentage(
            data.total_steps_automatic_forward,
            data.total_steps_total
          ),
          get_percentage(
            data.total_steps_automatic_backward,
            data.total_steps_total
          ),
          get_percentage(
            data.total_steps_intention_backward,
            data.total_steps_total
          ),
          get_percentage(
            data.total_steps_intention_forward,
            data.total_steps_total
          ),
        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--forward-automatic-color-1'),
          documentStyle.getPropertyValue('--backward-automatic-color-1'),
          documentStyle.getPropertyValue('--backward-intention-color-1'),
          documentStyle.getPropertyValue('--forward-intention-color-1'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--forward-automatic-color-2'),
          documentStyle.getPropertyValue('--backward-automatic-color-2'),
          documentStyle.getPropertyValue('--backward-intention-color-2'),
          documentStyle.getPropertyValue('--forward-intention-color-2'),
        ],
      },
    ],
  };

  const optionsStepsDistribution: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: legend,
        position: 'bottom',
        labels: {
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            // @ts-ignore
            const label = dataStepsDistribution.labels[context.dataIndex];
            const value =
              dataStepsDistribution.datasets[0].data[context.dataIndex];

            return `${value}%`;
          },
        },
      },
      // @ts-ignore
      datalabels: {
        display: showDisplayDataLabels(window?.innerWidth),
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        padding: 3,
        font: {
          weight: 'bold',
          size: inform && 16,
        },
        backgroundColor: (context: any) => {
          return 'white';
        },
        color: 'black',
        formatter: (value: any, context: any) => {
          // @ts-ignore
          const label = dataStepsDistribution.labels[context.dataIndex];

          return `${value}%`;
        },
      },
    },
  };

  const optionsStepsDistributionInform: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 2.4, // Ajustado para hacer el gráfico un poco más alto y menos ancho
    plugins: {
      legend: {
        display: legend,
        position: 'bottom',
        labels: {
          pointStyle: 'circle',
          font: {
            size: 20, // Tamaño de letra permanece grande
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value =
              dataStepsDistribution.datasets[0].data[context.dataIndex];
            return `${value}%`;
          },
        },
      },
      // @ts-ignore

      datalabels: {
        display: showDisplayDataLabels(window?.innerWidth),
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        padding: 3,
        font: {
          weight: 'bold',
          size: 20, // Tamaño de letra permanece grande
        },
        backgroundColor: (context: any) => {
          return 'white';
        },
        color: 'black',
        formatter: (value: any, context: any) => {
          return `${value}%`;
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 20, // Tamaño de letra permanece grande
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 20, // Tamaño de letra permanece grande
          },
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.percentage'),
          font: {
            size: 20, // Tamaño de letra permanece grande
          },
        },
      },
    },
  };

  return {
    dataStepsDistribution,
    optionsStepsDistribution: inform
      ? optionsStepsDistributionInform
      : optionsStepsDistribution,
  };
}

// Gráfica circular distribución de pasos de la ultima sesion
export function getStepSessionGraph(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  window: any,
  legend: boolean
) {
  const dataStepsLastSessionDistribution: ChartData = {
    labels: [
      t('pages.reports.graphs.automaticForward'),
      t('pages.reports.graphs.automaticBackward'),
      t('pages.reports.graphs.backwardIntention'),
      t('pages.reports.graphs.forwardIntention'),
    ],
    datasets: [
      {
        data: [
          get_percentage(data.steps_automatic_forward, data.steps_total),
          get_percentage(data.steps_automatic_backward, data.steps_total),
          get_percentage(data.steps_intention_backward, data.steps_total),
          get_percentage(data.steps_intention_forward, data.steps_total),
        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--forward-automatic-color-1'),
          documentStyle.getPropertyValue('--backward-automatic-color-1'),
          documentStyle.getPropertyValue('--backward-intention-color-1'),
          documentStyle.getPropertyValue('--forward-intention-color-1'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--forward-automatic-color-2'),
          documentStyle.getPropertyValue('--backward-automatic-color-2'),
          documentStyle.getPropertyValue('--backward-intention-color-2'),
          documentStyle.getPropertyValue('--forward-intention-color-2'),
        ],
      },
    ],
  };
  const optionsStepsLastSessionDistribution: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: legend,
        position: 'bottom',
        labels: {
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            // @ts-ignore

            const value =
              dataStepsLastSessionDistribution.datasets[0].data[
                context.dataIndex
              ];

            return `${value}%`;
          },
        },
      },
      // @ts-ignore
      datalabels: {
        display: showDisplayDataLabels(window?.innerWidth),
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        padding: 3,
        font: {
          weight: 'bold',
        },
        backgroundColor: (context: any) => {
          return 'white';
        },
        color: 'black',
        formatter: (value: any, context: any) => {
          // @ts-ignore

          return `${value}%`;
        },
      },
    },
  };

  return {
    dataStepsLastSessionDistribution,
    optionsStepsLastSessionDistribution,
  };
}

// Gráfica circular distribución de tiempo
export function getStepGraphTime(
  data: SessionData,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  window: any
) {
  const dataStepsDistribution: ChartData = {
    labels: [
      t('pages.reports.graphs.automaticForwardTime'),
      t('pages.reports.graphs.automaticBackwardTime'),
      t('pages.reports.graphs.backwardIntentionTime'),
      t('pages.reports.graphs.forwardIntentionTime'),
    ],
    datasets: [
      {
        data: [
          get_percentage(
            data.total_time_automatic_forward,
            data.total_time_walking
          ),
          get_percentage(
            data.total_time_automatic_backward,
            data.total_time_walking
          ),
          get_percentage(
            data.total_time_intention_backward,
            data.total_time_walking
          ),
          get_percentage(
            data.total_time_intentiton_forward,
            data.total_time_walking
          ),
        ],
        backgroundColor: [
          documentStyle.getPropertyValue('--forward-automatic-color-1'),
          documentStyle.getPropertyValue('--backward-automatic-color-1'),
          documentStyle.getPropertyValue('--backward-intention-color-1'),
          documentStyle.getPropertyValue('--forward-intention-color-1'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--forward-automatic-color-2'),
          documentStyle.getPropertyValue('--backward-automatic-color-2'),
          documentStyle.getPropertyValue('--backward-intention-color-2'),
          documentStyle.getPropertyValue('--forward-intention-color-2'),
        ],
      },
    ],
  };
  const optionsStepsDistribution: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            // @ts-ignore
            const label = dataStepsDistribution.labels[context.dataIndex];
            const value =
              dataStepsDistribution.datasets[0].data[context.dataIndex];

            return `${value}%`;
          },
        },
      },
      // @ts-ignore
      datalabels: {
        display: showDisplayDataLabels(window?.innerWidth),
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2,
        padding: 3,
        font: {
          weight: 'bold',
        },
        backgroundColor: (context: any) => {
          return 'white';
        },
        color: 'black',
        formatter: (value: any, context: any) => {
          // @ts-ignore
          const label = dataStepsDistribution.labels[context.dataIndex];

          return `${value}%`;
        },
      },
    },
  };

  return {
    dataStepsDistribution,
    optionsStepsDistribution,
  };
}

// Grafica de puntuación
export function getScoreGraph(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  window: any
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s: any) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );

  const dataScore: ChartData = {
    labels,
    datasets: [
      {
        label: t('pages.patients.viewPatient.sessions.score'),
        data: data.map((s: any) => s.evaluation),
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
        // @ts-ignore
        datalabels: {
          align: 'end',
          anchor: 'end',
        },
      },
    ],
  };

  // Para que la tabla sea dinamica y si viene un valor mayor de 100% lo pinte
  const maxDataValue = Math.max(...data.map((s: any) => s.evaluation));
  const maxScale = Math.max(100, Math.ceil(maxDataValue / 10) * 10);

  const optionsScore: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      // @ts-ignore
      datalabels: {
        display: showDisplayDataLabels(window?.innerWidth),
        backgroundColor: '#C822FF',
        borderRadius: 50,
        color: 'white',
        font: {
          weight: 'bold',
        },
        padding: 8,
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 57,
        right: 16,
        bottom: 16,
        left: 7,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
        },
        ticks: {
          display: true,
        },
      },
      y: {
        stacked: false,
        display: true,
        max: maxScale,

        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: t('pages.patients.viewPatient.sessions.points'),
          font: {
            size: 12, // Tamaño de la fuente de la etiqueta
            weight: 'bold', // Peso de la fuente de la etiqueta
          },
        },
      },
    },
  };

  return {
    dataScore,
    optionsScore,
  };
}

// Gráfica Pasos = Direccion
export function getStepsDirectionGraph(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  textColorSecondary: string,
  textColor: string,
  surfaceBorder: string
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  // Direction
  const direction_forward = _sessions.map(
    (s) => s.steps_automatic_forward + s.steps_intention_forward
  );
  const direction_backward = _sessions.map(
    (s) => s.steps_automatic_backward + s.steps_intention_backward
  );

  const dataStepsDirection: ChartData = {
    labels,
    datasets: [
      {
        label: t('forward'),
        data: direction_forward,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
      },
      {
        label: t('backward'),
        data: direction_backward,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
      },
    ],
  };
  const optionsStepsDirection: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.patients.viewPatient.sessions.amount'),
          font: {
            size: 14, // Tamaño de la fuente de la etiqueta
            weight: 'bold', // Peso de la fuente de la etiqueta
          },
        },
      },
    },
  };

  return {
    dataStepsDirection,
    optionsStepsDirection,
  };
}

// Gráfica Pasos = Modo
export function getDataStepsMode(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  textColorSecondary: string,
  textColor: string,
  surfaceBorder: string
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  // Mode
  const mode_automatic = _sessions.map(
    (s) => s.steps_automatic_backward + s.steps_automatic_forward
  );
  const mode_intention = _sessions.map(
    (s) => s.steps_intention_backward + s.steps_intention_forward
  );

  const dataStepsMode: ChartData = {
    labels,
    datasets: [
      {
        label: t('automatic'),
        data: mode_automatic,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
      },
      {
        label: t('intention'),
        data: mode_intention,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
      },
    ],
  };
  const optionsStepsMode: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.patients.viewPatient.sessions.amount'),
          font: {
            size: 14, // Tamaño de la fuente de la etiqueta
            weight: 'bold', // Peso de la fuente de la etiqueta
          },
        },
      },
    },
  };

  return {
    dataStepsMode,
    optionsStepsMode,
  };
}

// Gráfica Tiempo = Direccion
export function getDataTimeDirectionGraphq(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  textColorSecondary: string,
  textColor: string,
  surfaceBorder: string
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  // Direction
  const direction_forward = _sessions.map(
    (s) => s.time_automatic_forward + s.time_intentiton_forward
  );
  const direction_backward = _sessions.map(
    (s) => s.time_automatic_backward + s.time_intention_backward
  );

  const dataTimeDirection: ChartData = {
    labels,
    datasets: [
      {
        label: t('forward'),
        data: direction_forward,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
      },
      {
        label: t('backward'),
        data: direction_backward,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
      },
    ],
  };
  const optionsTimeDirection: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.patients.viewPatient.sessions.minutes'),
          font: {
            size: 14, // Tamaño de la fuente de la etiqueta
            weight: 'bold', // Peso de la fuente de la etiqueta
          },
        },
      },
    },
  };

  return {
    dataTimeDirection,
    optionsTimeDirection,
  };
}

// Gráfica Tiempo = Modo
export function getDataTimeMode(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  textColorSecondary: string,
  textColor: string,
  surfaceBorder: string
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  // Mode
  const mode_automatic = _sessions.map(
    (s) => s.time_automatic_backward + s.time_automatic_forward
  );
  const mode_intention = _sessions.map(
    (s) => s.time_intention_backward + s.time_intentiton_forward
  );

  const dataTimeMode: ChartData = {
    labels,
    datasets: [
      {
        label: t('automatic'),
        data: mode_automatic,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
      },
      {
        label: t('intention'),
        data: mode_intention,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
      },
    ],
  };
  const optionsTimeMode: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.patients.viewPatient.sessions.amount'),
          font: {
            size: 14, // Tamaño de la fuente de la etiqueta
            weight: 'bold', // Peso de la fuente de la etiqueta
          },
        },
      },
    },
  };

  return {
    dataTimeMode,
    optionsTimeMode,
  };
}

// Gráfica Cadencia = Direccion
export function getDataCadenceDirectionGraph(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  textColorSecondary: string,
  textColor: string,
  surfaceBorder: string
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  // Direction
  const direction_forward = _sessions.map(
    (s) => s.cadence_automatic_forward + s.cadence_intention_forward
  );
  const direction_backward = _sessions.map(
    (s) => s.cadence_automatic_backward + s.cadence_intention_backward
  );

  const dataCadenceDirection: ChartData = {
    labels,
    datasets: [
      {
        label: t('forward'),
        data: direction_forward,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
      },
      {
        label: t('backward'),
        data: direction_backward,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
      },
    ],
  };
  const optionsCadenceDirection: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.patients.viewPatient.sessions.stepsPerMinute'),
          font: {
            size: 14, // Tamaño de la fuente de la etiqueta
            weight: 'bold', // Peso de la fuente de la etiqueta
          },
        },
      },
    },
  };

  return {
    dataCadenceDirection,
    optionsCadenceDirection,
  };
}

export function getDataCadenceModeGraph(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  textColorSecondary: string,
  textColor: string,
  surfaceBorder: string
) {
  const _sessions: sessions[] = data;
  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const labels = _sessions.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  );
  // Direction
  const mode_automatic = _sessions.map(
    (s) => s.cadence_automatic_backward + s.cadence_automatic_forward
  );
  const mode_intention = _sessions.map(
    (s) => s.cadence_intention_backward + s.cadence_intention_forward
  );

  const dataCadenceMode: ChartData = {
    labels,
    datasets: [
      {
        label: t('automatic'),
        data: mode_automatic,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
      },
      {
        label: t('intention'),
        data: mode_intention,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
      },
    ],
  };
  const optionsCadenceMode: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
        },
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };

  return {
    dataCadenceMode,
    optionsCadenceMode,
  };
}

export function showDisplayDataLabels(width: number) {
  if (width >= 450 && width < 1199) {
    return true;
  } else if (width <= 449) {
    return false;
  } else {
    return true;
  }
}

export function getMonthName(month: number) {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio ',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  return months[month];
}

// quiero

export function getSessionsByMonth(sessions: any[]) {
  const sessions_by_month: {
    sessions: sessions[];
    month: number;
    month_string: Date;
  }[] = [];
  sessions.forEach((session) => {
    const date = new Date(session.date);
    const month = date.getMonth();
    const month_string = date;
    const session_by_month = sessions_by_month.find(
      (session_by_month) => session_by_month.month === month
    );
    if (session_by_month) {
      session_by_month.sessions.push(session);
    } else {
      sessions_by_month.push({
        sessions: [session],
        month,
        month_string,
      });
    }
  });

  // Sort by month_string
  sessions_by_month.sort((a, b) => {
    return (
      new Date(a.month_string).getTime() - new Date(b.month_string).getTime()
    );
  });

  return sessions_by_month;
}

export function getNumberOfStepMode(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>
) {
  const sessionByMonth = getSessionsByMonth(data);
  const labels = sessionByMonth.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.month_string).toLocaleDateString('es-ES', {
      month: 'short',
    })
  );

  const steps_intention_forward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_intention_forward, 0)
  );

  const steps_automatic_forward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_automatic_forward, 0)
  );

  const steps_intention_backward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_intention_backward, 0)
  );

  const steps_automatic_backward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_automatic_backward, 0)
  );

  const dataNumberOfSteps: ChartData = {
    labels,
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: steps_intention_forward,
        backgroundColor: ['#C822FF'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: steps_automatic_forward,
        backgroundColor: ['#6C1AFF'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: steps_intention_backward,
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: steps_automatic_backward,
        backgroundColor: ['#DF1351'],
        borderWidth: 1,
      },
    ],
  };
  const optionsNumberOfSteps: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // max: 3000,
        min: 0,
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.graphs.steps'),
          font: {
            size: 14,
          },
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  return {
    dataNumberOfSteps,
    optionsNumberOfSteps,
  };
}

export function getNumberOfStepDirection(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>
) {
  const sessionByMonth = getSessionsByMonth(data);
  const labels = sessionByMonth.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.month_string).toLocaleDateString('es-ES', {
      month: 'short',
    })
  );

  const steps_intention_forward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_intention_forward, 0)
  );

  const steps_automatic_forward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_automatic_forward, 0)
  );

  const steps_intention_backward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_intention_backward, 0)
  );

  const steps_automatic_backward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.steps_automatic_backward, 0)
  );

  const dataNumberOfStepsDirection: ChartData = {
    labels,
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: steps_intention_forward,
        backgroundColor: ['#C822FF'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: steps_automatic_forward,
        backgroundColor: ['#6C1AFF'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: steps_intention_backward,
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: steps_automatic_backward,
        backgroundColor: ['#DF1351'],
        borderWidth: 1,
      },
    ],
  };
  const optionsNumberOfStepsDirection: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        // max: 3000,
        min: 0,
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.graphs.steps'),
          font: {
            size: 14,
          },
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  return {
    dataNumberOfStepsDirection,
    optionsNumberOfStepsDirection,
  };
}

export function getNumberOfTimeMode(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>
) {
  const sessionByMonth = getSessionsByMonth(data);
  const labels = sessionByMonth.map((s) =>
    // Format date to dd/mm/yyyy
    new Date(s.month_string).toLocaleDateString('es-ES', {
      month: 'short',
    })
  );

  const time_intention_forward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.time_intentiton_forward, 0)
  );

  const time_automatic_forward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.time_automatic_forward, 0)
  );

  const time_intention_backward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.time_intention_backward, 0)
  );

  const time_automatic_backward = sessionByMonth.map((s) =>
    s.sessions.reduce((a, b) => a + b.time_automatic_backward, 0)
  );

  const dataNumberOfTime: ChartData = {
    labels,
    datasets: [
      {
        label: t('pages.reports.graphs.forwardIntention'),
        data: time_intention_forward,
        backgroundColor: ['#C822FF'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticForward'),
        data: time_automatic_forward,
        backgroundColor: ['#6C1AFF'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.backwardIntention'),
        data: time_intention_backward,
        backgroundColor: ['#DF8F13'],
        borderWidth: 1,
      },
      {
        label: t('pages.reports.graphs.automaticBackward'),
        data: time_automatic_backward,
        backgroundColor: ['#DF1351'],
        borderWidth: 1,
      },
    ],
  };
  const optionsTimeOfUse: ChartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      // @ts-ignore
      datalabels: {
        display: false,
      },
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        stacked: true,
        title: {
          display: true,
          text: t('pages.reports.graphs.time'),
          font: {
            size: 14,
          },
        },
      },
      x: {
        stacked: true,
      },
    },
  };

  return {
    dataNumberOfTime,
    optionsTimeOfUse,
  };
}

export function getTotalSteps(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  surfaceBorder: string,
  textColorSecondary: string
) {
  const sessionByMonth = getSessionsByMonth(data);

  const _sessions: sessions[] =
    sessionByMonth[sessionByMonth.length - 1]?.sessions || [];

  // Sort by date
  _sessions.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Agrupar sesiones por día y sumarizar el número total de pasos
  const sessionsByDay: Record<string, number> = _sessions.reduce(
    (result: Record<string, number>, session) => {
      const dateKey = new Date(session.date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      if (!result[dateKey]) {
        result[dateKey] = 0;
      }

      result[dateKey] += session.steps_total;

      return result;
    },
    {}
  );

  // Obtener etiquetas y datos sumarizados y ordenarlos
  const sortedEntries = Object.entries(sessionsByDay).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );
  const labels = sortedEntries.map(([dateKey]) => dateKey);
  const total_data = sortedEntries.map(([_, total]) => total);

  const dataNumberOfSteps: ChartData = {
    labels,
    datasets: [
      {
        data: total_data,
        fill: false,
        borderColor: '#6C1AFF',
        tension: 0,
        // @ts-ignore
        datalabels: {
          align: 'end',
          anchor: 'end',
        },
      },
    ],
  };
  const optionsNumberOfSteps: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      // @ts-ignore
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const day = context.label;
            const value = context.parsed.y;

            return `${day}  - ${value} ${t('steps')}`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 32,
        right: 16,
        bottom: 16,
        left: 8,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.days'),
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: false,
        display: true,
        // max: maxValor,
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: t('pages.reports.graphs.steps'),
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return {
    dataNumberOfSteps,
    optionsNumberOfSteps,
  };
}

export function getTotalTime(
  data: any,
  documentStyle: CSSStyleDeclaration,
  t: TFunction<'translation', undefined>,
  surfaceBorder: string,
  textColorSecondary: string
) {
  const sessionByMonth = getSessionsByMonth(data);

  const _sessions: sessions[] =
    sessionByMonth[sessionByMonth.length - 1]?.sessions || [];

  // Agrupar sesiones por día y sumarizar la duración total de uso
  const sessionsByDay: Record<string, number> = _sessions.reduce(
    (result: Record<string, number>, session) => {
      const dateKey = new Date(session.date).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      if (!result[dateKey]) {
        result[dateKey] = 0;
      }

      result[dateKey] += session.time_total;

      return result;
    },
    {}
  );

  // Obtener etiquetas y datos sumarizados y ordenarlos
  const sortedEntries = Object.entries(sessionsByDay).sort(
    (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );
  const labels = sortedEntries.map(([dateKey]) => dateKey);
  const total_data = sortedEntries.map(([_, total]) => total);

  const dataTimeOfUse: ChartData = {
    labels,
    datasets: [
      {
        data: total_data,
        fill: false,
        borderColor: '#C822FF',
        tension: 0,
        // @ts-ignore
        datalabels: {
          align: 'end',
          anchor: 'end',
        },
      },
    ],
  };
  const optionsTimeOfUse: ChartOptions = {
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    plugins: {
      // @ts-ignore
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const day = context.label;
            const value = context.parsed.y;

            return `${day} - ${value} min`;
          },
        },
      },
    },
    layout: {
      padding: {
        top: 32,
        right: 16,
        bottom: 16,
        left: 8,
      },
    },

    scales: {
      x: {
        display: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
        title: {
          display: true,
          text: t('pages.reports.graphs.days'),
          font: {
            size: 14,
          },
        },
      },
      y: {
        stacked: false,
        display: true,
        beginAtZero: true,
        min: 0,
        title: {
          display: true,
          text: t('pages.reports.graphs.time'),
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return {
    dataTimeOfUse,
    optionsTimeOfUse,
  };
}

export interface TableScoreLastSessionDataInterface {
  automaticSteps: {
    forward: {
      result: number;
      index: number;
    };
    backward: {
      result: number;
      index: number;
    };
  };
  intentionalSteps: {
    forward: {
      result: number;
      index: number;
    };
    backward: {
      result: number;
      index: number;
    };
  };
  cadence: {
    automatic_forward: {
      result: number;
      index: number;
    };
    automatic_backward: {
      result: number;
      index: number;
    };
    intentional_forward: {
      result: number;
      index: number;
    };
    intentional_backward: {
      result: number;
      index: number;
    };
  };
  flexos: {
    hip: {
      result: number;
      index: number;
    };
    knee: {
      result: number;
      index: number;
    };
  };

  threshold: {
    hipL: {
      result: number;
      index: number;
    };
    kneeL: {
      result: number;
      index: number;
    };
    hipR: {
      result: number;
      index: number;
    };
    kneeR: {
      result: number;
      index: number;
    };
  };

  therapist: {
    dungarees: {
      result: number;
      index: number;
    };
    effort: {
      result: number;
      index: number;
    };
  };

  total: number;
}

export interface ComparativeTableOfLastSessionDataAgainstHistoricalAndLatestMonthlyDataInterface {
  automaticSteps: {
    historical: {
      forward: {
        result: number;
        index: number;
      };
      backward: {
        result: number;
        index: number;
      };
    };
    lastMonth: {
      forward: {
        result: number;
        index: number;
      };
      backward: {
        result: number;
        index: number;
      };
    };
    lastSession: {
      forward: {
        result: number;
        index: number;
      };
      backward: {
        result: number;
        index: number;
      };
    };
  };
  intentionalSteps: {
    historical: {
      forward: {
        result: number;
        index: number;
      };
      backward: {
        result: number;
        index: number;
      };
    };
    lastMonth: {
      forward: {
        result: number;
        index: number;
      };
      backward: {
        result: number;
        index: number;
      };
    };
    lastSession: {
      forward: {
        result: number;
        index: number;
      };
      backward: {
        result: number;
        index: number;
      };
    };
  };
  cadence: {
    historical: {
      automatic: {
        result: number;
        index: number;
      };
      intentional: {
        result: number;
        index: number;
      };
    };
    lastMonth: {
      automatic: {
        result: number;
        index: number;
      };
      intentional: {
        result: number;
        index: number;
      };
    };
    lastSession: {
      automatic: {
        result: number;
        index: number;
      };
      intentional: {
        result: number;
        index: number;
      };
    };
  };
  flexos: {
    historical: {
      hip: {
        result: number;
        index: number;
      };
      knee: {
        result: number;
        index: number;
      };
    };
    lastMonth: {
      hip: {
        result: number;
        index: number;
      };
      knee: {
        result: number;
        index: number;
      };
    };
    lastSession: {
      hip: {
        result: number;
        index: number;
      };
      knee: {
        result: number;
        index: number;
      };
    };
  };
  threshold: {
    historical: {
      hipl: {
        result: number;
        index: number;
      };
      kneel: {
        result: number;
        index: number;
      };
      hipr: {
        result: number;
        index: number;
      };
      kneer: {
        result: number;
        index: number;
      };
    };
    lastMonth: {
      hipl: {
        result: number;
        index: number;
      };
      kneel: {
        result: number;
        index: number;
      };
      hipr: {
        result: number;
        index: number;
      };
      kneer: {
        result: number;
        index: number;
      };
    };
    lastSession: {
      hipl: {
        result: number;
        index: number;
      };
      kneel: {
        result: number;
        index: number;
      };
      hipr: {
        result: number;
        index: number;
      };
      kneer: {
        result: number;
        index: number;
      };
    };
  };
  therapist: {
    historical: {
      dungarees: {
        result: number;
        index: number;
      };
      effort: {
        result: number;
        index: number;
      };
    };
    lastMonth: {
      dungarees: {
        result: number;
        index: number;
      };
      effort: {
        result: number;
        index: number;
      };
    };
    lastSession: {
      dungarees: {
        result: number;
        index: number;
      };
      effort: {
        result: number;
        index: number;
      };
    };
  };
  totalHistorical: number;
  totalLastMonth: number;
  totalLastSession: number;
}
