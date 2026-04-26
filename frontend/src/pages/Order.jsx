import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { useApp } from '../context/AppContext.jsx';
import { MENU_BY_ID, FINAL_ORDER } from '../data.js';

export default function Order() {
  const navigate = useNavigate();
  const { cartLines, cartTotal } = useApp();

  const lines = cartLines.length > 0
    ? cartLines.map(l => ({ id: l.id, qty: l.qty, note: l.note, by: ['我'] }))
    : FINAL_ORDER;

  const subtotal = lines.reduce((sum, l) => {
    const d = MENU_BY_ID[l.id];
    return d ? sum + parseInt(d.price.replace(/[^\d]/g, '')) * l.qty : sum;
  }, 0);
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg2, overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="出示给服务员" right={
        <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
          {Ico.globe(C.accent, 12)} 中↔日
        </div>
      } />

      {/* receipt card */}
      <div style={{ position: 'absolute', top: 116, left: 16, right: 16, bottom: 80, background: '#fff', borderRadius: 16, boxShadow: '0 8px 30px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 14px', textAlign: 'center', borderBottom: `1px dashed ${C.line}` }}>
          <div style={{ fontFamily: '"Hiragino Mincho ProN", serif', fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: 4 }}>ご注文</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 4, letterSpacing: 1 }}>ORDER · 订单</div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.muted, fontFamily: 'monospace' }}>
            <span>2026.04.26 12:34</span>
            <span>3名様 · {lines.reduce((s,l)=>s+l.qty,0)}品</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: '4px 20px', overflowY: 'auto' }}>
          {lines.map((line, i) => {
            const d = MENU_BY_ID[line.id];
            if (!d) return null;
            const lt = parseInt(d.price.replace(/[^\d]/g, '')) * line.qty;
            return (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < lines.length - 1 ? `1px dotted ${C.line}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: '"Hiragino Mincho ProN", serif', fontSize: 14, fontWeight: 600, color: C.ink }}>
                      {d.jp}
                      <span style={{ fontFamily: 'monospace', color: C.accent, marginLeft: 6, fontSize: 12 }}>×{line.qty}</span>
                    </div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{d.cn}</div>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: C.ink }}>¥{lt.toLocaleString()}</div>
                </div>
                {line.note && (
                  <div style={{ marginTop: 4, fontSize: 10, color: C.accent, background: C.accentSoft, padding: '2px 8px', borderRadius: 3, display: 'inline-block', fontFamily: '"Hiragino Mincho ProN", serif' }}>
                    ※ {line.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ borderTop: `1.5px solid ${C.ink}`, padding: '12px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.muted, marginBottom: 4, fontFamily: 'monospace' }}>
            <span>小計 SUBTOTAL</span><span>¥{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.muted, marginBottom: 8, fontFamily: 'monospace' }}>
            <span>消費税 10%</span><span>¥{tax.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 8, borderTop: `0.5px solid ${C.line}` }}>
            <div style={{ fontFamily: '"Hiragino Mincho ProN", serif', fontSize: 15, fontWeight: 700, color: C.ink, letterSpacing: 2 }}>合計</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.ink, fontFamily: 'monospace' }}>¥{total.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 10, color: C.muted, marginTop: 2 }}>约 ¥{Math.round(total / 20)}</div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16, display: 'flex', gap: 10 }}>
        <button onClick={() => navigate('/order/show')} style={{ flex: 1, height: 44, background: C.ink, color: '#fff', borderRadius: 22, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>放大出示给店员</button>
      </div>
      <div style={{ position: 'absolute', bottom: 5, left: 0, right: 0, textAlign: 'center', fontSize: 10, color: C.muted, letterSpacing: 1 }}>把屏幕递给店员，全程不用开口</div>
    </div>
  );
}
