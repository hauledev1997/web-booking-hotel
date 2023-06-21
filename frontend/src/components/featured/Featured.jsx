import './featured.css';

const Featured = ({ hotel }) => {
  return (
    <div className='featured'>
      {hotel.map(city => (
        <div className='featuredItem' key={city.id}>
          <img src={city.imgUrl} className='featuredImg' />
          <div className='featuredTitles'>
            <h1>{city.city}</h1>
            <h2>{`${city.count} properties`}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
