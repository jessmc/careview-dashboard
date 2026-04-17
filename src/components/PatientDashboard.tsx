import type { Patient } from '../types/patient';
import AppHeader from './AppHeader';
import PatientHeader from './PatientHeader';
import GlucosePanel from './GlucosePanel';
import VitalsGrid from './VitalsGrid';
import AlertsFeed from './AlertsFeed';
import MedicationList from './MedicationList';
import CareNotes from './CareNotes';

interface Props {
  patient: Patient;
}

export default function PatientDashboard({ patient }: Props) {
  return (
    <div className="dashboard-layout">
      <AppHeader />
      <PatientHeader patient={patient} />

      <main>
        <GlucosePanel
          currentGlucose={patient.currentGlucose}
          history={patient.glucoseHistory}
          timeInRange={patient.timeInRange}
        />
        <VitalsGrid vitals={patient.vitals} />
        <AlertsFeed alerts={patient.alerts} />
        <MedicationList medications={patient.medications} />
        <CareNotes notes={patient.notes} />
      </main>
    </div>
  );
}