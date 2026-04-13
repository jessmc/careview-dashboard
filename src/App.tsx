import './App.css'
import { mockPatient } from './data/mockPatient'
import PatientDashboard from './components/PatientDashboard';


export default function App() {
  return <PatientDashboard patient={mockPatient} />;
}