import { useMemo } from 'react';

/** A light fall of gold and ivory petals over the hero (CSS-driven, plays twice). */
export default function Petals({ count = 16 }) {
  const petals = useMemo(() => {
    let a = 2027;
    const rnd = () => { a = (a * 16807) % 2147483647; return a / 2147483647; };
    return Array.from({ length: count }, (_, i) => ({
      left: `${(i / count) * 100 + rnd() * 6 - 3}%`,
      size: 9 + rnd() * 10,
      delay: rnd() * 5 + 0.6,
      dur: 7 + rnd() * 5,
      sway: `${(rnd() - 0.5) * 120}px`,
      spin: `${(rnd() < 0.5 ? -1 : 1) * (180 + rnd() * 360)}deg`,
      color: rnd() < 0.55 ? 'var(--gold-soft)' : 'var(--ivory)',
      opacity: 0.55 + rnd() * 0.35,
    }));
  }, [count]);

  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: p.left, width: p.size, height: p.size * 1.35,
            animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
            '--sway': p.sway, '--spin': p.spin, '--petal': p.color, '--o': p.opacity,
          }}
        >
          <svg viewBox="0 0 20 27"><path d="M10 0 C17 6 20 14 15 22 C13 25 7 25 5 22 C0 14 3 6 10 0 Z" /></svg>
        </span>
      ))}
    </div>
  );
}
