import { useId } from 'react';
import { wedding } from '../data/wedding.js';

// ---- geometry (computed once) -------------------------------------------
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Irregular poured-wax outline with a few soft bulges, as a smooth closed path. */
function makeBlob() {
  const rnd = mulberry32(2401);
  const N = 64;
  const drips = [
    { a: 0.55, w: 0.22, h: 4.5 }, { a: 1.9, w: 0.3, h: 3.5 },
    { a: 3.35, w: 0.2, h: 5.5 }, { a: 4.6, w: 0.26, h: 4 }, { a: 5.75, w: 0.18, h: 3 },
  ];
  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    let r = 86 + 1.4 * Math.sin(3 * a + 0.5) + 1.1 * Math.sin(7 * a + 1.3) + (rnd() - 0.5) * 1.6;
    for (const d of drips) {
      let da = Math.abs(a - d.a); da = Math.min(da, Math.PI * 2 - da);
      r += d.h * Math.exp(-((da / d.w) ** 2));
    }
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  let d = `M${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(2)} ${c1[1].toFixed(2)} ${c2[0].toFixed(2)} ${c2[1].toFixed(2)} ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  return d + ' Z';
}

/** Laurel wreath cupping the monogram: two branches rising from the bottom. */
function makeWreath() {
  const R = 47, leaves = [];
  // a leaf whose base sits on the branch at angle `a`, pointing along `along`, splayed by `lean`
  const leaf = (a, along, lean) => {
    const x = R * Math.cos(a), y = R * Math.sin(a);
    const tilt = along + lean, len = 12, w = 4.3;
    const ex = x + len * Math.cos(tilt), ey = y + len * Math.sin(tilt);
    const nx = -Math.sin(tilt) * w, ny = Math.cos(tilt) * w;
    const mx = x + (ex - x) * 0.45, my = y + (ey - y) * 0.45;
    return `M${x.toFixed(2)} ${y.toFixed(2)} Q${(mx + nx).toFixed(2)} ${(my + ny).toFixed(2)} ${ex.toFixed(2)} ${ey.toFixed(2)} Q${(mx - nx).toFixed(2)} ${(my - ny).toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} Z `;
  };
  const deg = (d) => (d * Math.PI) / 180;
  // y points down: the left branch climbs 100° → 200°, the right branch 80° → -20°
  for (let d = 102; d <= 192; d += 13) {
    const a = deg(d); leaves.push(leaf(a, a + Math.PI / 2, 0.5), leaf(a, a + Math.PI / 2, -0.5));
  }
  for (let d = 78; d >= -12; d -= 13) {
    const a = deg(d); leaves.push(leaf(a, a - Math.PI / 2, -0.5), leaf(a, a - Math.PI / 2, 0.5));
  }
  const arc = (from, to) => {
    const p = (d) => `${(R * Math.cos(deg(d))).toFixed(2)} ${(R * Math.sin(deg(d))).toFixed(2)}`;
    return `M${p(from)} A${R} ${R} 0 0 ${to > from ? 1 : 0} ${p(to)} `;
  };
  return { leaves: leaves.join(''), stems: arc(98, 200) + arc(82, -20) };
}

/** Jagged vertical crack through the centre. */
const CRACK = [
  [1, -108], [-2, -90], [3, -76], [-3, -62], [2, -50], [-4, -37], [3, -24], [-2, -12],
  [4, 0], [-3, 11], [2, 23], [-4, 35], [3, 48], [-2, 60], [3, 73], [-3, 86], [1, 108],
];
const crackLine = 'M' + CRACK.map(([x, y]) => `${x} ${y}`).join(' L');
const last = CRACK[CRACK.length - 1][0];
const leftClip = `M-130 -130 L${CRACK[0][0]} -130 L` + CRACK.map(([x, y]) => `${x} ${y}`).join(' L') + ` L${last} 130 L-130 130 Z`;
const rightClip = `M130 -130 L${CRACK[0][0]} -130 L` + CRACK.map(([x, y]) => `${x} ${y}`).join(' L') + ` L${last} 130 L130 130 Z`;
const BLOB = makeBlob();
const WREATH = makeWreath();

export { crackLine, BLOB };

// ---- wax colours -----------------------------------------------------------
const TONES = {
  ivory: {
    body: ['#FAF4E8', '#EBE2CF', '#D5C8AE', '#AA9B7F'],
    disc: ['#F1E9D9', '#E3D8C2', '#CEC0A4'],
    relief: '#E9E0CC', rimDark: '#8F7F63', rimLight: '#FFFFFF',
    insetShadow: '#5E5140', lip: '#FFFFFF', drop: '#1A0306',
  },
  gold: {
    body: ['#F4DE9E', '#D9B566', '#B38A3A', '#7A5A20'],
    disc: ['#E2C27A', '#C49E50', '#9C772C'],
    relief: '#CFAB5C', rimDark: '#6A4C16', rimLight: '#FFF0C4',
    insetShadow: '#4A3410', lip: '#FFF1C8', drop: '#2A050D',
  },
};

/**
 * Wax seal with an embossed monogram and wreath.
 * half: 'full' | 'left' | 'right' — renders only that side of the crack.
 * tone: 'ivory' (matte, default) | 'gold'.
 */
export default function WaxSeal({ half = 'full', tone = 'ivory', className = '' }) {
  const uid = useId().replace(/:/g, '');
  const id = (n) => `${n}-${uid}`;
  const c = TONES[tone] ?? TONES.ivory;
  const [l1, l2] = wedding.monogram;

  return (
    <svg className={className} viewBox="-110 -110 220 220" aria-hidden="true">
      <defs>
        <radialGradient id={id('wax')} cx="36%" cy="30%" r="82%">
          <stop offset="0" stopColor={c.body[0]} />
          <stop offset="0.38" stopColor={c.body[1]} />
          <stop offset="0.75" stopColor={c.body[2]} />
          <stop offset="1" stopColor={c.body[3]} />
        </radialGradient>
        <radialGradient id={id('disc')} cx="58%" cy="64%" r="72%">
          <stop offset="0" stopColor={c.disc[0]} />
          <stop offset="0.6" stopColor={c.disc[1]} />
          <stop offset="1" stopColor={c.disc[2]} />
        </radialGradient>
        <linearGradient id={id('rim')} x1="0.15" y1="0.1" x2="0.85" y2="0.9">
          <stop offset="0" stopColor={c.rimLight} stopOpacity="0.95" />
          <stop offset="0.5" stopColor={c.body[1]} stopOpacity="0" />
          <stop offset="1" stopColor={c.rimDark} stopOpacity="0.55" />
        </linearGradient>

        {/* soft cast shadow on the paper: wide ambient + tight contact */}
        <filter id={id('shadow')} x="-35%" y="-35%" width="170%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="amb" />
          <feOffset in="amb" dx="3" dy="9" result="ambO" />
          <feFlood floodColor={c.drop} floodOpacity="0.55" />
          <feComposite in2="ambO" operator="in" result="ambS" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="con" />
          <feOffset in="con" dx="1" dy="2.5" result="conO" />
          <feFlood floodColor={c.drop} floodOpacity="0.6" />
          <feComposite in2="conO" operator="in" result="conS" />
          <feMerge><feMergeNode in="ambS" /><feMergeNode in="conS" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* matte relief (diffuse + a little soft sheen), light from the top-left */}
        <filter id={id('relief')} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="b" />
          <feDiffuseLighting in="b" surfaceScale="3.2" diffuseConstant="1.34" lightingColor="#FFFFFF" result="d">
            <feDistantLight azimuth="225" elevation="48" />
          </feDiffuseLighting>
          <feComposite in="d" in2="SourceAlpha" operator="in" result="d2" />
          <feBlend in="SourceGraphic" in2="d2" mode="multiply" result="lit" />
          <feSpecularLighting in="b" surfaceScale="3.2" specularConstant="0.38" specularExponent="9" lightingColor="#FFFFFF" result="s">
            <feDistantLight azimuth="225" elevation="48" />
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="s2" />
          <feOffset in="SourceAlpha" dx="1.1" dy="1.5" result="o" />
          <feGaussianBlur in="o" stdDeviation="1.1" result="ob" />
          <feFlood floodColor={c.insetShadow} floodOpacity="0.4" />
          <feComposite in2="ob" operator="in" result="sh" />
          <feMerge><feMergeNode in="sh" /><feMergeNode in="lit" /><feMergeNode in="s2" /></feMerge>
        </filter>

        {/* recessed stamp face: shadow on the upper-left inner wall, light on the lower-right */}
        <filter id={id('inset')} x="-10%" y="-10%" width="120%" height="120%">
          <feOffset in="SourceAlpha" dx="3" dy="3.6" result="o1" />
          <feComposite in="SourceAlpha" in2="o1" operator="out" result="e1" />
          <feGaussianBlur in="e1" stdDeviation="2.6" result="e1b" />
          <feFlood floodColor={c.insetShadow} floodOpacity="0.5" />
          <feComposite in2="e1b" operator="in" result="sh" />
          <feComposite in="sh" in2="SourceAlpha" operator="in" result="sh2" />
          <feOffset in="SourceAlpha" dx="-2.4" dy="-2.8" result="o2" />
          <feComposite in="SourceAlpha" in2="o2" operator="out" result="e2" />
          <feGaussianBlur in="e2" stdDeviation="2" result="e2b" />
          <feFlood floodColor="#FFFFFF" floodOpacity="0.55" />
          <feComposite in2="e2b" operator="in" result="hl" />
          <feComposite in="hl" in2="SourceAlpha" operator="in" result="hl2" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="sh2" /><feMergeNode in="hl2" /></feMerge>
        </filter>

        <clipPath id={id('blob')}><path d={BLOB} /></clipPath>
        <clipPath id={id('half')}>
          <path d={half === 'left' ? leftClip : half === 'right' ? rightClip : 'M-130 -130 H130 V130 H-130 Z'} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id('half')})`}>
        {/* poured wax body */}
        <path d={BLOB} fill={`url(#${id('wax')})`} filter={`url(#${id('shadow')})`} />
        <g clipPath={`url(#${id('blob')})`}>
          <path d={BLOB} fill="none" stroke={c.lip} strokeOpacity="0.55" strokeWidth="2.2" transform="translate(1.1 1.3)" />
        </g>

        {/* raised rim pushed up by the stamp */}
        <circle r="67" fill="none" stroke={c.body[1]} strokeWidth="7" filter={`url(#${id('relief')})`} />

        {/* pressed face */}
        <circle r="62.5" fill={`url(#${id('disc')})`} filter={`url(#${id('inset')})`} />
        <circle r="62.5" fill="none" stroke={`url(#${id('rim')})`} strokeWidth="1.4" />

        {/* stamped design in relief */}
        <g filter={`url(#${id('relief')})`} fill={c.relief}>
          <text x="-1" y="13" textAnchor="middle"
            style={{ font: '600 52px var(--serif)', letterSpacing: '-2px' }}>
            {l1}<tspan dx="-3">{l2}</tspan>
          </text>
          <path d={WREATH.leaves} />
          <path d={WREATH.stems} fill="none" stroke={c.relief} strokeWidth="1.5" strokeLinecap="round" />
          <circle cy="47" r="2.6" />
          <g transform="translate(0 -40) scale(0.55)">
            <path d="M0 -10.5 C3.4 -6.4 3.6 -1.6 0 2.2 C-3.6 -1.6 -3.4 -6.4 0 -10.5 Z" />
            <path d="M-1.6 2.4 C-3.6 -2.6 -8.6 -5 -12.6 -4.2 C-11.6 0 -6.8 3.2 -1.6 2.4 Z" />
            <path d="M1.6 2.4 C3.6 -2.6 8.6 -5 12.6 -4.2 C11.6 0 6.8 3.2 1.6 2.4 Z" />
          </g>
        </g>
      </g>
    </svg>
  );
}
