// Line-art shared with the printed card (Ganesha, lotus, sprig) plus UI icons.
// All drawings use currentColor so they pick up the surrounding text colour.

export function Ganesha({ size = 64, className = '' }) {
  return (
    <svg className={className} width={size} height={size * 1.04} viewBox="0 0 100 104" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="50" cy="6.2" r="1.6" />
      <path d="M38.5 33.5 C38.5 28 41.5 24.6 45 23.6 C45.6 18 47.6 13.4 50 9.6 C52.4 13.4 54.4 18 55 23.6 C58.5 24.6 61.5 28 61.5 33.5" />
      <path d="M45 23.6 C47.5 24.6 52.5 24.6 55 23.6" strokeWidth="1" />
      <path d="M36 33.5 H64" />
      <path d="M37.5 37.4 H62.5" />
      <circle cx="50" cy="29" r="1.25" strokeWidth="1.1" />
      <path d="M37.5 41 C27 33.5 11 36.5 9.5 52 C8 67 20 75 33.5 69.5" />
      <path d="M62.5 41 C73 33.5 89 36.5 90.5 52 C92 67 80 75 66.5 69.5" />
      <path d="M33 46 C25 43 17.5 46.5 17 54 C16.5 61 22 65 28.5 63.5" strokeWidth="1.1" />
      <path d="M67 46 C75 43 82.5 46.5 83 54 C83.5 61 78 65 71.5 63.5" strokeWidth="1.1" />
      <path d="M50 40.6 C48.9 43 48.9 45.3 50 47 C51.1 45.3 51.1 43 50 40.6 Z" fill="var(--cherry)" stroke="var(--cherry)" strokeWidth="0.6" />
      <path d="M40.5 51 Q44 53.8 47.4 51" />
      <path d="M52.6 51 Q56 53.8 59.5 51" />
      <path d="M46.6 57 C45.6 68 45.6 78 47.6 86 C50 95 57.5 101 65 100 C71.5 99 73.6 92 69.6 88.4 C66 85.4 61 87.6 62 92" />
      <path d="M53.4 57 C54.4 66 54.2 74 55.5 80 C57 86 60.5 89.2 64 89.2" />
      <path d="M46.1 64.5 Q50 66 53.9 64.5" strokeWidth="0.9" />
      <path d="M46 71 Q50 72.5 54 71" strokeWidth="0.9" />
      <path d="M41.5 68.5 C40 74 37 77 33.5 77.5" />
      <path d="M33.5 69.5 C37 72.5 40 72.5 41.5 68.5" />
      <path d="M66.5 69.5 C63 72 60 72 57 70" />
    </svg>
  );
}

export function Lotus({ size = 28, className = '' }) {
  return (
    <svg className={className} width={size} height={size * 0.72} viewBox="-14 -12 28 21" aria-hidden="true">
      <g fill="currentColor">
        <path d="M0 -10.5 C3.4 -6.4 3.6 -1.6 0 2.2 C-3.6 -1.6 -3.4 -6.4 0 -10.5 Z" />
        <path d="M-1.6 2.4 C-3.6 -2.6 -8.6 -5 -12.6 -4.2 C-11.6 0 -6.8 3.2 -1.6 2.4 Z" />
        <path d="M1.6 2.4 C3.6 -2.6 8.6 -5 12.6 -4.2 C11.6 0 6.8 3.2 1.6 2.4 Z" />
      </g>
      <path d="M-9 4.6 Q0 8.2 9 4.6" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/** Divider: hairline — lotus — hairline */
export function LotusRule({ className = '' }) {
  return (
    <div className={`lotus-rule ${className}`} aria-hidden="true">
      <span /><Lotus size={26} /><span />
    </div>
  );
}

/** Gold lotus sprig (bloom, bud and pad) from the printed cover. */
export function LotusSprig({ className = '', flip = false }) {
  return (
    <svg className={className} viewBox="0 820 280 400" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M96 1214 C98 1120 132 1010 166 902" />
      <path d="M66 1214 C66 1130 62 1050 80 980" />
      <path d="M120 1214 C134 1160 166 1120 200 1094" />
      <g transform="translate(167 899) rotate(14)">
        <path d="M0 2 C-13 -16 -12 -44 0 -64 C12 -44 13 -16 0 2 Z" />
        <path d="M0 -6 C-3 -22 -3 -40 0 -54" strokeWidth="0.8" />
        <path d="M-1 3 C-19 -4 -32 -26 -31 -50 C-17 -42 -7 -22 -1 3" />
        <path d="M1 3 C19 -4 32 -26 31 -50 C17 -42 7 -22 1 3" />
        <path d="M-3 5 C-25 6 -44 -8 -52 -28 C-33 -30 -14 -17 -3 5" />
        <path d="M3 5 C25 6 44 -8 52 -28 C33 -30 14 -17 3 5" />
        <path d="M-13 7 C-6 13 6 13 13 7" />
      </g>
      <g transform="translate(80 979) rotate(-10)">
        <path d="M0 2 C-11 -12 -11 -34 0 -50 C11 -34 11 -12 0 2 Z" />
        <path d="M-1 1 C-14 -6 -17 -20 -13 -30" />
        <path d="M1 1 C14 -6 17 -20 13 -30" />
        <path d="M0 -6 C-2 -20 -2 -34 0 -44" strokeWidth="0.8" />
      </g>
      <g transform="translate(201 1093) rotate(-18)">
        <path d="M0 0 C-22 -2 -50 -12 -60 -30 C-40 -40 8 -40 44 -28 C62 -22 66 -10 56 -4 C40 4 18 2 0 0 Z" />
        <path d="M-60 -30 C-52 -24 -40 -20 -30 -19" />
        <path d="M0 0 L-44 -27 M0 0 L-16 -34 M0 0 L14 -34 M0 0 L40 -26 M0 0 L56 -8" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

const iconProps = {
  fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
};

export function CalendarIcon({ size = 30, day }) {
  return (
    <svg width={size} height={size} viewBox="-15 -15 30 30" strokeWidth="1.15" {...iconProps}>
      <rect x="-12.5" y="-9" width="25" height="22" rx="2.6" />
      <path d="M-12.5 -3.2 H12.5" />
      <path d="M-6.2 -12.6 V-6.4 M6.2 -12.6 V-6.4" strokeWidth="1.7" />
      {day && <text x="0" y="9.6" textAnchor="middle" fill="var(--cherry)" stroke="none"
        style={{ font: '700 12.5px var(--serif)', fontVariantNumeric: 'lining-nums' }}>{day}</text>}
    </svg>
  );
}

export function PinIcon({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="-15 -16 30 36" strokeWidth="1.2" {...iconProps}>
      <path d="M0 13.6 C-5.2 7.4 -9.6 2.4 -9.6 -3.6 A9.6 9.6 0 0 1 9.6 -3.6 C9.6 2.4 5.2 7.4 0 13.6 Z" />
      <g fill="currentColor" stroke="none" transform="translate(0 -3.8) scale(0.78)">
        <ellipse cx="0" cy="-3.6" rx="1.35" ry="3" /><ellipse cx="0" cy="3.6" rx="1.35" ry="3" />
        <ellipse cx="-3.6" cy="0" rx="3" ry="1.35" /><ellipse cx="3.6" cy="0" rx="3" ry="1.35" />
      </g>
      <path d="M-7.5 15.8 Q0 18 7.5 15.8" strokeWidth="0.9" />
    </svg>
  );
}

export function KalashIcon({ size = 30 }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="-16 -20 32 37" strokeWidth="1.1" {...iconProps}>
      <path d="M0 -16.5 C-4 -15.6 -5 -11.6 -3.8 -8.6 H3.8 C5 -11.6 4 -15.6 0 -16.5 Z" />
      <path d="M0 -16.5 C0.6 -18 1.6 -18.8 2.8 -19" />
      <path d="M-3.4 -8.4 C-5.6 -11.8 -8.4 -14.4 -11.6 -15.4 C-11 -12 -7.6 -9.4 -3.4 -8.4 Z" />
      <path d="M3.4 -8.4 C5.6 -11.8 8.4 -14.4 11.6 -15.4 C11 -12 7.6 -9.4 3.4 -8.4 Z" />
      <path d="M-4.6 -7.6 C-8 -8.8 -11.6 -8.4 -14.4 -6.4 C-11.4 -4.8 -7.6 -5.4 -4.6 -7.6 Z" />
      <path d="M4.6 -7.6 C8 -8.8 11.6 -8.4 14.4 -6.4 C11.4 -4.8 7.6 -5.4 4.6 -7.6 Z" />
      <path d="M-6.4 -7.6 H6.4" />
      <path d="M-4 -7.6 C-4 -6 -4.6 -5 -6 -4 C-13 0 -12.6 9 -7.4 12 H7.4 C12.6 9 13 0 6 -4 C4.6 -5 4 -6 4 -7.6" />
      <path d="M-10.8 1.6 Q0 4.4 10.8 1.6" strokeWidth="0.8" />
      <path d="M-5.6 12 L-6.8 15 H6.8 L5.6 12" />
      <circle cx="0" cy="7" r="1.1" fill="var(--cherry)" stroke="none" />
    </svg>
  );
}

export function PhoneIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 13.4" strokeWidth="1.2" {...iconProps}>
      <path d="M2.4 0.6 H4.6 L5.6 4 L4 5.2 C4.9 7.2 6.4 8.7 8.4 9.6 L9.6 8 L13 9 V11.2 C13 12 12.4 12.6 11.6 12.6 C5.8 12.4 1 7.6 0.8 1.8 C0.8 1.1 1.5 0.6 2.4 0.6 Z" />
    </svg>
  );
}

export function NavigateIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.8" {...iconProps}>
      <path d="M3 11.2 L20.5 3.5 L12.8 21 L11 13 Z" />
    </svg>
  );
}

export function MapIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...iconProps}>
      <path d="M9 4 L3.5 6 V20 L9 18 L15 20 L20.5 18 V4 L15 6 Z" />
      <path d="M9 4 V18 M15 6 V20" />
    </svg>
  );
}

export function CalendarPlusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...iconProps}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5 H20.5 M8 3 V7 M16 3 V7 M12 12.5 V17.5 M9.5 15 H14.5" />
    </svg>
  );
}

export function ArrowIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...iconProps}>
      <path d="M4 12 H19.5 M13.5 6 L19.5 12 L13.5 18" />
    </svg>
  );
}

export function ExternalIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" {...iconProps}>
      <path d="M8 4 H20 V16 M20 4 L5 19" />
    </svg>
  );
}

export function ShareIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth="1.6" {...iconProps}>
      <path d="M12 3.5 V15 M7.5 8 L12 3.5 L16.5 8" />
      <path d="M5 12 V19 A1.5 1.5 0 0 0 6.5 20.5 H17.5 A1.5 1.5 0 0 0 19 19 V12" />
    </svg>
  );
}
