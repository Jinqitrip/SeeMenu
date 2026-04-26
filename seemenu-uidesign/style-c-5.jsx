// Style C — Extended pages part 2: profile, history, settings, fullscreen order

const CY = window.C_PALETTE;

// ─── 13 · 个人中心 ────────────────────────────────────────
function C_Profile() {
  return (
    <WPhone bg={CY.bg2}>
      {/* status bar */}
      <div style={{ position: 'absolute', top: 54, left: 16, fontSize: 16, fontWeight: 700,
        color: CY.ink, zIndex: 5 }}>我的</div>
      <div style={{ position: 'absolute', top: 56, right: 16, zIndex: 5 }}>
        {Ico.gear(CY.ink, 18)}
      </div>

      {/* user card */}
      <div style={{ position: 'absolute', top: 100, left: 16, right: 16,
        background: '#fff', borderRadius: 16, padding: 18,
        display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 28,
          background: `linear-gradient(135deg, ${CY.accent}, #FF8C42)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700, color: '#fff' }}>李</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: CY.ink }}>李明</div>
          <div style={{ fontSize: 11, color: CY.muted, marginTop: 2 }}>已识别 8 份菜单 · 旅日 12 天</div>
        </div>
        <div style={{ fontSize: 16, color: CY.muted2 }}>›</div>
      </div>

      {/* stats row */}
      <div style={{ position: 'absolute', top: 196, left: 16, right: 16,
        background: '#fff', borderRadius: 16, padding: '16px 0',
        display: 'flex' }}>
        {[
          ['8', '识别次数'],
          ['23', '收藏菜品'],
          ['5', '加入房间'],
        ].map(([n, l], i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center',
            borderRight: i < 2 ? `0.5px solid ${CY.line}` : 'none' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: CY.ink,
              fontFamily: '"SF Pro Display", -apple-system' }}>{n}</div>
            <div style={{ fontSize: 11, color: CY.muted, marginTop: 2 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* menu list */}
      <div style={{ position: 'absolute', top: 296, left: 16, right: 16,
        background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
        {[
          ['history', '历史菜单', '最近 7 天有 3 份'],
          ['heart', '收藏夹', '23 道菜'],
          ['lang', '语言与翻译', '日语 → 中文'],
          ['diet', '忌口与偏好', '海鲜过敏 · 不吃辣'],
        ].map(([k, t, sub], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderTop: i ? `0.5px solid ${CY.line}` : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: CY.bg2,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {k === 'history' && Ico.clock(CY.ink, 14)}
              {k === 'heart' && Ico.heart(CY.ink, 14, false)}
              {k === 'lang' && Ico.globe(CY.ink, 14)}
              {k === 'diet' && Ico.alert(CY.ink, 14)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: CY.ink }}>{t}</div>
              <div style={{ fontSize: 11, color: CY.muted, marginTop: 1 }}>{sub}</div>
            </div>
            <div style={{ fontSize: 16, color: CY.muted2 }}>›</div>
          </div>
        ))}
      </div>

      {/* second list */}
      <div style={{ position: 'absolute', top: 540, left: 16, right: 16,
        background: '#fff', borderRadius: 16, overflow: 'hidden' }}>
        {[['help', '使用帮助'], ['feedback', '意见反馈']].map(([k, t], i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderTop: i ? `0.5px solid ${CY.line}` : 'none' }}>
            <div style={{ flex: 1, fontSize: 14, color: CY.ink }}>{t}</div>
            <div style={{ fontSize: 16, color: CY.muted2 }}>›</div>
          </div>
        ))}
      </div>
    </WPhone>
  );
}

// ─── 14 · 历史菜单列表 ────────────────────────────────────
function C_History() {
  const items = [
    { day: '今天', list: [
      { name: '麺処 つばき', city: '东京 · 涩谷', dishes: 4, time: '12:34', emoji: '🍜', bg: '#FFF1EB' },
    ]},
    { day: '昨天', list: [
      { name: 'すし匠', city: '东京 · 银座', dishes: 6, time: '19:20', emoji: '🍣', bg: '#EAF4FF' },
      { name: 'スターバックス', city: '东京 · 表参道', dishes: 2, time: '15:08', emoji: '☕', bg: '#F1ECE3' },
    ]},
    { day: '11 月 8 日', list: [
      { name: '焼肉 牛角', city: '京都', dishes: 8, time: '20:15', emoji: '🥩', bg: '#FFEAEA' },
      { name: 'ラーメン 一蘭', city: '大阪', dishes: 3, time: '21:40', emoji: '🍜', bg: '#FFF1EB' },
    ]},
  ];

  return (
    <WPhone bg={CY.bg2}>
      <CNav title="历史菜单" right={
        <div style={{ fontSize: 13, color: CY.accent, fontWeight: 500 }}>筛选</div>
      } />

      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, bottom: 0,
        overflow: 'hidden' }}>
        {items.map((group, gi) => (
          <div key={gi}>
            <div style={{ padding: '14px 20px 6px', fontSize: 11,
              color: CY.muted, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>
              {group.day}
            </div>
            <div style={{ background: '#fff', margin: '0 16px', borderRadius: 14,
              overflow: 'hidden' }}>
              {group.list.map((it, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12,
                  padding: 12,
                  borderTop: i ? `0.5px solid ${CY.line}` : 'none' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 10,
                    background: it.bg, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 22 }}>{it.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: CY.ink,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {it.name}
                    </div>
                    <div style={{ fontSize: 11, color: CY.muted, marginTop: 2,
                      display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{it.city}</span>
                      <span style={{ width: 2, height: 2, borderRadius: 1, background: CY.muted2 }} />
                      <span>点了 {it.dishes} 道</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: CY.muted2 }}>{it.time}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WPhone>
  );
}

// ─── 15 · 设置页 ────────────────────────────────────────
function C_Settings() {
  const Section = ({ title, children }) => (
    <>
      <div style={{ padding: '18px 20px 6px', fontSize: 11,
        color: CY.muted, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ background: '#fff', margin: '0 16px', borderRadius: 14, overflow: 'hidden' }}>
        {children}
      </div>
    </>
  );

  const Row = ({ label, value, toggle, on, last }) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', minHeight: 24,
      borderTop: last === 'first' ? 'none' : `0.5px solid ${CY.line}` }}>
      <div style={{ flex: 1, fontSize: 14, color: CY.ink }}>{label}</div>
      {toggle ? (
        <div style={{ width: 44, height: 26, borderRadius: 13,
          background: on ? CY.green : '#E5E5EA',
          position: 'relative', transition: 'background .2s' }}>
          <div style={{ position: 'absolute', top: 2, left: on ? 20 : 2,
            width: 22, height: 22, borderRadius: 11, background: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
        </div>
      ) : (
        <>
          <div style={{ fontSize: 13, color: CY.muted, marginRight: 4 }}>{value}</div>
          <div style={{ fontSize: 16, color: CY.muted2 }}>›</div>
        </>
      )}
    </div>
  );

  return (
    <WPhone bg={CY.bg2}>
      <CNav title="设置" />

      <div style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0 }}>
        <Section title="语言与翻译">
          <Row last="first" label="原始语言" value="日语 (自动)" />
          <Row label="翻译为" value="简体中文" />
          <Row label="同时显示原文" toggle on={true} />
        </Section>

        <Section title="忌口与偏好">
          <Row last="first" label="忌口设置" value="海鲜 · 辣" />
          <Row label="自动标红风险菜品" toggle on={true} />
          <Row label="显示卡路里估算" toggle on={false} />
        </Section>

        <Section title="通用">
          <Row last="first" label="按金额排序时显示" value="日元 · 人民币" />
          <Row label="拍照后自动识别" toggle on={true} />
          <Row label="震动反馈" toggle on={true} />
        </Section>

        <Section title="关于">
          <Row last="first" label="版本" value="1.2.0" />
          <Row label="服务协议" />
          <Row label="隐私政策" />
        </Section>
      </div>
    </WPhone>
  );
}

// ─── 16 · 订单 · 出示给店员（横屏放大） ─────────────────────
function C_OrderShow() {
  const items = [
    ['豚骨ラーメン (大盛り)',  '猪骨拉面 (大份)',     '× 2', '¥2,560'],
    ['醤油ラーメン',           '酱油拉面',           '× 1', '¥1,080'],
    ['焼き餃子',               '煎饺 (一份 6 个)',    '× 2', '¥1,160'],
    ['鶏の唐揚げ',             '日式炸鸡',           '× 1', '¥780'],
    ['味付け玉子',             '味付溏心蛋',          '× 4', '¥720'],
  ];

  return (
    <WPhone bg="#000" statusDark>
      {/* dim chrome */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 5 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Ico.close('#fff', 14)}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>请把屏幕给店员看</div>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff' }}>↻</div>
      </div>

      {/* receipt — taller, more presentational */}
      <div style={{ position: 'absolute', left: 16, right: 16, top: 110, bottom: 24,
        background: '#FAF7F0', borderRadius: 4,
        boxShadow: '0 20px 60px rgba(255,107,53,0.15), 0 0 0 1px rgba(255,255,255,0.05)',
        padding: '24px 22px',
        fontFamily: '"Hiragino Mincho ProN", "Songti SC", serif',
        display: 'flex', flexDirection: 'column' }}>

        {/* header */}
        <div style={{ textAlign: 'center', borderBottom: '1.5px solid #2a1a08', paddingBottom: 12 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: '#7a5a3a' }}>ご注文</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#2a1a08', marginTop: 2,
            letterSpacing: 2 }}>注 文 票</div>
          <div style={{ fontSize: 10, color: '#7a5a3a', marginTop: 4,
            fontFamily: 'monospace' }}>
            2026-04-26 · 12:42 · 房间 73KQ · 4 人
          </div>
        </div>

        {/* items */}
        <div style={{ flex: 1, marginTop: 16, overflow: 'hidden' }}>
          {items.map(([jp, cn, qty, price], i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'baseline', gap: 8 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1208',
                  letterSpacing: 1 }}>{jp}</div>
                <div style={{ fontSize: 12, color: '#1a1208', fontWeight: 700,
                  fontFamily: 'monospace' }}>{qty}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between',
                alignItems: 'baseline', marginTop: 1 }}>
                <div style={{ fontSize: 11, color: '#7a5a3a',
                  fontFamily: '"PingFang SC", sans-serif' }}>{cn}</div>
                <div style={{ fontSize: 11, color: '#7a5a3a',
                  fontFamily: 'monospace' }}>{price}</div>
              </div>
              {i < items.length - 1 && (
                <div style={{ marginTop: 10, borderTop: '1px dashed #c7a878' }} />
              )}
            </div>
          ))}
        </div>

        {/* total */}
        <div style={{ borderTop: '1.5px solid #2a1a08', paddingTop: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 13, color: '#1a1208' }}>合計 <span style={{ fontSize: 10,
            color: '#7a5a3a' }}>(税込)</span></div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#1a1208',
            fontFamily: 'monospace' }}>¥6,300</div>
        </div>

        {/* request */}
        <div style={{ marginTop: 12, padding: '10px 12px',
          background: '#2a1a08', color: '#FAF7F0',
          fontSize: 11, lineHeight: '17px',
          fontFamily: '"Hiragino Sans", sans-serif',
          borderRadius: 2 }}>
          <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.7,
            marginBottom: 3 }}>備考 · NOTES</div>
          海鮮アレルギーがあります。一品はお取り分けでお願いします。
        </div>
      </div>
    </WPhone>
  );
}

window.C_Profile = C_Profile;
window.C_History = C_History;
window.C_Settings = C_Settings;
window.C_OrderShow = C_OrderShow;
