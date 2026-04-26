import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { useApp } from '../context/AppContext.jsx';

const MENU_ITEMS = [
  ['豚骨ラーメン','¥1,180'],['醤油ラーメン','¥1,080'],['味噌ラーメン','¥1,180'],
  ['つけ麺','¥1,280'],['焼き餃子','¥580'],['鶏の唐揚げ','¥780'],
  ['枝豆','¥380'],['チャーシュー丼','¥880'],['味付け玉子','¥180'],
];

export default function PhotoReview() {
  const navigate = useNavigate();
  const { capturedPhoto } = useApp();

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#0a0805', overflow: 'hidden' }}>
      <StatusBar dark />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #1a1108 0%, #2a1a0c 100%)' }}>
        {capturedPhoto ? (
          <img src={capturedPhoto} alt="captured" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
        ) : (
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 280, height: 380, background: '#f0e4c8',
            padding: '24px 22px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            fontFamily: '"Hiragino Mincho ProN", serif',
            borderRadius: 4,
          }}>
            <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, color: '#2a1a08', letterSpacing: 3 }}>麺処 つばき</div>
            <div style={{ height: 1.5, background: '#2a1a08', margin: '14px 30px' }} />
            {MENU_ITEMS.map(([n, p], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#2a1a08', padding: '5px 0' }}>
                <span>{n}</span><span style={{ fontFamily: 'monospace' }}>{p}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* top bar */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 10, zIndex: 5,
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: 32, height: 32, borderRadius: 16,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Ico.back('#fff', 16)}
        </button>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#fff', textAlign: 'center' }}>预览</div>
        <button onClick={() => navigate('/capture')} style={{
          width: 32, height: 32, borderRadius: 16,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
          border: 'none', cursor: 'pointer',
          fontSize: 11, color: '#fff',
        }}>重拍</button>
      </div>

      <div style={{
        position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)', padding: '8px 14px', borderRadius: 999,
        fontSize: 12, color: C.ink, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 6, zIndex: 5, whiteSpace: 'nowrap',
      }}>
        ✓ 已拍清晰
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.85) 50%)',
        padding: '0 20px 36px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10,
      }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
          确认无误后开始 AI 识别（约需 5–10 秒）
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/capture')} style={{
            flex: 1, height: 48,
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(20px)',
            borderRadius: 24, color: '#fff', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 600,
          }}>重拍</button>
          <button onClick={() => navigate('/recognizing')} style={{
            flex: 2, height: 48,
            background: C.accent, borderRadius: 24,
            color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, fontSize: 14, fontWeight: 600,
          }}>
            {Ico.sparkle('#fff', 16)} 开始识别
          </button>
        </div>
      </div>
    </div>
  );
}
