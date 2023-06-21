import './EditHotel.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../Admin/src/components/sidebar';

const EditHotel = () => {
  const [editHotel, setEditHotel] = useState({});
  const [roomName, setRoomName] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const hotelId = location.state.hotelId;

  useEffect(() => {
    fetch(`http://localhost:5000/admin/edit-hotel/${hotelId}`)
      .then(res => res.json())
      .then(data => {
        setEditHotel(data.hotel);
        setRoomName(data.roomName);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;

    setEditHotel({ ...editHotel, [name]: value });
  };
  console.log(editHotel);

  // edit hotel
  const handleEditHotel = e => {
    e.preventDefault();

    const postEditHotel = () => {
      console.log(editHotel);
      fetch(`http://localhost:5000/admin/edit-hotel/${hotelId}`, {
        method: 'POST',
        body: JSON.stringify(editHotel),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    postEditHotel();
    navigate('/hotels');
  };

  return (
    <div>
      <div className='nav'>
        <h3>Admin Page</h3>
      </div>
      <div className='dashboard__container'>
        <Sidebar />
        <div className='dashboardInfo'>
          <div>
            <div className='hotelInfo__board-title'>
              <h4>Edit Hotel</h4>
            </div>
            <div>
              <form>
                <div className='form-control'>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.name}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    name='city'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.city}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='distance'>Distance from City Center</label>
                  <input
                    type='text'
                    name='distance'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.distance}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='desc'>Description</label>
                  <input
                    type='text'
                    name='desc'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.desc}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='type'>Type</label>
                  <input
                    type='text'
                    name='type'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.type}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='address'>Address</label>
                  <input
                    type='text'
                    name='address'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.address}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='title'>Title</label>
                  <input
                    type='text'
                    name='title'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.title}
                  />
                </div>
                <div className='form-control'>
                  <label htmlFor='cheapestPrice'>Price</label>
                  <input
                    type='text'
                    name='cheapestPrice'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.cheapestPrice}
                  />
                </div>

                <div className='form-control'>
                  <label htmlFor='images'>Images</label>
                  <textarea
                    cols='20'
                    rows='7'
                    name='photos'
                    onChange={e => handleChange(e)}
                    defaultValue={editHotel.photos}></textarea>
                </div>
                <div className='form-control'>
                  <label htmlFor=''>Rooms</label>
                  <textarea
                    name='rooms'
                    id='rooms'
                    cols='20'
                    rows='7'
                    onChange={e => handleChange(e)}
                    defaultValue={
                      roomName ? roomName.join('\n') : roomName
                    }></textarea>
                </div>
                <div className='form-control'>
                  <label htmlFor='featured'>Featured</label>
                  <select
                    name='featured'
                    id='featured'
                    onChange={e => handleChange(e)}
                    value={editHotel.featured}>
                    <option value=''>Select</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <button
                  className='add-button'
                  onClick={e => handleEditHotel(e)}>
                  Update Hotel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
