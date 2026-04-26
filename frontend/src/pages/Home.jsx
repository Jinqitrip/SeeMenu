import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import StatusBar from '../components/StatusBar.jsx';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: C.bg }}>
      <StatusBar />

      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', padding: '100px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 26, height: 26, borderRadius: 7, background: C.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>看</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>SeeMenu</div>
          <div style={{ fontSize: 11, color: C.muted, marginLeft: 4 }}>智拍菜单</div>
        </div>

        <div style={{ marginTop: 58 }}>
          <div style={{ fontSize: 30, lineHeight: '38px', fontWeight: 700, color: C.ink, letterSpacing: -0.6 }}>
            看懂任何<br/>外文菜单。
          </div>
          <div style={{ marginTop: 10, fontSize: 13, lineHeight: '20px', color: C.muted, maxWidth: 240 }}>
            拍一张照，AI 帮你翻译、配图、点单 —— 出国吃饭再也不用瞎指。
          </div>
        </div>

        <div style={{ marginTop: 38, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { num: '①', t: '拍照识别', s: '对准菜单，自动框出每道菜', icon: Ico.camera(C.ink, 18) },
            { num: '②', t: '看图选菜', s: 'AI 配图 + 翻译 + 介绍',   icon: Ico.sparkle(C.ink, 16) },
            { num: '③', t: '一键出示', s: '生成本地语言订单给服务员', icon: Ico.globe(C.ink, 16) },
          ].map((it, i) => (
            <div key={i} style={{
              background: C.bg2, borderRadius: 14, padding: '14px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12, background: '#fff',
                border: `0.5px solid ${C.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{it.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{it.t}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{it.s}</div>
              </div>
              <div style={{ fontSize: 12, color: C.muted2, fontWeight: 600 }}>{it.num}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
        <button onClick={() => navigate('/capture')} style={{
          width: '100%', background: C.ink, color: '#fff',
          height: 52, borderRadius: 26, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, fontSize: 15, fontWeight: 600,
        }}>
          {Ico.camera('#fff', 20)} 拍菜单
        </button>
        <button onClick={() => navigate('/join-room')} style={{
          width: '100%', marginTop: 12, background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'center', fontSize: 12, color: C.muted,
        }}>
          已加入朋友的菜单？<span style={{ color: C.accent, fontWeight: 600 }}>输入房间码</span>
        </button>
      </div>

      {/* bottom tab bar */}
      <div style={{
        flexShrink: 0, height: 83, background: 'rgba(255,255,255,0.95)',
        borderTop: `0.5px solid ${C.line}`,
        backdropFilter: 'blur(20px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
        paddingTop: 10,
      }}>
        {[
          { label: '首页', icon: Ico.camera(C.accent, 22), active: true, path: '/' },
          { label: '历史', icon: Ico.clock(C.muted, 22), active: false, path: '/history' },
          { label: '我的', icon: Ico.heart(C.muted, 22), active: false, path: '/profile' },
        ].map((tab, i) => (
          <button key={i} onClick={() => navigate(tab.path)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '0 16px',
          }}>
            {tab.icon}
            <span style={{ fontSize: 10, color: tab.active ? C.accent : C.muted }}>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
