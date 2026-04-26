import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { HISTORY } from '../data.js';

export default function History() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg2, overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="历史菜单" right={
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 13, color: C.accent, fontWeight: 500 }}>筛选</button>
      } />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, bottom: 0, overflowY: 'auto' }}>
        {HISTORY.map((group, gi) => (
          <div key={gi}>
            <div style={{ padding: '14px 20px 6px', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>{group.day}</div>
            <div style={{ background: '#fff', margin: '0 16px', borderRadius: 14, overflow: 'hidden' }}>
              {group.list.map((it, i) => (
                <button key={i} onClick={() => navigate('/menu')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderTop: i ? `0.5px solid ${C.line}` : 'none', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{it.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.name}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{it.city}</span>
                      <span style={{ width: 2, height: 2, borderRadius: 1, background: C.muted2 }} />
                      <span>点了 {it.dishes} 道</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted2 }}>{it.time}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
