import { Fragment } from 'react';
import './searchItem.css';
import { useNavigate } from 'react-router-dom';

const SearchItem = ({
  hotel,
  name,
  distance,
  tag,
  type,
  description,
  free_cancel,
  price,
  rate,
  rate_text,
  img_url,
  date,
  user,
  options,
}) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {hotel.map(hotel => (
        <div className='searchItem'>
          <img src={hotel.photos[2]} alt='' className='siImg' />
          <div className='siDesc'>
            <h1 className='siTitle'>{hotel.name}</h1>
            <span className='siDistance'>{hotel.distance} from center</span>
            <span className='siTaxiOp'>{tag}</span>
            <span className='siSubtitle'>{hotel.desc}</span>
            <span className='siFeatures'>{hotel.type}</span>
            {/* If can cancel */}
            {free_cancel ? (
              <div>
                <span className='siCancelOp'>Free cancellation </span>
                <span className='siCancelOpSubtitle'>
                  You can cancel later, so lock in this great price today!
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className='siDetails'>
            <div className='siRating'>
              <span>{rate_text}</span>
              <button>{rate}</button>
            </div>
            <div className='siDetailTexts'>
              <span className='siPrice'>${hotel.cheapestPrice}</span>
              <span className='siTaxOp'>Includes taxes and fees</span>
              <button
                className='siCheckButton'
                onClick={() => {
                  navigate(`/hotels/${hotel._id}`, {
                    state: { user, options, date, hotel },
                  });
                }}>
                See availability
              </button>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
};

export default SearchItem;
