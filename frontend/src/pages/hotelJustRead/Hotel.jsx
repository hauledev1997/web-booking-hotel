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

  const param = useParams();
  const idHotel = param.id;
  const location = useLocation();

  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch(`http://localhost:5000/hotel/${idHotel}`);
      const data = await res.json();
      setHotelDetail(data);
      setPhoto(data.photos);
    };
    callAPI();
  }, []);

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
              {/* <button onClick={() => handleBooking()}>
                Reserve or Book Now!
              </button> */}
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
