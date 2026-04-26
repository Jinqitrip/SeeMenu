import { useNavigate } from 'react-router-dom';
import C from '../theme.js';
import Ico from './Icons.jsx';

export default function CNav({ title, sub, right, back = true, onBack }) {
  const navigate = useNavigate();
  const handleBack = onBack || (() => navigate(-1));
  return (
    <div style={{
      position: 'absolute', top: 54, left: 0, right: 0,
      height: 44, padding: '0 16px',
      display: 'flex', alignItems: 'center', gap: 8,
      background: C.bg, zIndex: 5,
    }}>
      {back && (
        <button onClick={handleBack} style={{
          width: 28, height: 28, borderRadius: 14, border: 'none', background: 'transparent',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0,
        }}>
          {Ico.back(C.ink, 18)}
        </button>
      )}
      <div style={{ flex: 1, textAlign: back ? 'center' : 'left' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: C.ink }}>{title}</div>
        {sub && <div style={{ fontSize: 10, color: C.muted, marginTop: -1 }}>{sub}</div>}
      </div>
      {right || <div style={{ width: 28 }} />}
    </div>
  );
}
