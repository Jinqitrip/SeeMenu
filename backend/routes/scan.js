import { Router } from 'express';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

const MOCK_ITEMS = [
  { jp: '豚骨ラーメン', cn: '豚骨拉面', price: '¥1,180' },
  { jp: '醤油ラーメン', cn: '酱油拉面', price: '¥1,080' },
  { jp: '味噌ラーメン', cn: '味噌拉面', price: '¥1,180' },
  { jp: 'つけ麺',       cn: '蘸汁拉面', price: '¥1,280' },
  { jp: '焼き餃子',     cn: '煎饺',     price: '¥580'   },
  { jp: '鶏の唐揚げ',   cn: '日式炸鸡', price: '¥780'   },
  { jp: '枝豆',         cn: '盐煮毛豆', price: '¥380'   },
  { jp: 'チャーシュー丼', cn: '叉烧饭', price: '¥880'   },
  { jp: '味付け玉子',   cn: '溏心卤蛋', price: '¥180'   },
];

// POST /api/scan — simulates AI recognition with SSE progress
router.post('/progress', upload.single('photo'), (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const steps = ['识别', '翻译', '配图', '整理'];
  let stepIdx = 0;
  let itemIdx = 0;

  const tick = setInterval(() => {
    if (itemIdx < MOCK_ITEMS.length) {
      const item = MOCK_ITEMS[itemIdx];
      res.write(`data: ${JSON.stringify({
        type: 'item',
        item,
        progress: Math.round(((itemIdx + 1) / MOCK_ITEMS.length) * 100),
        step: steps[Math.min(stepIdx, steps.length - 1)],
        stepIdx,
        total: MOCK_ITEMS.length,
        done: itemIdx + 1,
      })}\n\n`);
      itemIdx++;
      if (itemIdx % 3 === 0) stepIdx = Math.min(stepIdx + 1, steps.length - 1);
    } else {
      res.write(`data: ${JSON.stringify({ type: 'done', items: MOCK_ITEMS })}\n\n`);
      clearInterval(tick);
      res.end();
    }
  }, 400);

  req.on('close', () => clearInterval(tick));
});

export default router;
