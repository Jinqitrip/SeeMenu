import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from '../components/Icons.jsx';
import DishArt from '../components/DishArt.jsx';
import StatusBar from '../components/StatusBar.jsx';
import { useApp } from '../context/AppContext.jsx';
import { MENU_BY_ID } from '../data.js';

const DIETARY = ['不要葱', '不要香菜', '少盐', '辣', '面硬'];
const INGREDIENTS = { tonkotsu: ['猪骨白汤','溏心蛋','叉烧','海苔','葱花','麦面'], shoyu: ['酱油汤底','鸡骨','昆布','叉烧','细面'], gyoza: ['猪肉','白菜','姜','葱','饺子皮'], karaage: ['鸡腿肉','生姜','酱油','淀粉','柠檬'], edamame: ['毛豆','海盐'], tamago: ['鸡蛋','酱油','味淋'], chashu: ['猪五花','酱汁','葱油','米饭'], highball: ['威士忌','苏打水','冰块'] };

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addItem, removeItem } = useApp();
  const [selectedDietary, setSelectedDietary] = useState([]);
  const d = MENU_BY_ID[id];
  if (!d) return <div>Not found</div>;

  const qty = cart[d.id] || 0;
  const ingredients = INGREDIENTS[d.id] || [];

  const toggleDiet = (t) => setSelectedDietary(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#fff', overflow: 'hidden' }}>
      <StatusBar />

      {/* hero */}
      <div style={{ position: 'absolute', top: 54, left: 16, right: 16, height: 240, borderRadius: 16, overflow: 'hidden', background: `linear-gradient(180deg, ${d.swatch[0]} 0%, ${d.swatch[1]} 100%)` }}>
        <DishArt dish={d} w={358} h={240} rounded={0} />
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)', padding: '4px 10px', borderRadius: 999, fontSize: 10, color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
          {Ico.sparkle('#fff', 10)} AI 示意图
        </div>
        <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: 12, left: 12, width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Ico.back(C.ink, 16)}
        </button>
      </div>

      <div style={{ position: 'absolute', top: 310, left: 20, right: 20, bottom: 100, overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 5, marginBottom: 4 }}>
              {d.tag && <div style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: C.accentSoft, color: C.accent, fontWeight: 600 }}>{d.tag}</div>}
              <div style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3, background: C.bg2, color: C.ink2, fontWeight: 600 }}>店主推荐</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.ink, letterSpacing: -0.3 }}>{d.cn}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
              <span style={{ fontFamily: '"Hiragino Mincho ProN", serif' }}>{d.jp}</span> · {d.romaji}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.ink }}>{d.price}</div>
            <div style={{ fontSize: 10, color: C.muted }}>{d.cnPrice}</div>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 13, lineHeight: '20px', color: C.ink2 }}>{d.blurb}</div>

        {ingredients.length > 0 && <>
          <div style={{ marginTop: 16, fontSize: 11, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>主要食材</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ingredients.map(t => <div key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999, background: C.bg2, color: C.ink2 }}>{t}</div>)}
          </div>
        </>}

        <div style={{ marginTop: 16, fontSize: 11, color: C.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>忌口与备注</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {DIETARY.map(t => {
            const sel = selectedDietary.includes(t);
            return (
              <button key={t} onClick={() => toggleDiet(t)} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999, background: sel ? C.ink : '#fff', color: sel ? '#fff' : C.ink2, border: sel ? 'none' : `0.5px solid ${C.line}`, fontWeight: sel ? 600 : 500, cursor: 'pointer' }}>
                {sel && '✓ '}{t}
              </button>
            );
          })}
        </div>
        <div style={{ height: 20 }} />
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 28px', background: '#fff', borderTop: `0.5px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button onClick={() => removeItem(d.id)} style={{ width: 30, height: 30, borderRadius: 15, border: `1px solid ${C.line}`, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.minus(C.ink, 14)}</button>
          <div style={{ fontSize: 15, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>{qty}</div>
          <button onClick={() => addItem(d.id)} style={{ width: 30, height: 30, borderRadius: 15, background: C.ink, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.plus('#fff', 14)}</button>
        </div>
        <button onClick={() => { if (qty === 0) addItem(d.id); navigate('/cart'); }} style={{ flex: 1, height: 44, background: C.accent, borderRadius: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#fff', border: 'none', cursor: 'pointer' }}>
          {qty > 0 ? `已加 ${qty} 份 · 去结单` : `加入订单 · ${d.price}`}
        </button>
      </div>
    </div>
  );
}
