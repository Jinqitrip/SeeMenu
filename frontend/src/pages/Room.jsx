import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { ROOM_MEMBERS, MENU_BY_ID } from '../data.js';

export default function Room() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="用餐房间" sub="麺処 つばき" right={
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>{Ico.share(C.ink, 16)}</button>
      } />

      {/* room code card */}
      <div style={{ position: 'absolute', top: 116, left: 16, right: 16, background: C.ink, borderRadius: 18, padding: '22px 22px 18px' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 2 }}>ROOM CODE</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: '#fff', fontFamily: '"SF Mono", "Courier New", monospace', letterSpacing: 8, marginTop: 4 }}>73KQ</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>朋友打开 SeeMenu 输入此码即可加入</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button style={{ flex: 1, padding: '8px 0', borderRadius: 10, background: 'rgba(255,255,255,0.12)', fontSize: 12, color: '#fff', textAlign: 'center', fontWeight: 600, border: 'none', cursor: 'pointer' }}>分享</button>
          <button onClick={() => navigate('/room/qr')} style={{ flex: 1, padding: '8px 0', borderRadius: 10, background: '#fff', color: C.ink, fontSize: 12, textAlign: 'center', fontWeight: 600, border: 'none', cursor: 'pointer' }}>显示二维码</button>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 300, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>房间内 · {ROOM_MEMBERS.length} 人</div>
        <div style={{ fontSize: 11, color: C.green, display: 'flex', alignItems: 'center', gap: 4 }}>● 实时同步</div>
      </div>

      <div style={{ position: 'absolute', top: 330, bottom: 90, left: 0, right: 0, overflowY: 'auto', padding: '0 20px' }}>
        {ROOM_MEMBERS.map((m, i) => (
          <div key={i} style={{ padding: '12px 0', borderBottom: i < ROOM_MEMBERS.length - 1 ? `0.5px solid ${C.line}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: 15, background: m.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{m.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>
                {m.name}{m.id === 'me' && <span style={{ fontSize: 10, color: C.muted, marginLeft: 6, fontWeight: 400 }}>· 你</span>}
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 11, color: C.muted }}>{m.picks.length} 道</div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingLeft: 40 }}>
              {m.picks.map(pid => (
                <div key={pid} style={{ fontSize: 11, color: C.ink2, background: C.bg2, padding: '3px 9px', borderRadius: 5 }}>{MENU_BY_ID[pid].cn}</div>
              ))}
              {m.note && <div style={{ fontSize: 10, color: C.accent, padding: '3px 0' }}>※ {m.note}</div>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 28px', background: '#fff', borderTop: `0.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: C.muted }}>合计 8 份</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>¥6,640</div>
        </div>
        <button onClick={() => navigate('/order')} style={{ marginLeft: 'auto', background: C.ink, color: '#fff', padding: '14px 22px', borderRadius: 26, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>生成订单 →</button>
      </div>
    </div>
  );
}
