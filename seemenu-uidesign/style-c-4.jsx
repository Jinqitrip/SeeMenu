// Style C — Extended pages (sequel set)

const CX = window.C_PALETTE;

// ─── 09 · 房间码输入 ────────────────────────────────────────
function C_JoinRoom() {
  const code = ['7', '3', 'K', ''];
  return (
    <WPhone bg="#fff">
      <CNav title="加入房间" />
      <div style={{ position: 'absolute', top: 130, left: 24, right: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: CX.ink, letterSpacing: -0.4 }}>
          输入房间码
        </div>
        <div style={{ fontSize: 13, color: CX.muted, marginTop: 6, lineHeight: '20px' }}>
          请向已经在房间的朋友要 4 位房间码
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 32, justifyContent: 'center' }}>
          {code.map((c, i) => (
            <div key={i} style={{
              width: 56, height: 64, borderRadius: 12,
              background: c ? '#fff' : CX.bg2,
              border: `1.5px solid ${i === 3 ? CX.accent : (c ? CX.line : 'transparent')}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 700, color: CX.ink,
              fontFamily: '"SF Mono", monospace',
              position: 'relative',
            }}>
              {c}
              {i === 3 && (
                <div style={{ position: 'absolute', width: 2, height: 26,
                  background: CX.accent, animation: 'none' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, padding: '14px 16px', background: CX.bg2, borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 16, background: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Ico.scan(CX.ink, 16)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: CX.ink }}>扫描朋友的二维码</div>
            <div style={{ fontSize: 11, color: CX.muted, marginTop: 1 }}>更快、不会输错</div>
          </div>
          <div style={{ fontSize: 12, color: CX.muted2 }}>›</div>
        </div>
      </div>

      {/* numeric keypad */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        background: CX.bg3, padding: '8px 0 24px' }}>
        {[['1','2','3'],['4','5','6'],['7','8','9'],['','0','⌫']].map((row, ri) => (
          <div key={ri} style={{ display: 'flex' }}>
            {row.map((k, ki) => (
              <div key={ki} style={{
                flex: 1, height: 44, margin: '4px',
                background: k === '' ? 'transparent' : '#fff',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 500, color: CX.ink,
                fontFamily: 'system-ui',
              }}>{k}</div>
            ))}
          </div>
        ))}
      </div>
    </WPhone>
  );
}

// ─── 10 · 拍完确认页 ────────────────────────────────────────
function C_PhotoReview() {
  return (
    <WPhone bg="#0a0805" statusDark>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(180deg, #1a1108 0%, #2a1a0c 100%)' }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 280, height: 380, background: '#f0e4c8',
          padding: '24px 22px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          fontFamily: '"Hiragino Mincho ProN", serif',
          borderRadius: 4,
        }}>
          <div style={{ textAlign: 'center', fontSize: 22, fontWeight: 700, color: '#2a1a08',
            letterSpacing: 3 }}>麺処 つばき</div>
          <div style={{ height: 1.5, background: '#2a1a08', margin: '14px 30px' }} />
          {[['豚骨ラーメン','¥1,180'],['醤油ラーメン','¥1,080'],['味噌ラーメン','¥1,180'],
            ['つけ麺','¥1,280'],['焼き餃子','¥580'],['鶏の唐揚げ','¥780'],
            ['枝豆','¥380'],['チャーシュー丼','¥880'],['味付け玉子','¥180']].map(([n,p],i)=>(
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between',
              fontSize: 12, color: '#2a1a08', padding: '5px 0' }}>
              <span>{n}</span><span style={{ fontFamily: 'monospace' }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* top bar */}
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 10, zIndex: 5 }}>
        <div style={{ width: 32, height: 32, borderRadius: 16,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Ico.back('#fff', 16)}
        </div>
        <div style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#fff', textAlign: 'center' }}>
          预览
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 16,
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)',
          fontSize: 11, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          重拍
        </div>
      </div>

      {/* tip */}
      <div style={{ position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)', padding: '8px 14px', borderRadius: 999,
        fontSize: 12, color: CX.ink, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 6, zIndex: 5 }}>
        ✓ 已拍清晰
      </div>

      {/* footer actions */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.85) 50%)',
        padding: '0 20px 36px',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
          确认无误后开始 AI 识别（约需 5–10 秒）
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, height: 48, background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(20px)',
            borderRadius: 24, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 600 }}>重拍</div>
          <div style={{ flex: 2, height: 48, background: CX.accent,
            borderRadius: 24, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 8, fontSize: 14, fontWeight: 600 }}>
            {Ico.sparkle('#fff', 16)} 开始识别
          </div>
        </div>
      </div>
    </WPhone>
  );
}

// ─── 11 · 识别失败 ────────────────────────────────────────
function C_RecognizeFail() {
  return (
    <WPhone bg="#fff">
      <CNav title="识别中" />
      <div style={{ position: 'absolute', top: 130, left: 0, right: 0, bottom: 100,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 32px' }}>
        <div style={{ width: 88, height: 88, borderRadius: 44, background: CX.bg2,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke={CX.muted} strokeWidth="2"/>
            <path d="M20 12v10M20 26v2" stroke={CX.muted} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, color: CX.ink, marginBottom: 6 }}>
          没能识别这张菜单
        </div>
        <div style={{ fontSize: 13, lineHeight: '20px', color: CX.muted, textAlign: 'center' }}>
          照片可能模糊、反光或角度倾斜<br/>
          试试重新拍一张，把菜单铺平、光线充足
        </div>

        {/* tips */}
        <div style={{ width: '100%', marginTop: 24, background: CX.bg2, borderRadius: 12,
          padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: CX.ink, marginBottom: 8,
            textTransform: 'uppercase', letterSpacing: 0.5 }}>拍照小提示</div>
          {[
            '把菜单整体放进取景框',
            '保持手机平稳，避免抖动',
            '尽量正面拍摄，不要倾斜',
            '光线充足、避免反光',
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0',
              fontSize: 12, color: CX.ink2 }}>
              <span style={{ color: CX.accent, fontWeight: 700 }}>·</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '12px 20px 28px', background: '#fff',
        borderTop: `0.5px solid ${CX.line}`,
        display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, height: 48, borderRadius: 24,
          border: `1px solid ${CX.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600, color: CX.ink }}>从相册选</div>
        <div style={{ flex: 1, height: 48, borderRadius: 24, background: CX.ink, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600 }}>重新拍</div>
      </div>
    </WPhone>
  );
}

// ─── 12 · 房间二维码弹窗 ────────────────────────────────────
function C_RoomQR() {
  return (
    <WPhone bg="rgba(0,0,0,0.5)">
      {/* dimmed bg */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(8px)' }} />

      {/* sheet */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff', borderRadius: '24px 24px 0 0',
        padding: '12px 24px 32px' }}>
        <div style={{ width: 36, height: 4, background: CX.line, borderRadius: 2,
          margin: '0 auto 18px' }} />

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: CX.ink }}>邀请朋友加入</div>
          <div style={{ fontSize: 12, color: CX.muted, marginTop: 4 }}>
            扫码即可看到同一份菜单
          </div>
        </div>

        {/* QR-style block */}
        <div style={{ width: 200, height: 200, margin: '24px auto 0',
          background: '#fff',
          border: `1px solid ${CX.line}`, borderRadius: 14, padding: 14,
          position: 'relative' }}>
          <div style={{
            width: '100%', height: '100%',
            backgroundImage: `
              radial-gradient(circle at 20px 20px, ${CX.ink} 1px, transparent 1.5px),
              radial-gradient(circle at 30px 20px, ${CX.ink} 1px, transparent 1.5px),
              radial-gradient(circle at 40px 30px, ${CX.ink} 1px, transparent 1.5px),
              radial-gradient(circle at 60px 40px, ${CX.ink} 1px, transparent 1.5px)
            `,
            backgroundColor: '#fff',
            backgroundSize: '10px 10px',
            position: 'relative', borderRadius: 4,
          }}>
            {/* corners */}
            {[[0,0],[0,'r'],['b',0]].map(([t,r], i) => (
              <div key={i} style={{
                position: 'absolute',
                top: t === 'b' ? 'auto' : t,
                bottom: t === 'b' ? 0 : 'auto',
                left: r === 'r' ? 'auto' : 0,
                right: r === 'r' ? 0 : 'auto',
                width: 36, height: 36,
                border: `4px solid ${CX.ink}`, borderRadius: 4, background: '#fff',
              }}>
                <div style={{ width: 12, height: 12, background: CX.ink,
                  margin: '8px auto', borderRadius: 1 }} />
              </div>
            ))}
            {/* center logo */}
            <div style={{ position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 36, height: 36, borderRadius: 10,
              background: CX.accent, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 700,
              boxShadow: `0 0 0 4px #fff` }}>看</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <div style={{ fontSize: 11, color: CX.muted, letterSpacing: 2 }}>ROOM CODE</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: CX.ink,
            fontFamily: '"SF Mono", monospace', letterSpacing: 6, marginTop: 2 }}>73KQ</div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, height: 44, borderRadius: 22,
            background: CX.bg2, color: CX.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600, gap: 6 }}>
            {Ico.share(CX.ink, 14)} 微信分享
          </div>
          <div style={{ flex: 1, height: 44, borderRadius: 22,
            background: CX.ink, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 600 }}>保存图片</div>
        </div>
      </div>
    </WPhone>
  );
}

window.C_JoinRoom = C_JoinRoom;
window.C_PhotoReview = C_PhotoReview;
window.C_RecognizeFail = C_RecognizeFail;
window.C_RoomQR = C_RoomQR;
