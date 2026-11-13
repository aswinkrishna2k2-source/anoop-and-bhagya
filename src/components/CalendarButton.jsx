import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding.js';
import { CalendarPlusIcon } from './Art.jsx';

const utc = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s) => s.replace(/([,;\\])/g, '\\$1');

const title = `Wedding of ${wedding.groom} & ${wedding.bride}`;
const venueText = `${wedding.venue.name}, ${wedding.venue.lines.join(', ')}`;
const receptionText = `${wedding.reception.name}, ${wedding.reception.lines.join(', ')}`;

function googleUrl() {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${utc(wedding.muhurtham.start)}/${utc(wedding.muhurtham.end)}`,
    details: `Muhurtham ${wedding.muhurtham.time}.\nReception: ${wedding.reception.when}, ${wedding.reception.time} at ${receptionText}.`,
    location: venueText,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

function downloadIcs() {
  const stamp = utc(new Date().toISOString());
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Anoop and Bhagya//Wedding Invitation//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT', 'UID:wedding-20270124@anoop-bhagya', `DTSTAMP:${stamp}`,
    `DTSTART:${utc(wedding.muhurtham.start)}`, `DTEND:${utc(wedding.muhurtham.end)}`,
    `SUMMARY:${esc(title)} (Muhurtham)`, `LOCATION:${esc(venueText)}`,
    `GEO:${wedding.venue.lat};${wedding.venue.lng}`, 'END:VEVENT',
    'BEGIN:VEVENT', 'UID:reception-20270124@anoop-bhagya', `DTSTAMP:${stamp}`,
    `DTSTART:${utc(wedding.reception.start)}`,
    `SUMMARY:${esc(`Reception – ${wedding.coupleShort}`)}`, `LOCATION:${esc(receptionText)}`,
    `GEO:${wedding.reception.lat};${wedding.reception.lng}`, 'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: 'anoop-bhagya-wedding.ics' });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function CalendarButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div className="cal" ref={ref}>
      <button className="btn btn-cherry" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <CalendarPlusIcon /> Add to Calendar
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="cal-menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <a href={googleUrl()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>Google Calendar</a>
            <button onClick={() => { downloadIcs(); setOpen(false); }}>Apple / Outlook (.ics)</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
