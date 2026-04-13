import type {
  Patient,
  GlucoseReading,
  MedicationDose,
  Alert,
  CareNote,
} from '../types/patient.ts';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns an ISO string N hours before now */
const hoursAgo = (h: number): string =>
  new Date(Date.now() - h * 60 * 60 * 1000).toISOString();

/** Returns an ISO string N minutes before now */
const minsAgo = (m: number): string =>
  new Date(Date.now() - m * 60 * 1000).toISOString();

/** Returns an ISO string N days before now */
const daysAgo = (d: number): string =>
  new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();

// ─── 24h Glucose History (one reading every ~60 min for demo; use 5-min
//     intervals in production — 288 points over 24h) ────────────────────────

const rawGlucoseValues = [
  165, 158, 145, 130, 118, 105,  95,  88,  82,  58,  72,  90,
  108, 120, 114, 125, 132, 148, 163, 185, 212, 195, 172, 150, 138,
];

export const mockGlucoseHistory: GlucoseReading[] = rawGlucoseValues.map(
  (value, i) => ({
    timestamp: hoursAgo(24 - i),
    value,
    trend:
      i === rawGlucoseValues.length - 1
        ? 'slowly-rising'
        : value > rawGlucoseValues[i + 1]
        ? 'falling'
        : 'rising',
  })
);

// ─── Medications ─────────────────────────────────────────────────────────────

export const mockMedications: MedicationDose[] = [
  {
    id: 'med-001',
    name: 'Metformin',
    doseMg: 500,
    scheduledAt: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
    status: 'taken',
    prescribedBy: 'Dr. Adaeze Okonkwo',
  },
  {
    id: 'med-002',
    name: 'Lisinopril',
    doseMg: 10,
    scheduledAt: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
    status: 'taken',
    prescribedBy: 'Dr. Adaeze Okonkwo',
  },
  {
    id: 'med-003',
    name: 'Metformin',
    doseMg: 500,
    scheduledAt: new Date(new Date().setHours(20, 0, 0, 0)).toISOString(),
    status: 'upcoming',
    prescribedBy: 'Dr. Adaeze Okonkwo',
  },
  {
    id: 'med-004',
    name: 'Atorvastatin',
    doseMg: 20,
    scheduledAt: new Date(new Date().setHours(22, 0, 0, 0)).toISOString(),
    status: 'upcoming',
    prescribedBy: 'Dr. Marcus Webb',
  },
];

// ─── Alerts ──────────────────────────────────────────────────────────────────

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    severity: 'critical',
    category: 'glucose',
    message: 'Glucose dropped to 58 mg/dL — below threshold',
    detail: 'Patient was below 70 mg/dL for 22 minutes. Auto-alerted care team.',
    triggeredAt: hoursAgo(6.3),
    acknowledged: true,
    notifiedCareTeam: true,
  },
  {
    id: 'alert-002',
    severity: 'warning',
    category: 'glucose',
    message: 'Glucose above 180 for 45 min after dinner',
    detail: 'Peak reading: 212 mg/dL at 7:43 PM.',
    triggeredAt: hoursAgo(14.7),
    acknowledged: true,
    notifiedCareTeam: false,
  },
  {
    id: 'alert-003',
    severity: 'info',
    category: 'sensor',
    message: 'Sensor expires in 3 days — schedule replacement',
    detail: 'FreeStyle Libre 3 sensor expires April 13. Contact patient to schedule.',
    triggeredAt: minsAgo(90),
    acknowledged: false,
    notifiedCareTeam: false,
  },
];

// ─── Care Notes ───────────────────────────────────────────────────────────────

export const mockNotes: CareNote[] = [
  {
    id: 'note-001',
    authorId: 'clinician-001',
    authorName: 'Dr. Adaeze Okonkwo',
    authorType: 'clinician',
    recordedAt: daysAgo(1),
    content:
      'Reviewed 14-day CGM report. TIR improved from 61% → 73%. Adjusted dinner carb targets to <45g. Follow up in 2 weeks or sooner if hypoglycemia recurs.',
  },
  {
    id: 'note-002',
    authorId: 'patient-hartley',
    authorName: 'Eleanor Hartley',
    authorType: 'patient',
    recordedAt: daysAgo(2),
    content:
      'Felt dizzy after morning walk. Ate glucose tabs. Better within 15 min. Going to reduce walk intensity and eat a small snack beforehand.',
  },
  {
    id: 'note-003',
    authorId: 'clinician-002',
    authorName: 'Dr. Marcus Webb',
    authorType: 'clinician',
    recordedAt: daysAgo(7),
    content:
      'BP trending slightly elevated (avg 131/86 over 7 days). Continuing Lisinopril 10mg. Recommended low-sodium diet. Recheck in 30 days.',
  },
];

// ─── Full Patient Record ──────────────────────────────────────────────────────

export const mockPatient: Patient = {
  id: 'patient-hartley',
  mrn: '7741-882',
  firstName: 'Eleanor',
  lastName: 'Hartley',
  dob: '1958-04-12',
  diagnoses: ['Type 2 Diabetes (E11.9)', 'Hypertension (I10)', 'Hyperlipidemia (E78.5)'],

  careTeam: [
    {
      id: 'clinician-001',
      name: 'Dr. Adaeze Okonkwo',
      role: 'Endocrinologist',
      initials: 'AO',
    },
    {
      id: 'clinician-002',
      name: 'Dr. Marcus Webb',
      role: 'Primary Care Physician',
      initials: 'MW',
    },
    {
      id: 'clinician-003',
      name: 'Priya Nair',
      role: 'Diabetes Care Specialist',
      initials: 'PN',
    },
  ],

  sensor: {
    model: 'FreeStyle Libre 3',
    activatedAt: daysAgo(11),
    expiresAt: daysAgo(-3), // 3 days from now
    serialNumber: 'FSL3-2024-88441-C',
  },

  currentGlucose: {
    timestamp: minsAgo(2),
    value: 114,
    trend: 'slowly-rising',
  },

  timeInRange: {
    inRange: 73,
    aboveRange: 19,
    belowRange: 8,
    gmi: 7.2,
  },

  glucoseHistory: mockGlucoseHistory,

  vitals: {
    heartRate: {
      bpm: 72,
      status: 'normal',
      history: [74, 71, 69, 72, 75, 73, 72, 70, 71, 72],
      recordedAt: minsAgo(10),
    },
    bloodPressure: {
      systolic: 128,
      diastolic: 84,
      status: 'warning',
      recordedAt: minsAgo(10),
    },
    spO2: {
      percent: 97,
      status: 'normal',
      history: [97, 98, 97, 96, 97, 98, 97, 97, 96, 97],
      recordedAt: minsAgo(10),
    },
    weightLbs: 172,
    weightDeltaLbs: 1.2,
  },

  medications: mockMedications,
  alerts: mockAlerts,
  notes: mockNotes,
  status: 'in-range',
};