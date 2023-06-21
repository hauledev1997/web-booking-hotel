import './featuredProperties.css';

const FeaturedProperties = ({ rating }) => {
  return (
    <div className='fp'>
      {rating.map(hotel => (
        <div className='fpItem' key={hotel._id}>
          <img src={hotel.photos[3]} className='fpImg' />
          <span className='fpName'>
            <a href={`./hotelJustRead/${hotel._id}`} target='_blank'>
              {hotel.title}
            </a>
          </span>
          <span className='fpCity'>{hotel.city}</span>
          <span className='fpPrice'>{`Starting from $${hotel.cheapestPrice}`}</span>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
