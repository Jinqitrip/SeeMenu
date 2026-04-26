// Style C — Screens 7, 8 · Room / Final order

const C3 = window.C_PALETTE;

function C_Room() {
  return (
    <WPhone bg="#fff">
      <CNav title="用餐房间" sub="麺処 つばき" right={Ico.share(C3.ink, 16)} />

      {/* room code card — black on white */}
      <div style={{ position: 'absolute', top: 116, left: 16, right: 16,
        background: C3.ink, borderRadius: 18, padding: '22px 22px 18px',
        position: 'absolute' }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: 2 }}>ROOM CODE</div>
        <div style={{ fontSize: 40, fontWeight: 700, color: '#fff',
          fontFamily: '"SF Mono", monospace', letterSpacing: 8, marginTop: 4 }}>73KQ</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
          朋友打开 SeeMenu 输入此码即可加入
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <div style={{ flex: 1, padding: '8px 0', borderRadius: 10,
            background: 'rgba(255,255,255,0.12)',
            fontSize: 12, color: '#fff', textAlign: 'center', fontWeight: 600 }}>分享</div>
          <div style={{ flex: 1, padding: '8px 0', borderRadius: 10,
            background: '#fff', color: C3.ink,
            fontSize: 12, textAlign: 'center', fontWeight: 600 }}>显示二维码</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 290, left: 20, right: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C3.ink }}>房间内 · 3 人</div>
        <div style={{ fontSize: 11, color: C3.green, display: 'flex', alignItems: 'center', gap: 4 }}>
          ● 实时同步
        </div>
      </div>

      <div style={{ position: 'absolute', top: 320, bottom: 90, left: 0, right: 0,
        overflowY: 'auto', padding: '0 20px' }}>
        {ROOM_MEMBERS.map((m, i) => (
          <div key={i} style={{ padding: '12px 0',
            borderBottom: i < 2 ? `0.5px solid ${C3.line}` : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <div style={{ width: 30, height: 30, borderRadius: 15,
                background: m.color, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{m.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C3.ink }}>
                {m.name}{m.id === 'me' && <span style={{ fontSize: 10, color: C3.muted, marginLeft: 6, fontWeight: 400 }}>· 你</span>}
              </div>
              <div style={{ marginLeft: 'auto', fontSize: 11, color: C3.muted }}>{m.picks.length} 道</div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingLeft: 40 }}>
              {m.picks.map(pid => (
                <div key={pid} style={{ fontSize: 11, color: C3.ink2,
                  background: C3.bg2, padding: '3px 9px', borderRadius: 5 }}>
                  {MENU_BY_ID[pid].cn}
                </div>
              ))}
              {m.note && (
                <div style={{ fontSize: 10, color: C3.accent, padding: '3px 0' }}>※ {m.note}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 16px 28px', background: '#fff',
        borderTop: `0.5px solid ${C3.line}`,
        display: 'flex', alignItems: 'center', gap: 14 }}>
        <div>
          <div style={{ fontSize: 10, color: C3.muted }}>合计 8 份</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C3.ink }}>¥6,640</div>
        </div>
        <div style={{ marginLeft: 'auto', background: C3.ink, color: '#fff',
          padding: '14px 22px', borderRadius: 26,
          fontSize: 14, fontWeight: 600 }}>生成订单 →</div>
      </div>
    </WPhone>
  );
}

function C_Order() {
  return (
    <WPhone bg={C3.bg2}>
      <CNav title="出示给服务员" right={
        <div style={{ fontSize: 11, color: C3.accent, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 4 }}>
          {Ico.globe(C3.accent, 12)} 中↔日
        </div>
      } />

      {/* receipt card — pure white on light gray bg */}
      <div style={{ position: 'absolute', top: 116, left: 16, right: 16, bottom: 80,
        background: '#fff', borderRadius: 16,
        boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 14px', textAlign: 'center',
          borderBottom: `1px dashed ${C3.line}` }}>
          <div style={{ fontFamily: '"Hiragino Mincho ProN", serif',
            fontSize: 20, fontWeight: 700, color: C3.ink, letterSpacing: 4 }}>ご注文</div>
          <div style={{ fontSize: 10, color: C3.muted, marginTop: 4, letterSpacing: 1 }}>ORDER · 订单</div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between',
            fontSize: 10, color: C3.muted, fontFamily: 'monospace' }}>
            <span>2026.04.25 19:32</span>
            <span>3名様 · 8品</span>
          </div>
        </div>

        <div style={{ flex: 1, padding: '4px 20px', overflowY: 'auto' }}>
          {FINAL_ORDER.map((line, i) => {
            const d = MENU_BY_ID[line.id];
            const lt = parseInt(d.price.replace(/[^\d]/g,'')) * line.qty;
            return (
              <div key={i} style={{ padding: '10px 0',
                borderBottom: i < FINAL_ORDER.length - 1 ? `1px dotted ${C3.line}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: '"Hiragino Mincho ProN", serif',
                      fontSize: 14, fontWeight: 600, color: C3.ink }}>
                      {d.jp}
                      <span style={{ fontFamily: 'monospace', color: C3.accent,
                        marginLeft: 6, fontSize: 12 }}>×{line.qty}</span>
                    </div>
                    <div style={{ fontSize: 10, color: C3.muted, marginTop: 1 }}>{d.cn}</div>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: C3.ink }}>
                    ¥{lt.toLocaleString()}
                  </div>
                </div>
                {line.note && (
                  <div style={{ marginTop: 4, fontSize: 10, color: C3.accent,
                    background: C3.accentSoft,
                    padding: '2px 8px', borderRadius: 3, display: 'inline-block',
                    fontFamily: '"Hiragino Mincho ProN", serif' }}>
                    ※ {line.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ borderTop: `1.5px solid ${C3.ink}`, padding: '12px 20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11,
            color: C3.muted, marginBottom: 4, fontFamily: 'monospace' }}>
            <span>小計 SUBTOTAL</span><span>¥6,140</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10,
            color: C3.muted, marginBottom: 8, fontFamily: 'monospace' }}>
            <span>消費税 10%</span><span>¥614</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', paddingTop: 8, borderTop: `0.5px solid ${C3.line}` }}>
            <div style={{ fontFamily: '"Hiragino Mincho ProN", serif',
              fontSize: 15, fontWeight: 700, color: C3.ink, letterSpacing: 2 }}>合計</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C3.ink, fontFamily: 'monospace' }}>
              ¥6,754
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 10, color: C3.muted, marginTop: 2 }}>
            约 ¥330
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, left: 16, right: 16,
        textAlign: 'center', fontSize: 10, color: C3.muted, letterSpacing: 1 }}>
        把屏幕递给店员，全程不用开口
      </div>
    </WPhone>
  );
}

window.C_Room = C_Room;
window.C_Order = C_Order;
