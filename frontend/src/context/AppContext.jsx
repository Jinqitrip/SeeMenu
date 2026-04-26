import { createContext, useContext, useState } from 'react';
import { SAMPLE_MENU, MENU_BY_ID } from '../data.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState({});
  const [notes, setNotes] = useState({});
  const [roomCode, setRoomCode] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [nickname, setNickname] = useState('我');
  const [menuData] = useState(SAMPLE_MENU);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const addItem = (id) => setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeItem = (id) => setCart(c => {
    const next = { ...c };
    if ((next[id] || 0) > 1) next[id]--;
    else delete next[id];
    return next;
  });
  const setNote = (id, note) => setNotes(n => ({ ...n, [id]: note }));
  const clearCart = () => { setCart({}); setNotes({}); };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const dish = MENU_BY_ID[id];
    if (!dish) return sum;
    return sum + parseInt(dish.price.replace(/[^\d]/g, '')) * qty;
  }, 0);

  const cartLines = Object.entries(cart)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ id, qty, dish: MENU_BY_ID[id], note: notes[id] || '' }));

  return (
    <AppContext.Provider value={{
      cart, addItem, removeItem, setNote, clearCart,
      cartCount, cartTotal, cartLines,
      roomCode, setRoomCode,
      memberId, setMemberId,
      nickname, setNickname,
      menuData,
      capturedPhoto, setCapturedPhoto,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
