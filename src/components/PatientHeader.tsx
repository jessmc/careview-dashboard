import type { Patient, PatientStatus } from "../types/patient";

interface Props {
    patient: Patient
}

const statusConfig: Record<PatientStatus, { badge: string; indicator: string; label: string }> = {
  'in-range': {
    badge: 'bg-green-50 text-green-800',
    indicator: 'bg-green-500',
    label: 'In Range'
  },
  alert: {
    badge: 'bg-yellow-50 text-yellow-800',
    indicator: 'bg-yellow-500',
    label: 'Alert'
  },
  critical: {
    badge: 'bg-red-100 text-red-600',
    indicator: 'bg-red-300',
    label: 'Critical'
  }
};

export default function PatientHeader({patient}: Props) {

    const config = statusConfig[patient.status];

    return (
        <section aria-labelledby="patient-heading">
            <h2 id="patient-heading">{patient.firstName} {patient.lastName}</h2>
            <span>DOB: {patient.dob}</span>
            <span>MRN: {patient.mrn}</span>
            <span>{patient.diagnoses}</span>

            <span className={`text-xs px-2 py-0.5 rounded-full ${config.badge}`}>
                {config.label}
            </span>
        </section>
    )
}