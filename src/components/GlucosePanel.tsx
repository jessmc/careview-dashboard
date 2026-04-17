import type { GlucoseTrend, GlucoseReading, TimeInRange } from '../types/patient';

interface Props {
    currentGlucose: GlucoseReading;
    history: GlucoseReading[];
    timeInRange: TimeInRange;
}

const trendArrows: Record<GlucoseTrend, string> = {
  'rapidly-rising':  '↑↑',
  'rising':          '↑',
  'slowly-rising':   '↗',
  'stable':          '→',
  'slowly-falling':  '↘',
  'falling':         '↓',
  'rapidly-falling': '↓↓',
};

function CurrentReading(currentGlucose) {
    return (
        <p>{currentGlucose.value}</p>
    )
}

export default function GlucosePanel({ currentGlucose, history, timeInRange }: Props) {

    return (
        <section aria-labelledby="glucose-heading">
            <h2 id="glucose-heading"
            className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">Continuous Glucose Monitor</h2>

            {/* 1 — Current reading + trend */}
            <CurrentReading currentGlucose={currentGlucose} />

            {/* 2 — Time in range cards */}
            <TimeInRangeCards timeInRange={timeInRange} />

            {/* 3 — Chart */}
            <GlucoseChart history={history} />

        </section>
    )
    
}