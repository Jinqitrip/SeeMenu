import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';

const KEYS = [['1','2','3'],['4','5','6'],['7','8','9'],['','0','⌫']];

export default function JoinRoom() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleKey = (k) => {
    if (k === '⌫') setCode(c => c.slice(0, -1));
    else if (k === '') return;
    else if (code.length < 4) {
      const next = code + k;
      setCode(next);
      if (next.length === 4) {
        setTimeout(() => navigate('/menu'), 300);
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="加入房间" />

      <div style={{ position: 'absolute', top: 130, left: 24, right: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: C.ink, letterSpacing: -0.4 }}>输入房间码</div>
        <div style={{ fontSize: 13, color: C.muted, marginTop: 6, lineHeight: '20px' }}>请向已经在房间的朋友要 4 位房间码</div>

        <div style={{ display: 'flex', gap: 10, marginTop: 32, justifyContent: 'center' }}>
          {[0,1,2,3].map(i => {
            const char = code[i] || '';
            const isCurrent = i === code.length;
            return (
              <div key={i} style={{
                width: 56, height: 64, borderRadius: 12,
                background: char ? '#fff' : C.bg2,
                border: `1.5px solid ${isCurrent ? C.accent : (char ? C.line : 'transparent')}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, color: C.ink,
                fontFamily: '"SF Mono", "Courier New", monospace',
                position: 'relative',
              }}>
                {char}
                {isCurrent && <div style={{ position: 'absolute', width: 2, height: 26, background: C.accent }} />}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 28, padding: '14px 16px', background: C.bg2, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.scan(C.ink, 16)}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>扫描朋友的二维码</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>更快、不会输错</div>
          </div>
          <div style={{ fontSize: 16, color: C.muted2 }}>›</div>
        </div>
      </div>

      {/* numeric keypad */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: C.bg3, padding: '8px 0 24px' }}>
        {KEYS.map((row, ri) => (
          <div key={ri} style={{ display: 'flex' }}>
            {row.map((k, ki) => (
              <button key={ki} onClick={() => handleKey(k)} style={{
                flex: 1, height: 44, margin: 4,
                background: k === '' ? 'transparent' : '#fff',
                borderRadius: 8, border: 'none', cursor: k === '' ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: k === '⌫' ? 18 : 22, fontWeight: 500, color: C.ink,
              }}>{k}</button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
