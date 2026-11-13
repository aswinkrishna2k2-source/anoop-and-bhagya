// Botanical spray (flowers, buds, leaves) for the envelope's blind-embossed pattern.
// Shapes are drawn in one colour; the emboss/deboss SVG filters defined in
// <EmbossFilters /> turn them into raised relief on the paper.

const f = (n) => n.toFixed(1);
const rot = (x, y, a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];

/** Almond leaf pointing along angle `deg`, base at (x,y). */
function leaf(x, y, len, wid, deg) {
  const a = (deg * Math.PI) / 180;
  const p = (u, v) => { const [rx, ry] = rot(v, -u, a); return `${f(x + rx)} ${f(y + ry)}`; };
  return {
    body: `M${p(0, 0)} Q${p(len * 0.45, wid)} ${p(len, 0)} Q${p(len * 0.45, -wid)} ${p(0, 0)} Z `,
    vein: `M${p(len * 0.08, 0)} L${p(len * 0.86, 0)} `,
  };
}

/** Five-petal flower centred at (x,y), radius r. */
function flower(x, y, r, deg = 0) {
  let body = '', vein = '';
  for (let i = 0; i < 5; i++) {
    const a = ((deg + i * 72) * Math.PI) / 180;
    const p = (u, v) => { const [rx, ry] = rot(u, v, a); return `${f(x + rx)} ${f(y + ry)}`; };
    body += `M${p(0, -r * 0.18)} C${p(-r * 0.62, -r * 0.38)} ${p(-r * 0.6, -r * 1.02)} ${p(0, -r * 0.98)} C${p(r * 0.6, -r * 1.02)} ${p(r * 0.62, -r * 0.38)} ${p(0, -r * 0.18)} Z `;
    const b = a + Math.PI / 5;
    const q = (u, v) => { const [rx, ry] = rot(u, v, b); return `${f(x + rx)} ${f(y + ry)}`; };
    vein += `M${q(0, -r * 0.3)} L${q(0, -r * 0.78)} `;
  }
  vein += `M${f(x - r * 0.24)} ${f(y)} a${f(r * 0.24)} ${f(r * 0.24)} 0 1 0 ${f(r * 0.48)} 0 a${f(r * 0.24)} ${f(r * 0.24)} 0 1 0 ${f(-r * 0.48)} 0 `;
  return { body, vein };
}

/** Closed bud on a short stalk. */
function bud(x, y, size, deg) {
  const a = (deg * Math.PI) / 180;
  const p = (u, v) => { const [rx, ry] = rot(v, -u, a); return `${f(x + rx)} ${f(y + ry)}`; };
  return {
    body: `M${p(0, 0)} Q${p(size * 0.5, size * 0.55)} ${p(size, 0)} Q${p(size * 0.5, -size * 0.55)} ${p(0, 0)} Z `,
    vein: `M${p(size * 0.15, 0)} L${p(size * 0.8, 0)} `,
  };
}

function build() {
  const parts = [
    // leaves along the main stem
    leaf(52, 262, 40, 12, -62), leaf(66, 224, 44, 13, 38), leaf(92, 178, 40, 12, -48),
    leaf(128, 140, 42, 13, 52), leaf(160, 104, 36, 11, -30), leaf(186, 70, 30, 10, 60),
    // twig leaves
    leaf(84, 160, 30, 9, -80), leaf(140, 96, 26, 8, -100), leaf(48, 140, 28, 9, -150),
    // flowers & buds
    flower(204, 30, 27, 12), flower(60, 112, 21, -8), flower(150, 172, 15, 30),
    bud(150, 92, 22, -60), bud(98, 128, 18, -110), bud(176, 160, 16, 40),
  ];
  const stems =
    'M28 318 C58 252 72 196 118 146 S186 66 204 30 ' +
    'M96 162 C84 146 72 128 60 112 ' +
    'M140 116 C146 108 148 100 150 92 ' +
    'M108 150 C104 142 100 136 98 128 ' +
    'M132 150 C140 158 146 166 150 172 ' +
    'M160 140 C166 150 172 156 176 160 ';
  return {
    body: parts.map((p) => p.body).join(''),
    vein: parts.map((p) => p.vein).join(''),
    stems,
  };
}
const SPRAY = build();

/** One embossed spray. Position/rotate it with CSS. */
export function FloralSpray({ className = '', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 240 320" aria-hidden="true">
      <g filter="url(#env-emboss)" fill="#000">
        <path d={SPRAY.body} />
        <path d={SPRAY.stems} fill="none" stroke="#000" strokeWidth="3.2" strokeLinecap="round" />
      </g>
      <path d={SPRAY.vein} filter="url(#env-deboss)" fill="none" stroke="#000" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** Shared relief filters (light from the top-left). Render once. */
export function EmbossFilters() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <filter id="env-emboss" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="a" />
          <feOffset in="a" dx="1.4" dy="1.6" result="dr" />
          <feOffset in="a" dx="-1.2" dy="-1.4" result="ul" />
          <feComposite in="a" in2="dr" operator="out" result="hiMask" />
          <feComposite in="a" in2="ul" operator="out" result="loMask" />
          <feFlood floodColor="#F3A9B5" floodOpacity="0.32" />
          <feComposite in2="hiMask" operator="in" result="hi" />
          <feFlood floodColor="#1A0106" floodOpacity="0.62" />
          <feComposite in2="loMask" operator="in" result="lo" />
          <feFlood floodColor="#FFE3E7" floodOpacity="0.045" />
          <feComposite in2="a" operator="in" result="face" />
          <feMerge><feMergeNode in="face" /><feMergeNode in="lo" /><feMergeNode in="hi" /></feMerge>
        </filter>
        <filter id="env-deboss" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" result="a" />
          <feOffset in="a" dx="1" dy="1.1" result="dr" />
          <feOffset in="a" dx="-0.9" dy="-1" result="ul" />
          <feComposite in="a" in2="dr" operator="out" result="tl" />
          <feComposite in="a" in2="ul" operator="out" result="br" />
          <feFlood floodColor="#1A0106" floodOpacity="0.5" />
          <feComposite in2="tl" operator="in" result="sh" />
          <feFlood floodColor="#F3A9B5" floodOpacity="0.26" />
          <feComposite in2="br" operator="in" result="li" />
          <feMerge><feMergeNode in="sh" /><feMergeNode in="li" /></feMerge>
        </filter>
      </defs>
    </svg>
  );
}
