import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';

export default function RecognizeFail() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg, overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="识别中" />
      <div style={{
        position: 'absolute', top: 130, left: 0, right: 0, bottom: 100,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 32px',
      }}>
        <div style={{ width: 88, height: 88, borderRadius: 44, background: C.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke={C.muted} strokeWidth="2"/>
            <path d="M20 12v10M20 26v2" stroke={C.muted} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: 6 }}>没能识别这张菜单</div>
        <div style={{ fontSize: 13, lineHeight: '20px', color: C.muted, textAlign: 'center' }}>
          照片可能模糊、反光或角度倾斜<br/>
          试试重新拍一张，把菜单铺平、光线充足
        </div>
        <div style={{ width: '100%', marginTop: 24, background: C.bg2, borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.ink, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>拍照小提示</div>
          {['把菜单整体放进取景框','保持手机平稳，避免抖动','尽量正面拍摄，不要倾斜','光线充足、避免反光'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: 12, color: C.ink2 }}>
              <span style={{ color: C.accent, fontWeight: 700 }}>·</span><span>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 20px 28px', background: '#fff', borderTop: `0.5px solid ${C.line}`, display: 'flex', gap: 10 }}>
        <button onClick={() => navigate('/capture')} style={{ flex: 1, height: 48, borderRadius: 24, border: `1px solid ${C.line}`, background: '#fff', fontSize: 14, fontWeight: 600, color: C.ink, cursor: 'pointer' }}>从相册选</button>
        <button onClick={() => navigate('/capture')} style={{ flex: 1, height: 48, borderRadius: 24, background: C.ink, color: '#fff', border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>重新拍</button>
      </div>
    </div>
  );
}
