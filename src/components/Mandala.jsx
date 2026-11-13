// Fine-line mandala, built from rings of lotus petals, scallops and beads.
// Geometry is computed once; colour comes from `currentColor`.

const TAU = Math.PI * 2;
const pt = (r, a) => `${(r * Math.sin(a)).toFixed(2)} ${(-r * Math.cos(a)).toFixed(2)}`;

/** n pointed petals between radii r1 → r2. */
function petals(n, r1, r2, spread = 0.85, bulge = 1.3, offset = 0) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = offset + (i * TAU) / n, hw = (Math.PI / n) * spread, mid = r1 + (r2 - r1) * 0.55;
    d += `M${pt(r1, a - hw)} Q${pt(mid, a - hw * bulge)} ${pt(r2, a)} Q${pt(mid, a + hw * bulge)} ${pt(r1, a + hw)} `;
  }
  return d;
}
const circle = (r) => `M${-r} 0 a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0 `;
function dots(n, r, size, offset = 0) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = offset + (i * TAU) / n, x = r * Math.sin(a), y = -r * Math.cos(a);
    d += `M${(x - size).toFixed(2)} ${y.toFixed(2)} a${size} ${size} 0 1 0 ${2 * size} 0 a${size} ${size} 0 1 0 ${-2 * size} 0 `;
  }
  return d;
}
/** n shallow arches between r1 and r2. */
function scallops(n, r1, r2) {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a = (i * TAU) / n, b = ((i + 1) * TAU) / n;
    d += `M${pt(r1, a)} Q${pt(r2 * 1.04, (a + b) / 2)} ${pt(r1, b)} `;
  }
  return d;
}

const LINES = [
  { d: circle(10) + petals(8, 12, 34, 0.9) + petals(8, 12, 25, 0.45, 1.1, Math.PI / 8), w: 1 },
  { d: circle(38) + petals(16, 41, 67, 0.86) + petals(16, 45, 58, 0.32), w: 0.9 },
  { d: circle(71), w: 0.9 },
  { d: petals(24, 82, 122, 0.92, 1.32) + petals(24, 87, 110, 0.42) + petals(24, 80, 100, 0.6, 1.2, Math.PI / 24), w: 0.9 },
  { d: circle(126) + scallops(48, 129, 137), w: 0.8 },
  { d: petals(32, 141, 188, 0.82, 1.38) + petals(32, 147, 172, 0.34), w: 0.85 },
];
const BEADS = dots(8, 18, 1.6, Math.PI / 8) + dots(48, 76, 1.15) + dots(32, 194.5, 2) + dots(32, 150, 1.5, Math.PI / 32);

export default function Mandala({ className = '' }) {
  return (
    <svg className={className} viewBox="-200 -200 400 400" fill="none" stroke="currentColor"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {LINES.map((l, i) => <path key={i} d={l.d} strokeWidth={l.w} />)}
      <path d={BEADS} fill="currentColor" stroke="none" />
    </svg>
  );
}
