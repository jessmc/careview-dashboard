import type { Alert, AlertSeverity } from '../types/patient';

interface Props {
    alerts: Alert[];
}

const severityConfig: Record<AlertSeverity, { dotColor: string; badge: string; label: string }> = {
  critical: {
    dotColor: 'bg-red-500',
    badge: 'bg-red-50 text-red-800',
    label: 'Critical',
  },
  warning: {
    dotColor: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-800',
    label: 'Warning',
  },
  info: {
    dotColor: 'bg-blue-400',
    badge: 'bg-blue-50 text-blue-800',
    label: 'Info',
  },
};

function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric'
    });
}

export default function AlertsFeed({ alerts }: Props) {
    const sorted = [...alerts].sort(
        (a,b) => new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime()
    );

    return (
        <section aria-labelledby='alerts-heading'>
            <h2 id='alerts-heading'>Active Alerts</h2>

            {sorted.length === 0 ?(
                <p>No active alerts.</p>
            ): (
                <ul>
                    {sorted.map((alert) => (
                        <AlertItem key={alert.id} alert={alert}></AlertItem>
                    ))}
                </ul>
            )};
        </section>
    )
}

function AlertItem({alert}: {alert: Alert}) {
    const config = severityConfig[alert.severity];

    return (
        <li>
            <span 
            className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${config.dotColor}`}
            aria-hidden="true"
            />

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badge}`}>
                        {config.label}
                    </span>
                    {alert.notifiedCareTeam && (
                        <span className="text-xs text-gray-400">Care team notified</span>
                    )}
                </div>

                <p className="text-sm text-gray-800 leading-snug">{alert.message}</p>

                {alert.detail && (
                <p className="text-xs text-gray-400 mt-0.5">{alert.detail}</p>
                )}

                <p className="text-xs text-gray-400 mt-1">{formatTime(alert.triggeredAt)}</p>
            </div>
        </li>
    )
}