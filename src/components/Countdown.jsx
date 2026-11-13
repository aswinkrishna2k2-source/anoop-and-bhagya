import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { wedding } from '../data/wedding.js';
import Reveal from './Reveal.jsx';
import CalendarButton from './CalendarButton.jsx';
import Mandala from './Mandala.jsx';

const TARGET = new Date(wedding.muhurtham.start).getTime();

function split(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/** Each digit rolls up when it changes. */
function Rolling({ value, min = 2 }) {
  const digits = String(value).padStart(min, '0').split('');
  return (
    <span className="rolling" aria-hidden="true">
      {digits.map((d, i) => (
        <span className="digit" key={i}>
          <AnimatePresence initial={false}>
            <motion.span
              key={d}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.3, 0.7, 0.2, 1] }}
            >
              {d}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </span>
  );
}

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = TARGET - now;
  const t = split(left);
  const units = [
    ['Days', t.days], ['Hours', t.hours], ['Minutes', t.minutes], ['Seconds', t.seconds],
  ];

  return (
    <section className="section paper has-mandala" id="countdown">
      <motion.div
        className="mandala mandala-left"
        initial={{ opacity: 0, scale: 0.82, rotate: -40 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 2.8, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <Mandala className="spin" />
      </motion.div>
      <motion.div
        className="mandala mandala-corner"
        initial={{ opacity: 0, scale: 0.8, rotate: 30 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 2.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.35 }}
      >
        <Mandala className="spin reverse" />
      </motion.div>
      <div className="wrap center">
        <Reveal><p className="kicker">Save the date</p></Reveal>
        <Reveal delay={0.05}>
          <h2 className="date-title">{wedding.dateLong}</h2>
          <p className="date-sub">{wedding.malayalamDate}</p>
          <p className="date-sub">{wedding.muhurtham.label} · {wedding.muhurtham.time}</p>
        </Reveal>

        <Reveal delay={0.1}>
          {left > 0 ? (
            <div className="countdown" role="timer" aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes to go`}>
              {units.map(([label, v], i) => (
                <div className="unit" key={label}>
                  <Rolling value={v} min={label === 'Days' && v > 99 ? 3 : 2} />
                  <span className="unit-label">{label}</span>
                  {i < units.length - 1 && <i className="unit-sep" />}
                </div>
              ))}
            </div>
          ) : (
            <p className="countdown-done">The auspicious day is here</p>
          )}
        </Reveal>

        <Reveal delay={0.15}><CalendarButton /></Reveal>
      </div>
    </section>
  );
}
