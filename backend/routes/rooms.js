import { Router } from 'express';

const router = Router();

// In-memory store: roomCode -> { members, sseClients }
const rooms = new Map();

function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function broadcast(code, data) {
  const room = rooms.get(code);
  if (!room) return;
  const msg = `data: ${JSON.stringify(data)}\n\n`;
  room.sseClients.forEach(res => res.write(msg));
}

// POST /api/rooms — create room
router.post('/', (req, res) => {
  let code;
  do { code = genCode(); } while (rooms.has(code));
  rooms.set(code, {
    code,
    restaurant: req.body.restaurant || '麺処 つばき',
    createdAt: Date.now(),
    members: [],
    sseClients: new Set(),
  });
  res.json({ code });
});

// GET /api/rooms/:code
router.get('/:code', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: 'room not found' });
  const { sseClients, ...safe } = room;
  res.json(safe);
});

// POST /api/rooms/:code/join
router.post('/:code/join', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: 'room not found' });
  const { nickname } = req.body;
  if (!nickname) return res.status(400).json({ error: 'nickname required' });
  const existing = room.members.find(m => m.nickname === nickname);
  if (existing) return res.json({ member: existing });
  const member = { id: `u_${Date.now()}`, nickname, selections: [], joinedAt: Date.now() };
  room.members.push(member);
  broadcast(req.params.code.toUpperCase(), { type: 'member_joined', member });
  res.json({ member });
});

// PUT /api/rooms/:code/selections
router.put('/:code/selections', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: 'room not found' });
  const { memberId, selections } = req.body;
  const member = room.members.find(m => m.id === memberId);
  if (!member) return res.status(404).json({ error: 'member not found' });
  member.selections = selections;
  broadcast(req.params.code.toUpperCase(), { type: 'selections_updated', memberId, selections });
  res.json({ ok: true });
});

// GET /api/rooms/:code/order — aggregate order
router.get('/:code/order', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).json({ error: 'room not found' });
  const agg = new Map();
  room.members.forEach(m => {
    m.selections.forEach(sel => {
      const key = sel.id + (sel.note || '');
      if (agg.has(key)) {
        agg.get(key).qty += sel.qty;
        agg.get(key).by.push(m.nickname);
      } else {
        agg.set(key, { ...sel, by: [m.nickname] });
      }
    });
  });
  res.json({ items: Array.from(agg.values()), members: room.members.length });
});

// GET /api/rooms/:code/events — SSE
router.get('/:code/events', (req, res) => {
  const room = rooms.get(req.params.code.toUpperCase());
  if (!room) return res.status(404).end();
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  room.sseClients.add(res);
  res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
  req.on('close', () => room.sseClients.delete(res));
});

export default router;
