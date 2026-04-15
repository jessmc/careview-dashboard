import type { Patient, PatientStatus } from "../types/patient";

interface Props {
  patient: Patient;
}

const statusConfig: Record<PatientStatus, { badge: string; label: string }> = {
  'in-range': {
    badge: 'bg-green-50 text-green-800',
    label: 'In Range',
  },
  alert: {
    badge: 'bg-yellow-50 text-yellow-800',
    label: 'Alert',
  },
  critical: {
    badge: 'bg-red-100 text-red-800',
    label: 'Critical',
  },
};

function formatDob(dob: string): string {
  return new Date(dob).toLocaleDateString([], {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

function getSensorDay(activatedAt: string): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((Date.now() - new Date(activatedAt).getTime()) / msPerDay) + 1;
}

export default function PatientHeader({ patient }: Props) {
  const config = statusConfig[patient.status];
  const sensorDay = getSensorDay(patient.sensor.activatedAt);

  return (
    <section
      aria-labelledby="patient-heading"
      className="flex items-center justify-between px-6 py-3 bg-gray-50 border-b border-gray-200"
    >
      {/* Left — name + meta */}
      <div className="flex items-center gap-6">
        <div>
          <div className="flex items-center gap-3">
            <h2
              id="patient-heading"
              className="text-base font-medium text-gray-900"
            >
              {patient.firstName} {patient.lastName}
            </h2>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${config.badge}`}>
              {config.label}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-gray-400">
              DOB: {formatDob(patient.dob)}
            </span>
            <span className="text-xs text-gray-400">
              MRN: {patient.mrn}
            </span>
            <span className="text-xs text-gray-400">
              {patient.diagnoses.join(' · ')}
            </span>
          </div>
        </div>
      </div>

      {/* Right — sensor info */}
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs font-medium text-gray-700">
          {patient.sensor.model}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
          <span className="text-xs text-gray-400">
            Sensor day {sensorDay} / 14
          </span>
        </div>
      </div>
    </section>
  );
}