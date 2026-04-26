// Style C — Screens 4–6 · Menu / Detail / Cart

const C2 = window.C_PALETTE;

function CDishCard({ dish, qty = 0 }) {
  return (
    <div style={{ background: '#fff', display: 'flex', gap: 12, padding: '14px 0',
      borderBottom: `0.5px solid ${C2.line}` }}>
      <DishArt dish={dish} w={72} h={72} rounded={12} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C2.ink, display: 'flex', gap: 6, alignItems: 'center' }}>
          {dish.cn}
          {dish.tag && (
            <div style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3,
              background: C2.accentSoft, color: C2.accent, fontWeight: 600 }}>{dish.tag}</div>
          )}
        </div>
        <div style={{ fontSize: 10, color: C2.muted, marginTop: 1,
          fontFamily: '"Hiragino Mincho ProN", serif' }}>{dish.jp}</div>
        <div style={{ fontSize: 10, lineHeight: '14px', color: C2.muted, marginTop: 4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {dish.blurb}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 6 }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 700, color: C2.ink }}>{dish.price}</span>
            <span style={{ fontSize: 10, color: C2.muted, marginLeft: 4 }}>{dish.cnPrice}</span>
          </div>
          {qty > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11,
                border: `1px solid ${C2.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Ico.minus(C2.ink, 12)}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, minWidth: 12, textAlign: 'center' }}>{qty}</div>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: C2.accent,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Ico.plus('#fff', 12)}
              </div>
            </div>
          ) : (
            <div style={{ width: 26, height: 26, borderRadius: 13, background: C2.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {Ico.plus('#fff', 14)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function C_Menu() {
  const cats = ['全部', '招牌', 'ラーメン', 'おつまみ', 'ご飯', 'ドリンク'];
  const qm = { tonkotsu: 1, gyoza: 1 };
  return (
    <WPhone bg={C2.bg}>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '14px 20px 10px',
        background: '#fff', zIndex: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C2.muted }}>
          <span>东京</span>
          <span style={{ width: 2, height: 2, borderRadius: 1, background: C2.muted2 }} />
          <span>日文菜单</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4,
            color: C2.accent, fontWeight: 600 }}>
            {Ico.users(C2.accent, 12)} 3 人
          </div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C2.ink, marginTop: 4, letterSpacing: -0.3 }}>
          麺処 つばき
        </div>
      </div>

      {/* search */}
      <div style={{ position: 'absolute', top: 130, left: 16, right: 16, height: 34,
        background: C2.bg2, borderRadius: 10,
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8 }}>
        {Ico.search(C2.muted, 14)}
        <div style={{ fontSize: 13, color: C2.muted }}>搜索菜品</div>
      </div>

      {/* category strip */}
      <div style={{ position: 'absolute', top: 178, left: 0, right: 0,
        padding: '0 16px', display: 'flex', gap: 8, overflowX: 'auto',
        whiteSpace: 'nowrap' }}>
        {cats.map((c, i) => (
          <div key={c} style={{
            padding: '6px 14px', borderRadius: 999,
            fontSize: 12, fontWeight: 600,
            background: i === 1 ? C2.ink : C2.bg2,
            color: i === 1 ? '#fff' : C2.ink2,
            flexShrink: 0,
          }}>{c}</div>
        ))}
      </div>

      {/* dish list */}
      <div style={{ position: 'absolute', top: 220, bottom: 84, left: 0, right: 0,
        overflowY: 'auto', padding: '0 20px' }}>
        {SAMPLE_MENU.slice(0, 4).map(d => (
          <CDishCard key={d.id} dish={d} qty={qm[d.id] || 0} />
        ))}
      </div>

      {/* bottom cart bar — clean white */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '8px 12px 24px',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: `0.5px solid ${C2.line}` }}>
        <div style={{
          background: C2.ink, borderRadius: 26,
          padding: '8px 8px 8px 16px',
          display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            {Ico.cart('#fff', 20)}
            <div style={{ position: 'absolute', top: -6, right: -6,
              width: 16, height: 16, borderRadius: 8, background: C2.accent,
              fontSize: 9, fontWeight: 700, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1.5px solid ${C2.ink}` }}>2</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>¥1,760</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)' }}>约 ¥86</div>
          </div>
          <div style={{ background: C2.accent, color: '#fff',
            padding: '8px 18px', borderRadius: 20,
            fontSize: 13, fontWeight: 600 }}>选好</div>
        </div>
      </div>
    </WPhone>
  );
}

function C_Detail() {
  const d = MENU_BY_ID.tonkotsu;
  return (
    <WPhone bg="#fff">
      {/* hero block */}
      <div style={{ position: 'absolute', top: 100, left: 16, right: 16,
        height: 240, borderRadius: 16, overflow: 'hidden', position: 'absolute',
        background: `linear-gradient(180deg, ${d.swatch[0]} 0%, ${d.swatch[1]} 100%)` }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180, height: 180, borderRadius: '50%',
          background: `radial-gradient(circle at 35% 30%, #f3d9b5, ${d.swatch[1]} 90%)`,
          boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.25)' }} />
        <div style={{ position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)',
          padding: '4px 10px', borderRadius: 999, fontSize: 10, color: '#fff',
          display: 'flex', alignItems: 'center', gap: 4 }}>
          {Ico.sparkle('#fff', 10)} AI 示意图
        </div>
        <div style={{ position: 'absolute', top: 12, left: 12,
          width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Ico.back(C2.ink, 16)}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 360, left: 20, right: 20, bottom: 100,
        overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 5, marginBottom: 4 }}>
              <div style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3,
                background: C2.accentSoft, color: C2.accent, fontWeight: 600 }}>招牌</div>
              <div style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3,
                background: C2.bg2, color: C2.ink2, fontWeight: 600 }}>店主推荐</div>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C2.ink, letterSpacing: -0.3 }}>{d.cn}</div>
            <div style={{ fontSize: 11, color: C2.muted, marginTop: 2 }}>
              <span style={{ fontFamily: '"Hiragino Mincho ProN", serif' }}>{d.jp}</span> · {d.romaji}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: C2.ink }}>{d.price}</div>
            <div style={{ fontSize: 10, color: C2.muted }}>{d.cnPrice}</div>
          </div>
        </div>

        <div style={{ marginTop: 12, fontSize: 13, lineHeight: '20px', color: C2.ink2 }}>
          {d.blurb}
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: C2.muted, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>主要食材</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['猪骨白汤', '溏心蛋', '叉烧', '海苔', '葱花', '麦面'].map(t => (
            <div key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 999,
              background: C2.bg2, color: C2.ink2 }}>{t}</div>
          ))}
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: C2.muted, fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>忌口与备注</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[['不要葱', true], ['不要香菜', false], ['少盐', false], ['辣', false], ['面硬', false]].map(([t, sel]) => (
            <div key={t} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999,
              background: sel ? C2.ink : '#fff',
              color: sel ? '#fff' : C2.ink2,
              border: sel ? 'none' : `0.5px solid ${C2.line}`,
              fontWeight: sel ? 600 : 500 }}>{sel && '✓ '}{t}</div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 28px', background: '#fff',
        borderTop: `0.5px solid ${C2.line}`,
        display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 15,
            border: `1px solid ${C2.line}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.minus(C2.ink, 14)}</div>
          <div style={{ fontSize: 15, fontWeight: 700, minWidth: 14, textAlign: 'center' }}>1</div>
          <div style={{ width: 30, height: 30, borderRadius: 15, background: C2.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.plus('#fff', 14)}</div>
        </div>
        <div style={{ flex: 1, height: 44, background: C2.accent, borderRadius: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600, color: '#fff' }}>
          加入订单 · ¥1,180
        </div>
      </div>
    </WPhone>
  );
}

function C_Cart() {
  const lines = [
    { id: 'tonkotsu', qty: 1, note: '不要葱' },
    { id: 'gyoza', qty: 1, note: '' },
    { id: 'tamago', qty: 2, note: '加在拉面里' },
  ];
  return (
    <WPhone bg="#fff">
      <CNav title="我的选菜" sub="3 道 · 4 份" right={
        <div style={{ fontSize: 11, color: C2.accent, fontWeight: 600 }}>房间 73KQ</div>
      } />

      <div style={{ position: 'absolute', top: 110, bottom: 110, left: 0, right: 0,
        overflowY: 'auto', padding: '0 20px' }}>
        {lines.map((l, i) => {
          const d = MENU_BY_ID[l.id];
          return (
            <div key={i} style={{ padding: '14px 0',
              borderBottom: i < lines.length - 1 ? `0.5px solid ${C2.line}` : 'none',
              display: 'flex', gap: 12 }}>
              <DishArt dish={d} w={56} h={56} rounded={10} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C2.ink }}>{d.cn}</div>
                    <div style={{ fontSize: 10, color: C2.muted, marginTop: 1,
                      fontFamily: '"Hiragino Mincho ProN", serif' }}>{d.jp}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C2.ink }}>{d.price}</div>
                </div>
                {l.note ? (
                  <div style={{ marginTop: 6, fontSize: 11, color: C2.accent,
                    background: C2.accentSoft,
                    padding: '3px 8px', borderRadius: 4, display: 'inline-block' }}>
                    📝 {l.note}
                  </div>
                ) : (
                  <div style={{ marginTop: 6, fontSize: 11, color: C2.muted }}>
                    <span style={{ textDecoration: 'underline' }}>+ 添加备注</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 11,
                    border: `1px solid ${C2.line}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Ico.minus(C2.ink, 12)}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, minWidth: 12, textAlign: 'center' }}>{l.qty}</div>
                  <div style={{ width: 22, height: 22, borderRadius: 11, background: C2.accent,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Ico.plus('#fff', 12)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 28px', background: '#fff',
        borderTop: `0.5px solid ${C2.line}`,
        display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: C2.muted }}>合计 4 份</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: C2.ink }}>
            ¥1,720 <span style={{ fontSize: 11, color: C2.muted, fontWeight: 400 }}>约 ¥84</span>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', background: C2.ink, color: '#fff',
          padding: '14px 22px', borderRadius: 26,
          fontSize: 14, fontWeight: 600 }}>确认 · 出示给店员</div>
      </div>
    </WPhone>
  );
}

window.C_Menu = C_Menu;
window.C_Detail = C_Detail;
window.C_Cart = C_Cart;
