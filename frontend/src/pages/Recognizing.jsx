import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';

const ALL_ITEMS = [
  { jp: '豚骨ラーメン', cn: '豚骨拉面', state: 'pending' },
  { jp: '醤油ラーメン', cn: '酱油拉面', state: 'pending' },
  { jp: '焼き餃子',     cn: '煎饺',     state: 'pending' },
  { jp: '鶏の唐揚げ',   cn: '日式炸鸡', state: 'pending' },
  { jp: '枝豆',         cn: null,        state: 'pending' },
  { jp: 'チャーシュー丼', cn: null,      state: 'pending' },
  { jp: '味付け玉子',   cn: null,        state: 'pending' },
];

const STEPS = ['识别', '翻译', '配图', '整理'];

export default function Recognizing() {
  const navigate = useNavigate();
  const [items, setItems] = useState(ALL_ITEMS);
  const [doneCount, setDoneCount] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    let idx = 0;
    const tid = setInterval(() => {
      if (idx >= ALL_ITEMS.length) {
        clearInterval(tid);
        setTimeout(() => navigate('/menu'), 600);
        return;
      }
      setItems(prev => {
        const next = [...prev];
        if (idx > 0) next[idx - 1] = { ...next[idx - 1], state: 'done' };
        if (idx < next.length) next[idx] = { ...next[idx], state: 'active' };
        return next;
      });
      setDoneCount(idx);
      setStepIdx(Math.min(Math.floor(idx / 2), STEPS.length - 1));
      idx++;
    }, 500);
    return () => clearInterval(tid);
  }, [navigate]);

  const progress = Math.round((doneCount / ALL_ITEMS.length) * 100);
  const progressDeg = Math.round((doneCount / ALL_ITEMS.length) * 360);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg, overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="识别中" sub="保持手机稳定" back={false} />

      <div style={{ position: 'absolute', top: 110, left: 20, right: 20, bottom: 220 }}>
        <div style={{ width: '100%', height: '100%', background: C.bg2, borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ background: '#f0e4c8', borderRadius: 6, height: '100%', padding: '16px 14px', fontFamily: '"Hiragino Mincho ProN", serif', position: 'relative' }}>
            <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#2a1a08', letterSpacing: 2 }}>麺処 つばき</div>
            <div style={{ height: 1, background: '#2a1a08', margin: '8px 24px' }} />
            {items.map((it, i) => (
              <div key={i} style={{ position: 'relative', padding: '5px 0', fontSize: 11, color: '#2a1a08', opacity: it.state === 'pending' ? 0.4 : 1 }}>
                <span>{it.jp}</span>
                {it.cn && it.state === 'done' && (
                  <div style={{
                    position: 'absolute', right: -4, top: 3,
                    fontSize: 9, fontFamily: '"PingFang SC", sans-serif',
                    background: C.accent, color: '#fff',
                    padding: '1px 6px', borderRadius: 3, fontWeight: 600,
                  }}>{it.cn}</div>
                )}
                {it.state === 'active' && (
                  <div style={{
                    position: 'absolute', right: -4, top: 3,
                    fontSize: 9, fontFamily: '"PingFang SC", sans-serif',
                    background: '#fff', color: C.muted,
                    border: `0.5px dashed ${C.muted2}`,
                    padding: '1px 6px', borderRadius: 3,
                  }}>翻译中…</div>
                )}
              </div>
            ))}
            {/* scan beam */}
            <div style={{
              position: 'absolute', left: 14, right: 14,
              top: 40 + doneCount * 21,
              height: 1.5,
              background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
              boxShadow: `0 0 6px ${C.accent}`,
              transition: 'top 0.5s ease',
            }} />
          </div>
        </div>
      </div>

      {/* progress sheet */}
      <div style={{
        position: 'absolute', bottom: 36, left: 16, right: 16,
        background: '#fff', border: `0.5px solid ${C.line}`,
        borderRadius: 18, padding: '16px 18px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 16,
            background: `conic-gradient(${C.accent} 0deg ${progressDeg}deg, ${C.bg3} ${progressDeg}deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 13, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: C.ink,
            }}>{progress}%</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>识别 {doneCount} / {ALL_ITEMS.length} 道菜</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>预计还需 {ALL_ITEMS.length - doneCount} 秒</div>
          </div>
          {Ico.sparkle(C.accent, 16)}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
          {STEPS.map((s, i) => {
            const state = i < stepIdx ? 'done' : i === stepIdx ? 'active' : 'pending';
            return (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 2, background: state === 'done' ? C.ink : state === 'active' ? C.accent : C.line, marginBottom: 5 }} />
                <div style={{ fontSize: 10, color: state === 'pending' ? C.muted : C.ink, fontWeight: state === 'active' ? 700 : 500 }}>{s}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
