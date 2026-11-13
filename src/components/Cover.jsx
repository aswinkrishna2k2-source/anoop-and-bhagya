import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import WaxSeal, { crackLine, BLOB } from './WaxSeal.jsx';
import { FloralSpray, EmbossFilters } from './Florals.jsx';
import { startMusic } from '../music.js';

// Timeline (ms after the tap)
const CRACK = 720;      // seal presses and splits
const SIDES = 1350;     // side flaps fold open
const ENDS_AT = 720;    // top/bottom flaps start this long after the sides
const ENDS = 1250;
const HOLD = 3200;      // "You're cordially invited" stays on screen
const LEAVE = 950;      // card fades through to the home screen
const EASE = [0.62, 0, 0.28, 1];

function makeDust(n = 34) {
  let a = 909;
  const rnd = () => { a = (a * 16807) % 2147483647; return a / 2147483647; };
  return Array.from({ length: n }, (_, i) => {
    const ang = (i / n) * Math.PI * 2 + rnd() * 0.5, dist = 70 + rnd() * 120;
    return {
      x: Math.cos(ang) * dist, y: Math.sin(ang) * dist * 0.9 - 10,
      size: 2 + rnd() * 4, delay: rnd() * 0.12, dur: 0.9 + rnd() * 0.8,
      hue: rnd() < 0.6 ? '#F4EDE0' : '#DCCFB6',   // ivory wax crumbs
    };
  });
}

const OPEN = { left: { rotateY: -180 }, right: { rotateY: 180 }, top: { rotateX: 180 }, bottom: { rotateX: -180 } };
const SHUT = { left: { rotateY: 0 }, right: { rotateY: 0 }, top: { rotateX: 0 }, bottom: { rotateX: 0 } };
const EDGE = { left: '0,0 50,50 0,100', right: '100,0 50,50 100,100', top: '0,0 50,55 100,0', bottom: '0,100 50,45 100,100' };

/** One triangular flap of embossed cherry paper. */
function Flap({ side, open, children }) {
  const isSide = side === 'left' || side === 'right';
  return (
    <motion.div
      className={`env-flap env-${side}`}
      initial={false}
      animate={open ? OPEN[side] : SHUT[side]}
      transition={{ duration: (isSide ? SIDES : ENDS) / 1000, ease: EASE }}
    >
      <div className="env-front">
        <div className="env-face">
          <FloralSpray className="spray spray-a" />
          <FloralSpray className="spray spray-b" />
          <svg className="env-edge" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polyline points={EDGE[side]} vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        {children}
      </div>
      {/* inside of the flap, seen as it folds over */}
      <div className="env-back" />
    </motion.div>
  );
}

export default function Cover({ onOpen, onDone }) {
  // intro → idle → crack → sides → ends → invited → leave
  const [phase, setPhase] = useState('intro');
  const reduce = useReducedMotion();
  const timers = useRef([]);
  const leaveTimer = useRef(null);
  const dust = useMemo(() => makeDust(), []);
  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); return t; };

  useEffect(() => {
    later(() => setPhase((p) => (p === 'intro' ? 'idle' : p)), 1300);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const leave = () => {
    clearTimeout(leaveTimer.current);
    setPhase('leave');
    onOpen();
    later(onDone, LEAVE);
  };

  const start = (e) => {
    if (phase !== 'intro' && phase !== 'idle') return;
    e?.currentTarget?.blur();
    startMusic(); // must run inside the tap so mobile browsers allow sound
    if (navigator.vibrate) navigator.vibrate(22);
    if (reduce) { leave(); return; }
    setPhase('crack');
    later(() => setPhase('sides'), CRACK);
    later(() => setPhase('ends'), CRACK + ENDS_AT);
    later(() => setPhase('invited'), CRACK + ENDS_AT + 520);
    leaveTimer.current = later(leave, CRACK + ENDS_AT + 520 + HOLD);
  };

  const order = ['intro', 'idle', 'crack', 'sides', 'ends', 'invited', 'leave'];
  const past = (p) => order.indexOf(phase) >= order.indexOf(p);
  const cracking = past('crack');

  return (
    <motion.div
      className="env"
      initial={{ opacity: 0 }}
      animate={phase === 'leave' ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: phase === 'leave' ? LEAVE / 1000 : 0.6, ease: [0.4, 0, 0.2, 1] }}
      onClick={phase === 'invited' ? leave : undefined}
      aria-hidden={phase === 'leave'}
    >
      <EmbossFilters />

      {/* the card inside the envelope */}
      <div className={`env-card ${past('ends') ? 'is-revealed' : ''}`}>
        <div className="env-card-text">
          <motion.p className="inv-caps" initial={{ opacity: 0, y: 12 }} animate={past('ends') ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.45, ease: [0.2, 0.7, 0.2, 1] }}>You&rsquo;re</motion.p>
          <span className="inv-script written" style={{ '--d': '0.85s' }}>cordially</span>
          <motion.p className="inv-caps" initial={{ opacity: 0, y: 12 }} animate={past('ends') ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.9, ease: [0.2, 0.7, 0.2, 1] }}>Invited</motion.p>
        </div>
        <motion.p className="inv-tap" initial={{ opacity: 0 }} animate={phase === 'invited' ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: phase === 'invited' ? 1.6 : 0, duration: 0.8 }}>Tap to continue</motion.p>
      </div>

      {/* flaps: top & bottom underneath, sides on top */}
      <div className="env-stage">
        <Flap side="top" open={past('ends')} />
        <Flap side="bottom" open={past('ends')} />
        {['left', 'right'].map((side) => {
          const dir = side === 'left' ? -1 : 1;
          return (
            <Flap key={side} side={side} open={past('sides')}>
              <motion.div
                className="seal-half"
                initial={{ opacity: 0 }}
                animate={cracking
                  ? { opacity: 1, scale: [1, 0.93, 1.03, 1], x: [0, 0, 0, dir * 6], rotate: [0, 0, 0, dir * 5],
                      transition: { opacity: { duration: 0 }, default: { duration: 0.72, times: [0, 0.18, 0.4, 1], ease: 'easeOut' } } }
                  : { opacity: 0, scale: 1, x: 0, rotate: 0, transition: { duration: 0 } }}
              >
                <WaxSeal half={side} />
              </motion.div>
            </Flap>
          );
        })}
      </div>

      <motion.div className="env-vignette" initial={false}
        animate={{ opacity: past('sides') ? 0 : 1 }} transition={{ duration: 0.7 }} />

      {/* the whole seal: stamps down, breathes, then hands over to the halves */}
      <motion.div
        className="seal-full"
        initial={{ scale: 1.8, opacity: 0, rotate: -8 }}
        animate={
          cracking ? { opacity: 0, scale: 1, rotate: 0, transition: { duration: 0 } }
          : phase === 'intro' ? { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 240, damping: 17, delay: 0.5 } }
          : { scale: [1, 1.02, 1], opacity: 1, rotate: 0, transition: { scale: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } } }
        }
      >
        <WaxSeal />
      </motion.div>

      <svg className="seal-crack" viewBox="-110 -110 220 220" aria-hidden="true">
        <defs><clipPath id="crack-clip"><path d={BLOB} /></clipPath></defs>
        <g clipPath="url(#crack-clip)">
          {[{ c: '#FFFFFF', w: 1.2, o: 0.85, t: 'translate(1.2 0)' }, { c: '#5C4F3D', w: 2.4, o: 0.9, t: undefined }].map((s, i) => (
            <motion.path key={i} d={crackLine} fill="none" stroke={s.c} strokeWidth={s.w} strokeOpacity={s.o}
              transform={s.t} strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={cracking ? { pathLength: 1, opacity: past('sides') ? 0 : 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ pathLength: { delay: 0.12, duration: 0.3, ease: 'easeIn' }, opacity: { duration: past('sides') ? 0.2 : 0.05 } }} />
          ))}
        </g>
      </svg>

      {cracking && !reduce && (
        <div className="dust" aria-hidden="true">
          {dust.map((p, i) => (
            <motion.span key={i} style={{ width: p.size, height: p.size, background: p.hue }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: p.x, y: [0, p.y, p.y + 40], opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
              transition={{ duration: p.dur, delay: 0.18 + p.delay, ease: [0.15, 0.8, 0.3, 1] }} />
          ))}
        </div>
      )}

      {phase === 'idle' && <span className="seal-ripple" aria-hidden="true" />}
      {!cracking && <button className="seal-button" onClick={start} aria-label="Open the invitation" />}

      <motion.p
        className="cover-hint"
        initial={{ opacity: 0, y: 8 }}
        animate={cracking ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
        transition={cracking ? { duration: 0.25 } : { delay: 1.6, duration: 0.9 }}
      >
        Tap the seal to open
      </motion.p>
    </motion.div>
  );
}
