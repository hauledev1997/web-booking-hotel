import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Register from './pages/register/Register';
import Login from './pages/Login/Login';
import HotelJustRead from './pages/hotelJustRead/Hotel';

import Booking from './pages/booking/Booking';
import Transaction from './pages/transaction/Transaction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/hotelJustRead/:id' element={<HotelJustRead />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/transaction' element={<Transaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
