// components/MedicationList.tsx
import type { MedicationDose } from '../types/patient';

interface Props {
  medications: MedicationDose[];
}

export default function MedicationList({ medications }: Props) {
  return <div>MedicationList — coming soon</div>;
}