import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import DishArt from '../components/DishArt.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { useApp } from '../context/AppContext.jsx';
import { SAMPLE_MENU } from '../data.js';

const CATS = ['全部', '招牌', 'ラーメン', 'おつまみ', 'ご飯', 'ドリンク'];
const CAT_KEYS = { '招牌': d => d.tag === '招牌' || d.tag === '热门', 'ラーメン': d => d.cat.includes('ラーメン'), 'おつまみ': d => d.cat.includes('おつまみ'), 'ご飯': d => d.cat.includes('ご飯'), 'ドリンク': d => d.cat.includes('ドリンク') };

export default function Menu() {
  const navigate = useNavigate();
  const { cart, addItem, removeItem, cartCount, cartTotal } = useApp();
  const [activeCat, setActiveCat] = useState('全部');
  const [search, setSearch] = useState('');

  const filtered = SAMPLE_MENU.filter(d => {
    const matchCat = activeCat === '全部' || (CAT_KEYS[activeCat]?.(d));
    const matchSearch = !search || d.cn.includes(search) || d.jp.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: C.bg, overflow: 'hidden' }}>
      <StatusBar />

      {/* header */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '14px 20px 10px', background: '#fff', zIndex: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.muted }}>
          <span>东京</span>
          <span style={{ width: 2, height: 2, borderRadius: 1, background: C.muted2 }} />
          <span>日文菜单</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: C.accent, fontWeight: 600 }}>
            {Ico.users(C.accent, 12)} 3 人
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.ink, marginTop: 4, letterSpacing: -0.3 }}>麺処 つばき</div>
      </div>

      {/* search */}
      <div style={{ position: 'absolute', top: 130, left: 16, right: 16, height: 34, background: C.bg2, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8, zIndex: 4 }}>
        {Ico.search(C.muted, 14)}
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="搜索菜品"
          style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 13, color: C.ink, outline: 'none' }}
        />
      </div>

      {/* category strip */}
      <div style={{ position: 'absolute', top: 178, left: 0, right: 0, padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto', whiteSpace: 'nowrap', zIndex: 4 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setActiveCat(c)} style={{
            padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: c === activeCat ? C.ink : C.bg2,
            color: c === activeCat ? '#fff' : C.ink2,
            border: 'none', cursor: 'pointer', flexShrink: 0,
          }}>{c}</button>
        ))}
      </div>

      {/* dish list */}
      <div style={{ position: 'absolute', top: 220, bottom: 84, left: 0, right: 0, overflowY: 'auto', padding: '0 20px' }}>
        {filtered.map(d => (
          <div key={d.id} style={{ background: '#fff', display: 'flex', gap: 12, padding: '14px 0', borderBottom: `0.5px solid ${C.line}`, cursor: 'pointer' }}
            onClick={() => navigate(`/menu/${d.id}`)}>
            <DishArt dish={d} w={72} h={72} rounded={12} />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, display: 'flex', gap: 6, alignItems: 'center' }}>
                {d.cn}
                {d.tag && <div style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: C.accentSoft, color: C.accent, fontWeight: 600 }}>{d.tag}</div>}
              </div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 1, fontFamily: '"Hiragino Mincho ProN", serif' }}>{d.jp}</div>
              <div style={{ fontSize: 10, lineHeight: '14px', color: C.muted, marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{d.blurb}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 6 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{d.price}</span>
                  <span style={{ fontSize: 10, color: C.muted, marginLeft: 4 }}>{d.cnPrice}</span>
                </div>
                <div onClick={e => { e.stopPropagation(); }}>
                  {(cart[d.id] || 0) > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={e => { e.stopPropagation(); removeItem(d.id); }} style={{ width: 22, height: 22, borderRadius: 11, border: `1px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.minus(C.ink, 12)}</button>
                      <div style={{ fontSize: 13, fontWeight: 600, minWidth: 12, textAlign: 'center' }}>{cart[d.id]}</div>
                      <button onClick={e => { e.stopPropagation(); addItem(d.id); }} style={{ width: 22, height: 22, borderRadius: 11, background: C.accent, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.plus('#fff', 12)}</button>
                    </div>
                  ) : (
                    <button onClick={e => { e.stopPropagation(); addItem(d.id); }} style={{ width: 26, height: 26, borderRadius: 13, background: C.accent, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.plus('#fff', 14)}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* bottom cart bar */}
      {cartCount > 0 && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 12px 24px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderTop: `0.5px solid ${C.line}` }}>
          <button onClick={() => navigate('/cart')} style={{ width: '100%', background: C.ink, borderRadius: 26, padding: '8px 8px 8px 16px', display: 'flex', alignItems: 'center', gap: 12, border: 'none', cursor: 'pointer' }}>
            <div style={{ position: 'relative' }}>
              {Ico.cart('#fff', 20)}
              <div style={{ position: 'absolute', top: -6, right: -6, width: 16, height: 16, borderRadius: 8, background: C.accent, fontSize: 9, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1.5px solid ${C.ink}` }}>{cartCount}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>¥{cartTotal.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>约 ¥{Math.round(cartTotal / 20)}</div>
            </div>
            <div style={{ background: C.accent, color: '#fff', padding: '8px 18px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>选好</div>
          </button>
        </div>
      )}
    </div>
  );
}
