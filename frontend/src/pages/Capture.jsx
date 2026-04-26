import { useRef } from 'react';
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

export default function Capture() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { setCapturedPhoto } = useApp();

  const handleShutter = () => {
    setCapturedPhoto(null);
    navigate('/photo-review');
  };

  const handleAlbum = () => fileRef.current?.click();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCapturedPhoto(url);
      navigate('/photo-review');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
      <StatusBar dark />
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />

      {/* simulated menu in background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #1a1108 0%, #2a1a0c 100%)',
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%) rotate(-2deg)',
          width: 290, height: 380, background: '#f0e4c8',
          padding: '24px 22px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          fontFamily: '"Hiragino Mincho ProN", serif',
          borderRadius: 2,
        }}>
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#2a1a08', letterSpacing: 3 }}>麺処 つばき</div>
          <div style={{ height: 1.5, background: '#2a1a08', margin: '14px 30px' }} />
          {MENU_ITEMS.map(([n, p], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#2a1a08', padding: '6px 0' }}>
              <span>{n}</span><span style={{ fontFamily: 'monospace' }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* viewfinder overlay */}
      <div style={{ position: 'absolute', top: 100, left: 22, right: 22, bottom: 200, boxShadow: '0 0 0 999px rgba(0,0,0,0.55)', borderRadius: 16 }} />
      {[{t:100,l:22},{t:100,r:22},{b:200,l:22},{b:200,r:22}].map((p,i) => (
        <div key={i} style={{
          position: 'absolute',
          top: p.t !== undefined ? p.t : 'auto',
          bottom: p.b !== undefined ? p.b : 'auto',
          left: p.l !== undefined ? p.l : 'auto',
          right: p.r !== undefined ? p.r : 'auto',
          width: 24, height: 24,
          borderTop: i < 2 ? '2.5px solid #fff' : 'none',
          borderBottom: i >= 2 ? '2.5px solid #fff' : 'none',
          borderLeft: i % 2 === 0 ? '2.5px solid #fff' : 'none',
          borderRight: i % 2 === 1 ? '2.5px solid #fff' : 'none',
          borderTopLeftRadius: i === 0 ? 4 : 0,
          borderTopRightRadius: i === 1 ? 4 : 0,
          borderBottomLeftRadius: i === 2 ? 4 : 0,
          borderBottomRightRadius: i === 3 ? 4 : 0,
        }} />
      ))}

      <div style={{
        position: 'absolute', top: 116, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)',
        padding: '6px 14px', borderRadius: 999,
        fontSize: 11, color: C.ink, fontWeight: 500, whiteSpace: 'nowrap',
      }}>
        将菜单完整放入框内
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.9) 60%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 30,
      }}>
        <div style={{ display: 'flex', gap: 22, fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
          <span>相册</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>· 菜单 ·</span>
          <span>扫码</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50 }}>
          <button onClick={handleAlbum} style={{
            width: 40, height: 40, borderRadius: 8,
            background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Ico.album('#fff', 18)}
          </button>
          <button onClick={handleShutter} style={{
            width: 72, height: 72, borderRadius: 36,
            border: '3px solid #fff', padding: 4, background: 'transparent', cursor: 'pointer',
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff' }} />
          </button>
          <button style={{
            width: 40, height: 40, borderRadius: 8,
            background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {Ico.flash('#fff', 16)}
          </button>
        </div>
      </div>
    </div>
  );
}
