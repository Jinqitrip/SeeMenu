import { useNavigate } from 'react-router-dom';
import Ico from '../components/Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { MENU_BY_ID, FINAL_ORDER } from '../data.js';

const ITEMS = [
  ['豚骨ラーメン (大盛り)',  '猪骨拉面 (大份)',      '× 2', '¥2,560'],
  ['醤油ラーメン',           '酱油拉面',             '× 1', '¥1,080'],
  ['焼き餃子',               '煎饺 (一份 6 个)',      '× 2', '¥1,160'],
  ['鶏の唐揚げ',             '日式炸鸡',             '× 1', '¥780'],
  ['味付け玉子',             '味付溏心蛋',            '× 4', '¥720'],
];

export default function OrderShow() {
  const navigate = useNavigate();
  const { cartLines } = useApp();

  const items = cartLines.length > 0
    ? cartLines.map(l => {
        const d = MENU_BY_ID[l.id];
        if (!d) return null;
        const price = parseInt(d.price.replace(/[^\d]/g, '')) * l.qty;
        return [d.jp, d.cn, `× ${l.qty}`, `¥${price.toLocaleString()}`];
      }).filter(Boolean)
    : ITEMS;

  const total = items.reduce((s, it) => s + parseInt((it[3] || '¥0').replace(/[^\d]/g, '')), 0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
      {/* dim chrome */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
        <button onClick={() => navigate(-1)} style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Ico.close('#fff', 14)}
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>请把屏幕给店员看</div>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#fff' }}>↻</div>
      </div>

      {/* receipt */}
      <div style={{
        position: 'absolute', left: 16, right: 16, top: 110, bottom: 24,
        background: '#FAF7F0', borderRadius: 4,
        boxShadow: '0 20px 60px rgba(255,107,53,0.15), 0 0 0 1px rgba(255,255,255,0.05)',
        padding: '24px 22px',
        fontFamily: '"Hiragino Mincho ProN", "Songti SC", serif',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ textAlign: 'center', borderBottom: '1.5px solid #2a1a08', paddingBottom: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: '#7a5a3a' }}>ご注文</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2a1a08', marginTop: 2, letterSpacing: 2 }}>注 文 票</div>
          <div style={{ fontSize: 10, color: '#7a5a3a', marginTop: 4, fontFamily: 'monospace' }}>2026-04-26 · 12:42 · 4 人</div>
        </div>

        <div style={{ flex: 1, marginTop: 16, overflowY: 'auto' }}>
          {items.map(([jp, cn, qty, price], i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1208', letterSpacing: 1 }}>{jp}</div>
                <div style={{ fontSize: 12, color: '#1a1208', fontWeight: 700, fontFamily: 'monospace' }}>{qty}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 1 }}>
                <div style={{ fontSize: 11, color: '#7a5a3a', fontFamily: '"PingFang SC", sans-serif' }}>{cn}</div>
                <div style={{ fontSize: 11, color: '#7a5a3a', fontFamily: 'monospace' }}>{price}</div>
              </div>
              {i < items.length - 1 && <div style={{ marginTop: 10, borderTop: '1px dashed #c7a878' }} />}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1.5px solid #2a1a08', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 13, color: '#1a1208' }}>合計 <span style={{ fontSize: 10, color: '#7a5a3a' }}>(税込)</span></div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1208', fontFamily: 'monospace' }}>¥{total.toLocaleString()}</div>
        </div>

        <div style={{ marginTop: 12, padding: '10px 12px', background: '#2a1a08', color: '#FAF7F0', fontSize: 11, lineHeight: '17px', fontFamily: '"Hiragino Sans", sans-serif', borderRadius: 2 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.7, marginBottom: 3 }}>備考 · NOTES</div>
          海鮮アレルギーがあります。一品はお取り分けでお願いします。
        </div>
      </div>
    </div>
  );
}
