import { useState } from 'react';
import C from '../theme.js';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';

function Toggle({ on, onChange }) {
  return (
    <button onClick={() => onChange(!on)} style={{ width: 44, height: 26, borderRadius: 13, background: on ? C.green : '#E5E5EA', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 20 : 2, width: 22, height: 22, borderRadius: 11, background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.15)', transition: 'left .2s' }} />
    </button>
  );
}

function Section({ title, children }) {
  return (
    <>
      <div style={{ padding: '18px 20px 6px', fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>{title}</div>
      <div style={{ background: '#fff', margin: '0 16px', borderRadius: 14, overflow: 'hidden' }}>{children}</div>
    </>
  );
}

function Row({ label, value, toggle, on, onChange, first }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', minHeight: 44, borderTop: first ? 'none' : `0.5px solid ${C.line}` }}>
      <div style={{ flex: 1, fontSize: 14, color: C.ink }}>{label}</div>
      {toggle ? (
        <Toggle on={on} onChange={onChange} />
      ) : (
        <>
          <div style={{ fontSize: 13, color: C.muted, marginRight: 4 }}>{value}</div>
          <div style={{ fontSize: 16, color: C.muted2 }}>›</div>
        </>
      )}
    </div>
  );
}

export default function Settings() {
  const [t, setT] = useState({ showOrig: true, autoAlert: true, calories: false, autoScan: true, haptic: true });
  const toggle = k => setT(prev => ({ ...prev, [k]: !prev[k] }));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg2, overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="设置" />
      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, overflowY: 'auto' }}>
        <Section title="语言与翻译">
          <Row first label="原始语言" value="日语 (自动)" />
          <Row label="翻译为" value="简体中文" />
          <Row label="同时显示原文" toggle on={t.showOrig} onChange={() => toggle('showOrig')} />
        </Section>
        <Section title="忌口与偏好">
          <Row first label="忌口设置" value="海鲜 · 辣" />
          <Row label="自动标红风险菜品" toggle on={t.autoAlert} onChange={() => toggle('autoAlert')} />
          <Row label="显示卡路里估算" toggle on={t.calories} onChange={() => toggle('calories')} />
        </Section>
        <Section title="通用">
          <Row first label="按金额排序时显示" value="日元 · 人民币" />
          <Row label="拍照后自动识别" toggle on={t.autoScan} onChange={() => toggle('autoScan')} />
          <Row label="震动反馈" toggle on={t.haptic} onChange={() => toggle('haptic')} />
        </Section>
        <Section title="关于">
          <Row first label="版本" value="1.2.0" />
          <Row label="服务协议" />
          <Row label="隐私政策" />
        </Section>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
