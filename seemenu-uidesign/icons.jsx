// Shared icons (stroke-based; takes color via prop)
const Ico = {
  back: (c='#000', s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  camera: (c='#fff', s=22) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 8a2 2 0 012-2h2.5l1.5-2h6l1.5 2H19a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke={c} strokeWidth="1.7"/><circle cx="12" cy="13" r="4" stroke={c} strokeWidth="1.7"/></svg>,
  flash: (c='#fff', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={c} stroke={c} strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  album: (c='#fff', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke={c} strokeWidth="1.7"/><circle cx="9" cy="9" r="1.5" fill={c}/><path d="M3 16l5-5 5 5 3-3 5 5" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/></svg>,
  plus: (c='#fff', s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2.5" strokeLinecap="round"/></svg>,
  minus: (c='#fff', s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke={c} strokeWidth="2.5" strokeLinecap="round"/></svg>,
  cart: (c='#000', s=20) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M3 5h2l2.5 11a2 2 0 002 1.5h7a2 2 0 002-1.5L20 8H6" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.3" fill={c}/><circle cx="17" cy="20" r="1.3" fill={c}/></svg>,
  users: (c='#000', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke={c} strokeWidth="1.7"/><path d="M3 19c0-3 3-5 6-5s6 2 6 5" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><circle cx="17" cy="9" r="2.5" stroke={c} strokeWidth="1.7"/><path d="M16 14c2.5 0 5 1.5 5 4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>,
  share: (c='#000', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 3v12M12 3l-4 4M12 3l4 4M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  globe: (c='#fff', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke={c} strokeWidth="1.7"/></svg>,
  check: (c='#fff', s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  sparkle: (c='#fff', s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" fill={c}/></svg>,
  search: (c='#999', s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6" stroke={c} strokeWidth="1.7"/><path d="M16 16l4 4" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>,
  scan: (c='#fff', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M4 9V6a2 2 0 012-2h3M20 9V6a2 2 0 00-2-2h-3M4 15v3a2 2 0 002 2h3M20 15v3a2 2 0 01-2 2h-3" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><path d="M3 12h18" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>,
  history: (c='#000', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 7v5l3 2" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/></svg>,
  dot: (c='#000', s=4) => <svg width={s} height={s} viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={c}/></svg>,
  close: (c='#000', s=16) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
  gear: (c='#000', s=18) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>,
  clock: (c='#000', s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.7"/><path d="M12 7v5l3 2" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>,
  heart: (c='#000', s=14, fill=false) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.5-7-10a4 4 0 017-2.7A4 4 0 0119 10c0 5.5-7 10-7 10z" stroke={c} strokeWidth="1.7" fill={fill ? c : 'none'} strokeLinejoin="round"/></svg>,
  alert: (c='#000', s=14) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M12 4l10 17H2L12 4z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/><path d="M12 11v4M12 18v.5" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>,
};

// Dish illustration — uses a 2-color radial gradient bowl + steam,
// keyed off the dish's swatch palette.  Gives every card a unique-feeling
// visual without needing real photos.
function DishArt({ dish, w = 120, h = 120, rounded = 14 }) {
  const [light, dark] = dish.swatch;
  return (
    <div style={{
      width: w, height: h, borderRadius: rounded, overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      background: `radial-gradient(circle at 35% 30%, ${light} 0%, ${dark} 90%)`,
    }}>
      {/* steam wisps */}
      <svg width={w} height={h} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <path d="M30 25 Q35 15 30 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M50 22 Q45 12 50 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M70 25 Q75 15 70 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
      {/* bowl rim */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: w * 0.7, height: w * 0.7, borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, ${light}, ${dark})`,
        boxShadow: `inset 0 -${w*0.06}px ${w*0.1}px rgba(0,0,0,0.25), 0 ${w*0.04}px ${w*0.08}px rgba(0,0,0,0.15)`,
      }} />
      {/* tiny garnish dot */}
      <div style={{
        position: 'absolute', left: '52%', top: '48%',
        width: 6, height: 6, borderRadius: '50%',
        background: '#fff', opacity: 0.7,
      }} />
    </div>
  );
}

window.Ico = Ico;
window.DishArt = DishArt;
