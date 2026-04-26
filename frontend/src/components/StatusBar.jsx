export default function StatusBar({ dark = false }) {
  const color = dark ? '#fff' : '#000';
  const now = new Date();
  const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 20px 0',
      zIndex: 10,
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color }}>{time}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={color}><rect x="0" y="4" width="3" height="8" rx="1"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="1"/><rect x="9" y="1" width="3" height="11" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={color}><path d="M8 2.5A8.5 8.5 0 0115 5.5L16.5 4A10.5 10.5 0 008 1 10.5 10.5 0 00-.5 4L1 5.5A8.5 8.5 0 018 2.5z"/><path d="M8 5.5A5.5 5.5 0 0112 7L13.5 5.5A7.5 7.5 0 008 4a7.5 7.5 0 00-5.5 1.5L4 7A5.5 5.5 0 018 5.5z"/><circle cx="8" cy="10" r="1.5"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={color} strokeOpacity="0.35"/><rect x="2" y="2" width="16" height="8" rx="2" fill={color}/><path d="M23 4v4a2 2 0 000-4z" fill={color} fillOpacity="0.4"/></svg>
      </div>
    </div>
  );
}
