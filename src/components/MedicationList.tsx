import type { MedicationDose, MedicationStatus } from '../types/patient';

interface Props {
  medications: MedicationDose[];
}

const statusConfig: Record<MedicationStatus, { badge: string; indicator: string; label: string }> = {
  taken: {
    badge: 'bg-green-50 text-green-800',
    indicator: 'bg-green-500',
    label: 'Taken'
  },
  missed: {
    badge: 'bg-red-50 text-red-800',
    indicator: 'bg-red-500',
    label: 'Missed'
  },
  upcoming: {
    badge: 'bg-gray-100 text-gray-600',
    indicator: 'bg-gray-300',
    label: 'Upcoming'
  }
};

export default function MedicationList({ medications }: Props) {
  const sorted = [...medications].sort(
    (a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  )

  return  (
    <section aria-labelledby="medication-heading">
      <h2 id="medication-heading" className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
      Medications Today</h2>

      {sorted.length === 0 ? (
        <p>No medications today</p>
      ): (
        <ul>
          {sorted.map((medication) => (
            <MedicationItem key={medication.id} medication={medication}></MedicationItem>
          ))}
        </ul>
      )}
    </section>
  )
}

function MedicationItem({medication}: {medication: MedicationDose}) {
  const config = statusConfig[medication.status];

  return (
    <li className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 bg-white">
      <span className={`w-2 h-2 rounded-full shrink-0 ${config.indicator}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{medication.name}</p>
        <p className="text-xs text-gray-400">{medication.doseMg}mg · {new Date(medication.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</p>
      </div>
      <span className={`text-xs px-2 py-0.5 rounded-full ${config.badge}`}>
        {config.label}
      </span>
    </li>
  );
}