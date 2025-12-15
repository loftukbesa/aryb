export enum AppView {
  INPUT = 'INPUT',
  PATIENT_RESULT = 'PATIENT_RESULT',
  SHIFT_RESULT = 'SHIFT_RESULT',
}

export interface Nurse {
  id: number;
  name: string;
}

export interface Assignment {
  nurseName: string;
  assignedValue: string;
}

export type JokeContext = 'patient' | 'shift';

export interface JokeResponse {
  targetNurse: string;
  text: string;
}
