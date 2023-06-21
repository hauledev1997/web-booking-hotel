import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotelDetail, setHotelDetail] = useState({});
  const [photo, setPhoto] = useState([]);

  const navigate = useNavigate();
  const param = useParams();
  const idHotel = param.id;
  const location = useLocation();

  const user = location.state.user;
  const date = location.state.date;
  const options = location.state.options;
  const startDate = new Date(date[0].startDate);
  const endDate = new Date(date[0].endDate);
  const hotel = location.state.hotel;
  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch(`http://localhost:5000/hotel/${idHotel}`);
      const data = await res.json();
      setHotelDetail(data);
      setPhoto(data.photos);
    };
    callAPI();
  }, []);
  // const photos = [
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
  //   },
  //   {
  //     src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
  //   },
  // ];

  const handleOpen = i => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = direction => {
    let newSlideNumber;

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? photo.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photo.length - 1 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };
  const handleBooking = () => {
    navigate('/booking', { state: { date, user, hotelDetail, options } });
  };

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className='hotelContainer'>
        {open && (
          <div className='slider'>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className='close'
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className='arrow'
              onClick={() => handleMove('l')}
            />
            <div className='sliderWrapper'>
              <img src={photo[slideNumber]} alt='' className='sliderImg' />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className='arrow'
              onClick={() => handleMove('r')}
            />
          </div>
        )}
        <div className='hotelWrapper'>
          <button className='bookNow'>Reserve or Book Now!</button>
          <h1 className='hotelTitle'>{hotelDetail.name}</h1>
          <div className='hotelAddress'>
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotelDetail.address}</span>
          </div>
          <span className='hotelDistance'>
            {`Excellent location – ${hotelDetail.distance}m from center
            `}
          </span>
          <span className='hotelPriceHighlight'>
            {`Book a stay over ${hotelDetail.cheapestPrice} at this property and get a free airport taxi`}
          </span>
          <div className='hotelImages'>
            {photo.map((photo, i) => (
              <div className='hotelImgWrapper' key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=''
                  className='hotelImg'
                />
              </div>
            ))}
          </div>
          <div className='hotelDetails'>
            <div className='hotelDetailsTexts'>
              <h1 className='hotelTitle'>Stay in the heart of City</h1>
              <p className='hotelDesc'>{hotelDetail.desc}</p>
            </div>
            <div className='hotelDetailsPrice'>
              <h1>Perfect for a 1-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${hotelDetail.cheapestPrice}</b> (1 nights)
              </h2>
              <button onClick={() => handleBooking()}>
                Reserve or Book Now!
              </button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
