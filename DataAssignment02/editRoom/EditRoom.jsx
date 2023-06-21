import "./EditRoom.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar";

const EditRoom = () => {
  const [hotels, setHotels] = useState([]);
  const [editRoom, setEditRoom] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const roomId = location.state.roomId;
  

  useEffect(() => {
    fetch("http://localhost:5000/admin/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/admin/edit-room/${roomId}`)
      .then((res) => res.json())
      .then((data) => setEditRoom(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditRoom({ ...editRoom, [name]: value });
  };

  const handleEditRoom = (e) => {
    e.preventDefault();

    const postEditRoom = () => {
      fetch(`http://localhost:5000/admin/edit-room/${roomId}`, {
        method: "POST",
        body: JSON.stringify(editRoom),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    postEditRoom();
    navigate("/rooms");
  };

  return (
    <div>
      <div className="nav">
        <h3>Admin Page</h3>
      </div>
      <div className="dashboard__container">
        <Sidebar />
        <div className="dashboardInfo">
          <div>
            <div className="hotelInfo__board-title">
              <h4>Edit Room</h4>
            </div>
            <div>
              <form>
                <div className="form-control">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    name="title"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editRoom.title}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="desc">Description</label>
                  <input
                    type="text"
                    name="desc"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editRoom.desc}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    name="price"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editRoom.price}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="maxPeople">Max People</label>
                  <input
                    type="text"
                    name="maxPeople"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editRoom.maxPeople}
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="hotel">Hotel</label>
                  <select
                    name="hotel"
                    id="hotel"
                    onChange={(e) => handleChange(e)}
                    value={editRoom.hotel}
                  >
                    <option>Select</option>
                    {hotels.map((hotel, i) => (
                      <option key={i} value={hotel.name}>
                        {hotel.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label htmlFor="rooms">Rooms</label>
                  <textarea
                    cols="20"
                    rows="7"
                    name="photos"
                    onChange={(e) => handleChange(e)}
                    defaultValue={editRoom.roomNumbers}
                  ></textarea>
                </div>

                <button
                  className="add-button"
                  onClick={(e) => handleEditRoom(e)}
                >
                  Update Room
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
