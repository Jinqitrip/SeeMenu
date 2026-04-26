import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Home from './pages/Home.jsx';
import Capture from './pages/Capture.jsx';
import PhotoReview from './pages/PhotoReview.jsx';
import Recognizing from './pages/Recognizing.jsx';
import RecognizeFail from './pages/RecognizeFail.jsx';
import Menu from './pages/Menu.jsx';
import Detail from './pages/Detail.jsx';
import Cart from './pages/Cart.jsx';
import Room from './pages/Room.jsx';
import RoomQR from './pages/RoomQR.jsx';
import JoinRoom from './pages/JoinRoom.jsx';
import Order from './pages/Order.jsx';
import OrderShow from './pages/OrderShow.jsx';
import Profile from './pages/Profile.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/photo-review" element={<PhotoReview />} />
            <Route path="/recognizing" element={<Recognizing />} />
            <Route path="/recognize-fail" element={<RecognizeFail />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/room" element={<Room />} />
            <Route path="/room/qr" element={<RoomQR />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/order" element={<Order />} />
            <Route path="/order/show" element={<OrderShow />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
