import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import StatusBar from '../components/StatusBar.jsx';

export default function RoomQR() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <StatusBar />
      {/* dimmed bg */}
      <div onClick={() => navigate(-1)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)' }} />

      {/* sheet */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '24px 24px 0 0', padding: '12px 24px 32px' }}>
        <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 18px' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>邀请朋友加入</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>扫码即可看到同一份菜单</div>
        </div>

        {/* QR placeholder */}
        <div style={{ width: 200, height: 200, margin: '24px auto 0', background: '#fff', border: `1px solid ${C.line}`, borderRadius: 14, padding: 14, position: 'relative' }}>
          <div style={{ width: '100%', height: '100%', background: `repeating-linear-gradient(0deg, transparent, transparent 8px, ${C.line} 8px, ${C.line} 9px), repeating-linear-gradient(90deg, transparent, transparent 8px, ${C.line} 8px, ${C.line} 9px)`, borderRadius: 4, position: 'relative' }}>
            {/* QR corners */}
            {[[0,0,0,'auto'],[0,'auto',0,0],['auto',0,0,'auto']].map(([t,r,b,l], i) => (
              <div key={i} style={{ position: 'absolute', top: t, right: r, bottom: b, left: l, width: 36, height: 36, border: `4px solid ${C.ink}`, borderRadius: 4, background: '#fff' }}>
                <div style={{ width: 12, height: 12, background: C.ink, margin: '8px auto', borderRadius: 1 }} />
              </div>
            ))}
            {/* center logo */}
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 36, height: 36, borderRadius: 10, background: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, boxShadow: `0 0 0 4px #fff` }}>看</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2 }}>ROOM CODE</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.ink, fontFamily: '"SF Mono", "Courier New", monospace', letterSpacing: 6, marginTop: 2 }}>73KQ</div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
          <button style={{ flex: 1, height: 44, borderRadius: 22, background: C.bg2, color: C.ink, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {Ico.share(C.ink, 14)} 微信分享
          </button>
          <button style={{ flex: 1, height: 44, borderRadius: 22, background: C.ink, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>保存图片</button>
        </div>
      </div>
    </div>
  );
}
