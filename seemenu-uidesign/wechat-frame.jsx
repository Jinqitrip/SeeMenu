// WeChat Mini-Program frame — iPhone shell with iOS status bar + WeChat capsule button.
// Internally everything below the capsule is the page surface.

function WStatusBar({ dark = false, time = '9:41' }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', paddingTop: 18,
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 600, fontSize: 16, color: c, zIndex: 30,
      pointerEvents: 'none',
    }}>
      <div>{time}</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.5" fill={c}/>
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" fill={c}/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill={c}/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.5" fill={c}/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11">
          <path d="M7.5 3C9.5 3 11.3 3.8 12.6 5L13.6 4C12 2.4 9.9 1.4 7.5 1.4C5.1 1.4 3 2.4 1.4 4L2.4 5C3.7 3.8 5.5 3 7.5 3Z" fill={c}/>
          <path d="M7.5 6C8.7 6 9.7 6.4 10.5 7.2L11.5 6.2C10.4 5.1 9 4.4 7.5 4.4C6 4.4 4.6 5.1 3.5 6.2L4.5 7.2C5.3 6.4 6.3 6 7.5 6Z" fill={c}/>
          <circle cx="7.5" cy="9.3" r="1.3" fill={c}/>
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke={c} strokeOpacity="0.4" fill="none"/>
          <rect x="2" y="2" width="17" height="7" rx="1.5" fill={c}/>
          <path d="M22 4v3c.6-.2 1-.7 1-1.5S22.6 4.2 22 4z" fill={c} fillOpacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

// WeChat capsule button: ··· and ⊘
function WCapsule({ dark = false }) {
  const stroke = dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)';
  const bg = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)';
  const border = dark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)';
  return (
    <div style={{
      position: 'absolute', top: 60, right: 14, zIndex: 30,
      width: 87, height: 32, borderRadius: 16,
      background: bg, border: `0.5px solid ${border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
    }}>
      <svg width="20" height="6" viewBox="0 0 20 6">
        <circle cx="3" cy="3" r="1.5" fill={stroke}/>
        <circle cx="10" cy="3" r="1.5" fill={stroke}/>
        <circle cx="17" cy="3" r="1.5" fill={stroke}/>
      </svg>
      <div style={{ width: 0.5, height: 14, background: border }} />
      <svg width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="6" fill="none" stroke={stroke} strokeWidth="1.2"/>
        <path d="M3 7h8" stroke={stroke} strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// The full phone — used as the contents of a DCArtboard.
function WPhone({ children, width = 320, height = 692, dark = false, time = '9:41', bg = '#fff', noCapsule = false, statusDark = null, label }) {
  const sd = statusDark === null ? dark : statusDark;
  return (
    <div style={{
      width, height, borderRadius: 0, overflow: 'hidden',
      position: 'relative', background: bg,
      fontFamily: '"PingFang SC", -apple-system, "Hiragino Sans", "Helvetica Neue", system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      <WStatusBar dark={sd} time={time} />
      {!noCapsule && <WCapsule dark={sd} />}
      <div style={{ position: 'absolute', inset: 0, paddingTop: 0, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

window.WPhone = WPhone;
window.WStatusBar = WStatusBar;
window.WCapsule = WCapsule;
