import type { Vitals, VitalStatus } from '../types/patient';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface Props {
    vitals: Vitals;
}

const statusConfig: Record<VitalStatus, { badge: string; label: string }> = {
  normal: {
    badge: 'bg-green-50 text-green-800',
    label: 'Normal',
  },
  warning: {
    badge: 'bg-amber-50 text-amber-800',
    label: 'Warning',
  },
  critical: {
    badge: 'bg-red-50 text-red-800',
    label: 'Critical',
  },
};

function toChartData(history: number[]) {
    return history.map((value) => ({ value }));
}

function Sparkline({ history, color = '#378ADD' }: { history: number[]; color?: string }) {
    return (
        <ResponsiveContainer width="100%" height={28}>
        <LineChart data={toChartData(history)}>
            <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            />
        </LineChart>
        </ResponsiveContainer>
    );
}

export default function VitalsGrid({ vitals }: Props) {
    const hrStatus = statusConfig[vitals.heartRate.status];
    const bpStatus = statusConfig[vitals.bloodPressure.status];
    const o2Status = statusConfig[vitals.spO2.status];

    const weightDirection = vitals.weightDeltaLbs > 0 ? '▲' : '▼';
    const weightColor = vitals.weightDeltaLbs > 0 ? 'text-amber-600' : 'text-green-600';

    return (
        <section aria-labelledby='vitals-heading'>
            <h2
            id='vitals-heading'
            className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3"
            >Vitals</h2>

            <div className="grid grid-cols-2 gap-3">

                {/* Heart Rate */}
                <div className="p-3 rounded-lg border border-gray-100 bg-white">
                    <p className="text-xs text-gray-400 uppercase tracking-wide-mb-1">Heart Rate</p>
                    <p className="text-xl font-medium font-mono">{vitals.heartRate.bpm}
                        <span className="text-xs text-gray-400 font-sans ml-1">bpm</span>
                    </p>
                    <Sparkline history={vitals.heartRate.history} color="#378ADD" />
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${hrStatus.badge}`}>
                        {hrStatus.label}
                      </span>
                </div>

                {/* Blood Pressure */}
                <div className="p-3 rounded-lg border border-gray-100 bg-white">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        Blood Pressure
                    </p>
                    <p className="text-xl font-medium font-mono">
                        {vitals.bloodPressure.systolic}/{vitals.bloodPressure.diastolic}
                        <span className="text-xs text-gray-400 font-sans ml-1">mmHg</span>
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${bpStatus.badge}`}>
                        {bpStatus.label}
                    </span>
                </div>

                {/* SpO2*/}
                <div className="p-3 rounded-lg border border-gray-100 bg-white">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                        SpO₂
                    </p>
                    <p className="text-xl font-medium font-mono">
                        {vitals.spO2.percent}
                        <span className="text-xs text-gray-400 font-sans ml-1">%</span>
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-2 inline-block ${o2Status.badge}`}>
                        {o2Status.label}
                    </span>
                </div>

                {/* Weight */}
                <div className="p-3 rounded-lg border border-gray-100 bg-white">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Weight</p>
                    <p className="text-xl font-medium font-mono">
                        {vitals.weightLbs}
                        <span className="text-xs text-gray-400 font-sans m1-1">lbs</span>
                    </p>
                    <p className={`text-xs mt-2 ${weightColor}`}>
                        {weightDirection} {Math.abs(vitals.weightDeltaLbs)} labs this week
                    </p>
                </div>
            </div>
        </section>
    )


}