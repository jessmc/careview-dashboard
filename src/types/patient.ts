// ─── Glucose ─────────────────────────────────────────────────────────────────

export type GlucoseTrend =
  | 'rapidly-rising'   // > +3 mg/dL/min
  | 'rising'           // +2 to +3 mg/dL/min
  | 'slowly-rising'    // +1 to +2 mg/dL/min
  | 'stable'           // -1 to +1 mg/dL/min
  | 'slowly-falling'
  | 'falling'
  | 'rapidly-falling';

export interface GlucoseReading {
  timestamp: string;   // ISO 8601
  value: number;       // mg/dL
  trend?: GlucoseTrend;
}

export interface TimeInRange {
  inRange: number;     // % 70–180 mg/dL
  aboveRange: number;  // % > 180 mg/dL
  belowRange: number;  // % < 70 mg/dL
  gmi: number;         // Glucose Management Indicator (est. A1C %)
}

export interface SensorInfo {
  model: string;       // e.g. "FreeStyle Libre 3"
  activatedAt: string; // ISO 8601
  expiresAt: string;   // ISO 8601 — sensors last 14 days
  serialNumber: string;
}

// ─── Vitals ──────────────────────────────────────────────────────────────────

export type VitalStatus = 'normal' | 'warning' | 'critical';

export interface BloodPressureReading {
  systolic: number;
  diastolic: number;
  recordedAt: string;
}

export interface VitalSeries {
  /** Last 10 readings for the sparkline */
  history: number[];
  recordedAt: string;
}

export interface Vitals {
  heartRate: VitalSeries & { bpm: number; status: VitalStatus };
  bloodPressure: BloodPressureReading & { status: VitalStatus };
  spO2: VitalSeries & { percent: number; status: VitalStatus };
  weightLbs: number;
  weightDeltaLbs: number; // change vs. 7 days ago (positive = gained)
}

// ─── Medications ─────────────────────────────────────────────────────────────

export type MedicationStatus = 'taken' | 'missed' | 'upcoming';

export interface MedicationDose {
  id: string;
  name: string;
  doseMg: number;
  scheduledAt: string; // ISO 8601
  status: MedicationStatus;
  prescribedBy: string;
}

// ─── Alerts ──────────────────────────────────────────────────────────────────

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertCategory = 'glucose' | 'sensor' | 'vitals' | 'medication';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  category: AlertCategory;
  message: string;
  detail?: string;
  triggeredAt: string; // ISO 8601
  acknowledged: boolean;
  notifiedCareTeam: boolean;
}

// ─── Care Team & Notes ───────────────────────────────────────────────────────

export interface CareTeamMember {
  id: string;
  name: string;
  role: string;        // e.g. "Endocrinologist", "Primary Care Physician"
  initials: string;
}

export type NoteAuthorType = 'clinician' | 'patient';

export interface CareNote {
  id: string;
  authorId: string;
  authorName: string;
  authorType: NoteAuthorType;
  recordedAt: string;  // ISO 8601
  content: string;
}

// ─── Patient ─────────────────────────────────────────────────────────────────

export type PatientStatus = 'in-range' | 'alert' | 'critical';

export interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  dob: string;         // ISO 8601 date (YYYY-MM-DD)
  diagnoses: string[];
  careTeam: CareTeamMember[];
  sensor: SensorInfo;
  currentGlucose: GlucoseReading;
  timeInRange: TimeInRange;
  glucoseHistory: GlucoseReading[];  // 24h of 5-min readings (288 points max)
  vitals: Vitals;
  medications: MedicationDose[];
  alerts: Alert[];
  notes: CareNote[];
  status: PatientStatus;
}