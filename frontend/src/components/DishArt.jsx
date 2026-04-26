export default function DishArt({ dish, w = 120, h = 120, rounded = 14 }) {
  const [light, dark] = dish.swatch;
  return (
    <div style={{
      width: w, height: h, borderRadius: rounded, overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      background: `radial-gradient(circle at 35% 30%, ${light} 0%, ${dark} 90%)`,
    }}>
      <svg width={w} height={h} viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, opacity: 0.35 }}>
        <path d="M30 25 Q35 15 30 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M50 22 Q45 12 50 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M70 25 Q75 15 70 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: w * 0.7, height: w * 0.7, borderRadius: '50%',
        background: `radial-gradient(circle at 40% 35%, ${light}, ${dark})`,
        boxShadow: `inset 0 -${w * 0.06}px ${w * 0.1}px rgba(0,0,0,0.25), 0 ${w * 0.04}px ${w * 0.08}px rgba(0,0,0,0.15)`,
      }} />
      <div style={{
        position: 'absolute', left: '52%', top: '48%',
        width: 6, height: 6, borderRadius: '50%',
        background: '#fff', opacity: 0.7,
      }} />
    </div>
  );
}
