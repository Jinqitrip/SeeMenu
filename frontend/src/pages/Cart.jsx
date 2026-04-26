import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import DishArt from '../components/DishArt.jsx';
import CNav from '../components/CNav.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Cart() {
  const navigate = useNavigate();
  const { cartLines, addItem, removeItem, setNote, cartCount, cartTotal } = useApp();
  const [editingNote, setEditingNote] = useState(null);
  const [noteInput, setNoteInput] = useState('');

  if (cartLines.length === 0) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg }}>
        <StatusBar />
        <CNav title="我的选菜" sub="购物车为空" />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{ fontSize: 48 }}>🛒</div>
          <div style={{ fontSize: 16, color: C.muted }}>还没有选菜</div>
          <button onClick={() => navigate('/menu')} style={{ padding: '12px 28px', borderRadius: 24, background: C.ink, color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>去看菜单</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <StatusBar />
      <CNav title="我的选菜" sub={`${cartLines.length} 道 · ${cartCount} 份`} right={
        <div style={{ fontSize: 11, color: C.accent, fontWeight: 600 }}>房间 73KQ</div>
      } />

      <div style={{ position: 'absolute', top: 110, bottom: 110, left: 0, right: 0, overflowY: 'auto', padding: '0 20px' }}>
        {cartLines.map((l, i) => (
          <div key={l.id} style={{ padding: '14px 0', borderBottom: i < cartLines.length - 1 ? `0.5px solid ${C.line}` : 'none', display: 'flex', gap: 12 }}>
            <DishArt dish={l.dish} w={56} h={56} rounded={10} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{l.dish.cn}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 1, fontFamily: '"Hiragino Mincho ProN", serif' }}>{l.dish.jp}</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{l.dish.price}</div>
              </div>

              {editingNote === l.id ? (
                <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
                  <input autoFocus value={noteInput} onChange={e => setNoteInput(e.target.value)}
                    placeholder="备注忌口..." style={{ flex: 1, fontSize: 11, padding: '4px 8px', borderRadius: 4, border: `1px solid ${C.line}`, outline: 'none' }} />
                  <button onClick={() => { setNote(l.id, noteInput); setEditingNote(null); }} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 4, background: C.accent, color: '#fff', border: 'none', cursor: 'pointer' }}>确认</button>
                </div>
              ) : l.note ? (
                <button onClick={() => { setEditingNote(l.id); setNoteInput(l.note); }} style={{ marginTop: 6, fontSize: 11, color: C.accent, background: C.accentSoft, padding: '3px 8px', borderRadius: 4, border: 'none', cursor: 'pointer' }}>
                  📝 {l.note}
                </button>
              ) : (
                <button onClick={() => { setEditingNote(l.id); setNoteInput(''); }} style={{ marginTop: 6, fontSize: 11, color: C.muted, background: 'transparent', border: 'none', cursor: 'pointer' }}>
                  <span style={{ textDecoration: 'underline' }}>+ 添加备注</span>
                </button>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <button onClick={() => removeItem(l.id)} style={{ width: 22, height: 22, borderRadius: 11, border: `1px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.minus(C.ink, 12)}</button>
                <div style={{ fontSize: 13, fontWeight: 600, minWidth: 12, textAlign: 'center' }}>{l.qty}</div>
                <button onClick={() => addItem(l.id)} style={{ width: 22, height: 22, borderRadius: 11, background: C.accent, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.plus('#fff', 12)}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 28px', background: '#fff', borderTop: `0.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: C.muted }}>合计 {cartCount} 份</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.ink }}>
            ¥{cartTotal.toLocaleString()} <span style={{ fontSize: 11, color: C.muted, fontWeight: 400 }}>约 ¥{Math.round(cartTotal / 20)}</span>
          </div>
        </div>
        <button onClick={() => navigate('/order')} style={{ marginLeft: 'auto', background: C.ink, color: '#fff', padding: '14px 22px', borderRadius: 26, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
          确认 · 出示给店员
        </button>
      </div>
    </div>
  );
}
