// Style C — Clean white. iOS / 小红书 sensibility.
// 纯白底 + 极淡灰分隔 + 系统字 + 单色橙作为唯一强调色.
// 强调留白、克制、信息层级用字号 / 字重 / 灰度区分.

const C = {
  bg: '#FFFFFF',
  bg2: '#F7F7F8',          // very light gray surface
  bg3: '#F2F2F4',
  ink: '#000000',
  ink2: '#3C3C43',
  muted: '#8E8E93',         // iOS secondary
  muted2: '#C7C7CC',
  line: '#E5E5EA',
  accent: '#FF6B35',        // single orange accent — used sparingly
  accentSoft: '#FFF1EB',
  green: '#34C759',
};

// Reusable iOS-like nav bar (with back chevron + title)
function CNav({ title, sub, right, back = true }) {
  return (
    <div style={{ position: 'absolute', top: 54, left: 0, right: 0,
      height: 44, padding: '0 16px',
      display: 'flex', alignItems: 'center', gap: 8,
      background: C.bg, zIndex: 5 }}>
      {back && (
        <div style={{ width: 28, height: 28, borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Ico.back(C.ink, 18)}
        </div>
      )}
      <div style={{ flex: 1, textAlign: back ? 'center' : 'left' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{title}</div>
        {sub && <div style={{ fontSize: 10, color: C.muted, marginTop: -1 }}>{sub}</div>}
      </div>
      {right || <div style={{ width: 28 }} />}
    </div>
  );
}

// ─── 1 · Home ────────────────────────────────────────────
function C_Home() {
  return (
    <WPhone bg={C.bg}>
      <div style={{ position: 'absolute', top: 100, left: 20, right: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: C.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700 }}>看</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>SeeMenu</div>
          <div style={{ fontSize: 11, color: C.muted, marginLeft: 4 }}>智拍菜单</div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 158, left: 20, right: 20 }}>
        <div style={{ fontSize: 30, lineHeight: '38px', fontWeight: 700, color: C.ink,
          letterSpacing: -0.6 }}>
          看懂任何<br/>外文菜单。
        </div>
        <div style={{ marginTop: 10, fontSize: 13, lineHeight: '20px', color: C.muted, maxWidth: 240 }}>
          拍一张照，AI 帮你翻译、配图、点单 —— 出国吃饭再也不用瞎指。
        </div>
      </div>

      {/* feature cards — clean white with hairline */}
      <div style={{ position: 'absolute', top: 296, left: 20, right: 20,
        display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { num: '①', t: '拍照识别', s: '对准菜单，自动框出每道菜', icon: Ico.camera(C.ink, 18) },
          { num: '②', t: '看图选菜', s: 'AI 配图 + 翻译 + 介绍', icon: Ico.sparkle(C.ink, 16) },
          { num: '③', t: '一键出示', s: '生成本地语言订单给服务员', icon: Ico.globe(C.ink, 16) },
        ].map((it, i) => (
          <div key={i} style={{
            background: C.bg2, borderRadius: 14,
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#fff',
              border: `0.5px solid ${C.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {it.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{it.t}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{it.s}</div>
            </div>
            <div style={{ fontSize: 12, color: C.muted2, fontWeight: 600 }}>{it.num}</div>
          </div>
        ))}
      </div>

      {/* CTA — minimal black pill */}
      <div style={{ position: 'absolute', bottom: 36, left: 20, right: 20 }}>
        <div style={{
          background: C.ink, color: '#fff',
          height: 52, borderRadius: 26,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 10, fontSize: 15, fontWeight: 600,
        }}>
          {Ico.camera('#fff', 20)} 拍菜单
        </div>
        <div style={{ marginTop: 12, textAlign: 'center', fontSize: 12, color: C.muted }}>
          已加入朋友的菜单？<span style={{ color: C.accent, fontWeight: 600 }}>输入房间码</span>
        </div>
      </div>
    </WPhone>
  );
}

// ─── 2 · Capture (still dark — camera always is) ────────
function C_Capture() {
  return (
    <WPhone bg="#000" statusDark={true}>
      <div style={{ position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, #1a1108 0%, #2a1a0c 100%)' }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%) rotate(-2deg)',
          width: 290, height: 380, background: '#f0e4c8',
          padding: '24px 22px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          fontFamily: '"Hiragino Mincho ProN", serif',
        }}>
          <div style={{ textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#2a1a08',
            letterSpacing: 3 }}>麺処 つばき</div>
          <div style={{ height: 1.5, background: '#2a1a08', margin: '14px 30px' }} />
          {[['豚骨ラーメン','¥1,180'],['醤油ラーメン','¥1,080'],['味噌ラーメン','¥1,180'],
            ['つけ麺','¥1,280'],['焼き餃子','¥580'],['鶏の唐揚げ','¥780'],
            ['枝豆','¥380'],['チャーシュー丼','¥880'],['味付け玉子','¥180']].map(([n,p],i)=>(
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
              fontSize: 13, color: '#2a1a08', padding: '6px 0' }}>
              <span>{n}</span><span style={{ fontFamily: 'monospace' }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 100, left: 22, right: 22, bottom: 200,
        boxShadow: '0 0 0 999px rgba(0,0,0,0.55)',
        borderRadius: 16,
      }} />
      {[{t:100,l:22},{t:100,r:22},{b:200,l:22},{b:200,r:22}].map((p,i)=>(
        <div key={i} style={{
          position: 'absolute',
          top: p.t, bottom: p.b, left: p.l, right: p.r,
          width: 24, height: 24,
          borderTop: i < 2 ? `2.5px solid #fff` : 'none',
          borderBottom: i >= 2 ? `2.5px solid #fff` : 'none',
          borderLeft: (i % 2 === 0) ? `2.5px solid #fff` : 'none',
          borderRight: (i % 2 === 1) ? `2.5px solid #fff` : 'none',
          borderTopLeftRadius: i === 0 ? 4 : 0,
          borderTopRightRadius: i === 1 ? 4 : 0,
          borderBottomLeftRadius: i === 2 ? 4 : 0,
          borderBottomRightRadius: i === 3 ? 4 : 0,
        }} />
      ))}

      <div style={{
        position: 'absolute', top: 116, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)',
        padding: '6px 14px', borderRadius: 999,
        fontSize: 11, color: C.ink, fontWeight: 500,
      }}>
        将菜单完整放入框内
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.9) 60%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: 30 }}>
        <div style={{ display: 'flex', gap: 22, fontSize: 11, color: 'rgba(255,255,255,0.5)',
          marginBottom: 18 }}>
          <span>相册</span><span style={{ color: '#fff', fontWeight: 600 }}>· 菜单 ·</span><span>扫码</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8,
            background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Ico.album('#fff', 18)}
          </div>
          <div style={{
            width: 72, height: 72, borderRadius: 36,
            border: '3px solid #fff', padding: 4,
          }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#fff' }} />
          </div>
          <div style={{ width: 40, height: 40, borderRadius: 8,
            background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Ico.flash('#fff', 16)}
          </div>
        </div>
      </div>
    </WPhone>
  );
}

// ─── 3 · Recognizing ────────────────────────────────────
function C_Recognizing() {
  return (
    <WPhone bg={C.bg}>
      <CNav title="识别中" sub="保持手机稳定" />

      <div style={{ position: 'absolute', top: 110, left: 20, right: 20, bottom: 220 }}>
        {/* the photo being analysed */}
        <div style={{
          width: '100%', height: '100%', background: C.bg2,
          borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            background: '#f0e4c8', borderRadius: 6, height: '100%',
            padding: '16px 14px',
            fontFamily: '"Hiragino Mincho ProN", serif',
            position: 'relative',
          }}>
            <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700,
              color: '#2a1a08', letterSpacing: 2 }}>麺処 つばき</div>
            <div style={{ height: 1, background: '#2a1a08', margin: '8px 24px' }} />
            {[
              { jp: '豚骨ラーメン', cn: '豚骨拉面', state: 'done' },
              { jp: '醤油ラーメン', cn: '酱油拉面', state: 'done' },
              { jp: '焼き餃子', cn: '煎饺', state: 'done' },
              { jp: '鶏の唐揚げ', cn: '日式炸鸡', state: 'active' },
              { jp: '枝豆', cn: null, state: 'pending' },
              { jp: 'チャーシュー丼', cn: null, state: 'pending' },
              { jp: '味付け玉子', cn: null, state: 'pending' },
            ].map((it, i) => (
              <div key={i} style={{ position: 'relative', padding: '5px 0',
                fontSize: 11, color: '#2a1a08',
                opacity: it.state === 'pending' ? 0.4 : 1 }}>
                <span>{it.jp}</span>
                {it.cn && (
                  <div style={{ position: 'absolute', right: -4, top: 3,
                    fontSize: 9, fontFamily: '"PingFang SC", sans-serif',
                    background: C.accent, color: '#fff',
                    padding: '1px 6px', borderRadius: 3, fontWeight: 600 }}>
                    {it.cn}
                  </div>
                )}
                {it.state === 'active' && (
                  <div style={{ position: 'absolute', right: -4, top: 3,
                    fontSize: 9, fontFamily: '"PingFang SC", sans-serif',
                    background: '#fff', color: C.muted,
                    border: `0.5px dashed ${C.muted2}`,
                    padding: '1px 6px', borderRadius: 3 }}>
                    翻译中…
                  </div>
                )}
              </div>
            ))}
            {/* scan beam */}
            <div style={{ position: 'absolute', left: 14, right: 14,
              top: 36 + 4 * 21,
              height: 1.5,
              background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
              boxShadow: `0 0 6px ${C.accent}` }} />
          </div>
        </div>
      </div>

      {/* progress sheet */}
      <div style={{ position: 'absolute', bottom: 36, left: 16, right: 16,
        background: '#fff',
        border: `0.5px solid ${C.line}`,
        borderRadius: 18, padding: '16px 18px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 16,
            background: `conic-gradient(${C.accent} 0deg 252deg, ${C.bg3} 252deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 9, fontWeight: 700, color: C.ink }}>70%</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>识别 7 / 10 道菜</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>预计还需 3 秒</div>
          </div>
          {Ico.sparkle(C.accent, 16)}
        </div>

        <div style={{ marginTop: 12, display: 'flex', gap: 6 }}>
          {['识别', '翻译', '配图', '整理'].map((s, i) => {
            const state = i < 2 ? 'done' : i === 2 ? 'active' : 'pending';
            return (
              <div key={s} style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 2,
                  background: state === 'done' ? C.ink : state === 'active' ? C.accent : C.line,
                  marginBottom: 5 }} />
                <div style={{ fontSize: 10,
                  color: state === 'pending' ? C.muted : C.ink,
                  fontWeight: state === 'active' ? 700 : 500 }}>{s}</div>
              </div>
            );
          })}
        </div>
      </div>
    </WPhone>
  );
}

window.C_PALETTE = C;
window.CNav = CNav;
window.C_Home = C_Home;
window.C_Capture = C_Capture;
window.C_Recognizing = C_Recognizing;
