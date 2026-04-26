import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import StatusBar from '../components/StatusBar.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const menuItems = [
    ['history', '历史菜单', '最近 7 天有 3 份', '/history'],
    ['heart',   '收藏夹',   '23 道菜',           '/history'],
    ['lang',    '语言与翻译', '日语 → 中文',    '/settings'],
    ['diet',    '忌口与偏好', '海鲜过敏 · 不吃辣', '/settings'],
  ];
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg2, overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ position: 'absolute', top: 54, left: 16, fontSize: 16, fontWeight: 700, color: C.ink, zIndex: 5 }}>我的</div>
      <button onClick={() => navigate('/settings')} style={{ position: 'absolute', top: 56, right: 16, background: 'transparent', border: 'none', cursor: 'pointer', zIndex: 5 }}>{Ico.gear(C.ink, 18)}</button>

      {/* user card */}
      <div style={{ position: 'absolute', top: 100, left: 16, right: 16, background: '#fff', borderRadius: 16, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 28, background: `linear-gradient(135deg, ${C.accent}, #FF8C42)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, color: '#fff' }}>李</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: C.ink }}>李明</div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>已识别 8 份菜单 · 旅日 12 天</div>
        </div>
        <div style={{ fontSize: 16, color: C.muted2 }}>›</div>
      </div>

      {/* stats */}
      <div style={{ position: 'absolute', top: 196, left: 16, right: 16, background: '#fff', borderRadius: 16, padding: '16px 0', display: 'flex' }}>
        {[['8','识别次数'],['23','收藏菜品'],['5','加入房间']].map(([n, l], i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', borderRight: i < 2 ? `0.5px solid ${C.line}` : 'none' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.ink }}>{n}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* menu list */}
      <div style={{ position: 'absolute', top: 296, left: 16, right: 16, background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
        {menuItems.map(([k, t, sub, path], i) => (
          <button key={i} onClick={() => navigate(path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? `0.5px solid ${C.line}` : 'none', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: C.bg2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {k === 'history' && Ico.clock(C.ink, 14)}
              {k === 'heart'   && Ico.heart(C.ink, 14)}
              {k === 'lang'    && Ico.globe(C.ink, 14)}
              {k === 'diet'    && Ico.alert(C.ink, 14)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: C.ink }}>{t}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{sub}</div>
            </div>
            <div style={{ fontSize: 16, color: C.muted2 }}>›</div>
          </button>
        ))}
      </div>

      {/* second list */}
      <div style={{ position: 'absolute', top: 540, left: 16, right: 16, background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
        {[['使用帮助'],['意见反馈']].map(([t], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderTop: i ? `0.5px solid ${C.line}` : 'none' }}>
            <div style={{ flex: 1, fontSize: 14, color: C.ink }}>{t}</div>
            <div style={{ fontSize: 16, color: C.muted2 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}
