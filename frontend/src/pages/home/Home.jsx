import { useLocation } from 'react-router-dom';
import Featured from '../../components/featured/Featured';
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import PropertyList from '../../components/propertyList/PropertyList';
import './home.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const location = useLocation();
  const userLogin = location.state ? location.state.data.user : null;
  const [user, setUser] = useState(userLogin);
  const [dataHotel, setDataHotel] = useState([]);
  const [dataHotelType, setDataHotelType] = useState([]);
  const [dataHotelRating, setDataHotelRating] = useState([]);
  useEffect(() => {
    const callAPI = async () => {
      const res = await fetch('http://localhost:5000/hotel');
      const data = await res.json();
      //show quanlity of hotel in HaNoi, HCM and DaNang
      const quanlityHaNoiHotel = data.filter(
        hotel => hotel.city === 'Ha Noi'
      ).length;
      console.log(quanlityHaNoiHotel);
      const quanlityHCMHotel = data.filter(
        hotel => hotel.city === 'Ho Chi Minh'
      ).length;
      const quanlityDaNangHotel = data.filter(
        hotel => hotel.city === 'Da Nang'
      ).length;
      const dataHotel1 = [
        {
          city: 'Ha Noi',
          count: quanlityHaNoiHotel,
          imgUrl: './images/HaNoi.jpg',
          id: 1,
        },
        {
          city: 'Ho Chi Minh',
          count: quanlityHCMHotel,
          imgUrl: './images/HCM.jpg',
          id: 2,
        },
        {
          city: 'Da Nang',
          count: quanlityDaNangHotel,
          imgUrl: './images/DaNang.jpg',
          id: 3,
        },
      ];
      setDataHotel(dataHotel1);

      //quanlity by type
      const typeHotel = data.filter(hotel => hotel.type === 'hotel').length;
      const typeApartments = data.filter(
        hotel => hotel.type === 'apartments'
      ).length;
      const typeResorts = data.filter(hotel => hotel.type === 'resorts').length;
      const typeVillas = data.filter(hotel => hotel.type === 'villas').length;
      const typeCabinets = data.filter(
        hotel => hotel.type === 'cabinets'
      ).length;
      const type = [
        {
          name: 'Hotel',
          count: typeHotel,
          imgUrl: './images/type_1.webp',
          id: 'i1',
        },
        {
          name: 'Apartments',
          count: typeApartments,
          imgUrl: './images/type_2.jpg',
          id: 'i2',
        },
        {
          name: 'Resorts',
          count: typeResorts,
          imgUrl: './images/type_3.jpg',
          id: 'i3',
        },
        {
          name: 'Villas',
          count: typeVillas,
          imgUrl: './images/type_4.jpg',
          id: 'i4',
        },
        {
          name: 'Cabinets',
          count: typeCabinets,
          imgUrl: './images/type_5.jpg',
          id: 'i5',
        },
      ];
      setDataHotelType(type);
      //hotel Rating
      const hotelRating = data.filter(hotel => hotel.featured === true);
      setDataHotelRating(hotelRating);
    };
    callAPI();
  }, []);
  return (
    <div>
      <Navbar user={user} />
      <Header user={user} />
      <div className='homeContainer'>
        <Featured hotel={dataHotel} />
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList type={dataHotelType} />
        <h1 className='homeTitle'>Homes guests love</h1>
        <FeaturedProperties rating={dataHotelRating} />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
