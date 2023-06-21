import './Booking.css';
import { DateRange } from 'react-date-range';
import Navbar from '../../components/navbar/Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [date, setDate] = useState([
    {
      startDate: location.state.date[0].startDate,
      endDate: location.state.date[0].endDate,
      key: 'selection',
    },
  ]);
  const [info, setInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
  });
  const [rooms, setRooms] = useState([]);
  const [price, setPrice] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(0);
  const [roomNumber, setRoomNumber] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  // const [dateRent, setDateRent] = useState(
  //   Math.ceil(
  //     new Date(
  //       date[0].endDate.getTime() - new Date(date[0].startDate.getTime())
  //     ) /
  //       (24 * 3600 * 1000)
  //   )
  // );
  // console.log(dateRent);

  const user = location.state.user;
  const hotel = location.state.hotelDetail;
  const options = location.state.options;
  // Search room
  useEffect(() => {
    const roomId = {
      id: hotel.rooms,
      options: options,
    };

    const postRoom = () => {
      fetch('http://localhost:5000/room', {
        method: 'POST',
        body: JSON.stringify(roomId),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          setRooms(data);
        })
        .catch(err => console.log(err));
    };

    postRoom();
  }, []);

  // set total bill
  useEffect(() => {
    let total = 0;
    for (let i = 0; i < price.length; i++) {
      total =
        total +
        price[i] *
          Math.ceil(
            new Date(
              date[0].endDate.getTime() - new Date(date[0].startDate.getTime())
            ) /
              (24 * 3600 * 1000)
          );
    }
    setTotalBill(total);
  }, [price, date, selectedRoom]);

  // selected room
  const handleChange = (e, roomPrice) => {
    let isChecked = e.target.checked;
    console.log(isChecked);
    let roomNum = +e.target.value;
    console.log(roomNum);

    let priceOfRoom = roomPrice;
    //  checked room selected
    if (isChecked) {
      setSelectedRoom(selectedRoom + 1);
      setPrice(prev => [...prev, priceOfRoom]);
      setRoomNumber(prev => [...prev, roomNum]);
    } else {
      setSelectedRoom(selectedRoom - 1);
      price.splice(-1);
      setPrice(price);
      roomNumber.pop();
      setRoomNumber(roomNumber);
    }
  };

  // select method payment
  const handleSelectMethod = e => {
    setPaymentMethod(e.target.value);
  };

  const handleReserve = () => {
    if (!user) {
      alert('You must sign in to make reservation!');
    } else {
      const data = {
        user: user.userName,
        hotel: hotel._id,
        room: roomNumber,
        dateStart: date[0].startDate,
        dateEnd: date[0].endDate,
        price: totalBill,
        payment: paymentMethod,
        status: 'booked',
      };
      const postReservation = () => {
        fetch('http://localhost:5000/reservation', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.log(err));
      };
      postReservation();
      navigate('/transaction', { state: { user, hotel, roomNumber } });
    }
  };
  return (
    <div>
      <Navbar />
      <div className='wrapper'>
        <div className='hotel'>
          <div className='hotel__details'>
            <h1>{hotel.name}</h1>
            <p>{hotel.desc}</p>
          </div>
          <div className='hotel_booking'>
            <div className='box'>
              <h1>${hotel.cheapestPrice} (1 night)</h1>
              <button className='upper-button'>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <div className='date__info'>
          <div className='date__info-date'>
            <h1>Dates</h1>
            <DateRange
              onChange={item => setDate([item.selection])}
              showSelectionPreview={true}
              ranges={date}
              direction='horizontal'
              // moveRangeOnFirstSelection={false}
            />
          </div>
          <div className='date__info-info'>
            <h1>Reserve Info</h1>
            <form action=''>
              <div className='date__info-info-input'>
                <label>Your Full Name:</label>
                <input
                  type='text'
                  placeholder='Full Name'
                  name='fullName'
                  onChange={e => setInfo({ ...info, fullName: e.target.value })}
                />
              </div>
              <div className='date__info-info-input'>
                <label>Your Email:</label>
                <input
                  type='text'
                  placeholder='Email'
                  name='email'
                  onChange={e => setInfo({ ...info, email: e.target.value })}
                />
              </div>
              <div className='date__info-info-input'>
                <label>Your Phone Number:</label>
                <input
                  type='text'
                  placeholder='Phone Number'
                  name='phone'
                  onChange={e =>
                    setInfo({ ...info, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className='date__info-info-input'>
                <label>Your Indentity Card Number:</label>
                <input
                  type='text'
                  placeholder='Indentity Card Number'
                  name='idNumber'
                  onChange={e => setInfo({ ...info, idNumber: e.target.value })}
                />
              </div>
            </form>
          </div>
        </div>
        <div className='room'>
          <h1 className='padding'>Select Rooms</h1>
          <div className='room__type'>
            {rooms ? (
              rooms.map(room => (
                <div className='room__type_n' key={room._id}>
                  <div className='room__type-info'>
                    <h3>{room.title}</h3>
                    <p>{room.desc}</p>
                    <p>
                      Max people : <span>{room.maxPeople}</span>
                    </p>
                    <h3>${room.price}</h3>
                  </div>
                  <div className='room_type-number'>
                    <ul className='room_type-number-list'>
                      {room.roomNumbers.map(n => (
                        <li key={n}>
                          <label htmlFor={n}>{n}</label>
                          <input
                            type='checkbox'
                            value={n}
                            onChange={e => handleChange(e, room.price)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <div className='room__type_n'>
                <div className='room__type-info'>
                  <h3>Budget Double Room</h3>
                  <p>Pay nothing until Septermber 04, 2000</p>
                  <p>
                    Max people : <span>2</span>
                  </p>
                  <h3>$350</h3>
                </div>
                <div className='room_type-number'>
                  <ul className='room_type-number-list'>
                    <li>
                      <label htmlFor=''>101</label>
                      <input type='checkbox' />
                    </li>
                    <li>
                      <label htmlFor=''>201</label>
                      <input type='checkbox' />
                    </li>
                    <li>
                      <label htmlFor=''>202</label>
                      <input type='checkbox' />
                    </li>
                    <li>
                      <label htmlFor=''>101</label>
                      <input type='checkbox' />
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='payment'>
          <h1>Total Bill: ${totalBill}</h1>
          <div className='payment__details'>
            <div className='payment__details-method'>
              <select
                name='payment-method'
                id='payment-method'
                onChange={e => handleSelectMethod(e)}>
                <option value='Select Payment Method'>
                  Select Payment Method
                </option>
                <option value='Credit Card'>Credit Card</option>
                <option value='Cash'>Cash</option>
              </select>
            </div>
            <div className='payment__details-reserve'>
              <button onClick={() => handleReserve()}>Reserve Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
