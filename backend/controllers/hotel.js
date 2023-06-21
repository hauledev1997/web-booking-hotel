const Hotel = require('../models/hotel');
const Room = require('../models/room');

exports.getHotel = (req, res, next) => {
  Hotel.find()
    .then(hotel => {
      res.status(200).json(hotel);
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getDetailHotel = (req, res, next) => {
  console.log('ok55');

  const id = req.params.id;
  Hotel.findById(id)
    .then(hotel => {
      res.status(200).json(hotel);
    })
    .catch(err => {
      console.log(err);
    });
};
// exports.postHotelFromId = (req, res, next) => {
//   console.log('ok55');

//   const id = req.body;
//   Hotel.findById(id)
//     .then(hotel => {
//       res.status(200).json(hotel);
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

exports.postSearch = (req, res, next) => {
  console.log('ok post');

  const destination = req.body.destination.replace(/(^\w|\s\w)/g, m =>
    m.toUpperCase()
  );
  console.log(destination);

  const guest = req.body.options.adult + req.body.options.children;

  Room.find({ maxPeople: { $gte: guest } })
    .then(rooms => {
      const roomIdFormat = rooms.map(room => room._id.toString());

      Hotel.find({ city: destination }).then(hotels => {
        const hotelAvailable = hotels.filter(hotel => {
          for (let i = 0; i < roomIdFormat.length; i++) {
            if (hotel.rooms.includes(roomIdFormat[i])) {
              return hotel;
            }
          }
        });

        res.json(hotelAvailable);
      });
    })
    .catch(err => console.log(err));
};

exports.postRoom = (req, res, next) => {
  const { id } = req.body;
  const numOfPeople = req.body.options.adult + req.body.options.children;

  Room.find({ _id: { $in: id } })
    .then(hotel => {
      res
        .status(200)
        .send(hotel.filter(hotel => hotel.maxPeople >= numOfPeople));
    })
    .catch(err => console.log(err));
};
