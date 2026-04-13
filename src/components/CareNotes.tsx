import type { CareNote, NoteAuthorType } from '../types/patient';

interface Props {
  notes: CareNote[];
}

const authorConfig: Record<NoteAuthorType, { badge: string; label: string}> = {
  clinician: {
    badge: 'bg-blue-50 text-blue-800',
    label: 'Clinician',
  },
  patient: {
    badge: 'bg-gray-100 text-gray-600',
    label: 'Patient'
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function CareNotes({ notes }: Props) {
  const sorted = [...notes].sort(
    (a, b) => new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime()
  );

  return (
    <section aria-labelledby="notes-heading">
      <h2 id="notes-heading" className="text-xs font-medium uppercase tracking-widest text-gray-400 mb-3">
      Care Notes</h2>
      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400">No notes yet.</p>
      ) : (
        <ul>
          {sorted.map((note) => (
            <NoteItem key={note.id} note={note}></NoteItem>
          ))}
        </ul>
      )}  
    </section>
  )
}

function NoteItem({ note }: { note: CareNote }) {
  const config = authorConfig[note.authorType];

  return (
    <li className="p-3 rounded-lg border border-gray-100 bg-white">
      <div className="flex items-center gap-2 mb-1">
        <span className='text-sm font-medium'>{note.authorName}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${config.badge}`}>{config.label}</span>
        <span className="text-us text-gray-400 ml-auto">{formatDate(note.recordedAt)}</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">{note.content}</p>
    </li>
  )
}