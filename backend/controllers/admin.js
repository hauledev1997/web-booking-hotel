const mongodb = require('mongodb');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Hotel = require('../models/hotel');
const Room = require('../models/room');

// User
exports.postAdminLogin = (req, res, next) => {
  console.log('post method run');
  const { username, password } = req.body;

  User.find({ isAdmin: true })
    .then(user => {
      if (user.length > 0) {
        if (user[0].passWord === password && user[0].userName === username) {
          req.user = user[0];
          return res.status(200).send(user[0]);
        } else {
          return res.status(400).json({ message: 'Password Is Not Correct' });
        }
      } else {
        return res.status(400).json({ message: 'User Not Found' });
      }
    })
    .catch(err => console.log(err));
};

exports.getUsersByAdmin = (req, res, next) => {
  User.find()
    .then(users => res.status(200).json(users))
    .catch(err => console.log(err));
};
exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then(hotel => res.status(200).json(hotel))
    .catch(err => console.log(err));
};

exports.postHotel = (req, res, next) => {
  const {
    name,
    city,
    distance,
    desc,
    photos,
    type,
    address,
    title,
    cheapestPrice,
    rooms,
  } = req.body;
  const featured = req.body.featured === 'true' ? true : false;

  Room.find({ title: { $in: rooms.split(/\n/) } })
    .then(rooms => {
      let roomIds = [];
      rooms.map(room => roomIds.push(room._id.toString()));
      const hotel = new Hotel({
        name: name,
        city: city,
        distance: distance,
        desc: desc,
        photos: photos.split(/\n/),
        type: type,
        address: address,
        title: title,
        cheapestPrice: cheapestPrice,
        rooms: roomIds,
        featured: featured,
      });

      hotel
        .save()
        .then(result =>
          res.status(200).send(JSON.stringify({ message: 'Added hotel' }))
        )
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

//DELETED HOTEL---------------------------------------

exports.postDeleteHotel = (req, res, next) => {
  const id = req.body.id;
  Transaction.find({ hotel: new mongodb.ObjectId(id) })
    .then(trans => {
      if (trans.length > 0) {
        res
          .status(400)
          .send(
            JSON.stringify({ message: 'Cannot Delete! Have a transactions!' })
          );
      } else {
        Hotel.findOne({ _id: id })
          .then(hotel => {
            hotel.delete();
            res.status(200).send(JSON.stringify({ message: 'Deleted hotel' }));
          })
          .catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
};

// room
exports.getRooms = (req, res, next) => {
  Room.find()
    .then(rooms => {
      res.status(200).send(rooms);
    })
    .catch(err => console.log(err));
};

//ADD ROOM-------------------------

exports.postRoom = (req, res, next) => {
  const { title, desc, price, maxPeople, hotel, rooms } = req.body;

  const room = new Room({
    title: title,
    price: price,
    desc: desc,
    maxPeople: maxPeople,
    // roomNumbers: rooms.split(/\n/),
    roomNumbers: rooms.split(','),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  room
    .save()
    .then(result => {
      console.log(result);
      Hotel.findOne({ name: hotel }).then(hotel => {
        hotel.rooms.push(result.id);``
        hotel.save().then(() => console.log('Added Room'));
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteRoom = (req, res, next) => {
  const id = req.body.id;
  Room.findOne({ _id: id })
    .then(room => {
      // console.log(room);
      Transaction.find({ room: { $in: room.roomNumbers } }).then(trans => {
        console.log(trans);
        if (trans.length > 0) {
          res.status(400).send(
            JSON.stringify({
              message: 'Cannot delete room! Have a transaction',
            })
          );
        } else {
          room.delete();
          res.status(200).send(JSON.stringify({ message: 'Deleted Room' }));
        }
      });
    })
    .catch(err => console.log(err));
};

// // transaction
exports.getLatestTransactions = (req, res, next) => {
  Transaction.find()
    .populate('hotel', 'title')
    .then(transactions => {
      const data = {
        transactions: transactions
          .sort((a, b) => b.dateCreated - a.dateCreated)
          .splice(0, 8),
      };

      res.status(200).send(data);
    })

    .catch(err => console.log(err));
};
// paging for all of transactions

const paging = (transactions, page) => {
  const startIndex = (page - 1) * 9;
  const endIndex = page * 9;

  const transList = {};
  const transOfPage = transactions.slice(startIndex, endIndex);

  transList.page = page;
  transList.transOfPage = transOfPage;
  transList.totalPage = Math.ceil(transactions.length / 9);

  return transList;
};

exports.getTransactions = (req, res, next) => {
  const page = req.query.page ? req.query.page : 1;

  Transaction.find()
    .populate('hotel')
    .then(trans => {
      let result = paging(trans, page);
      res.status(200).send(result);
    })
    .catch(err => console.log(err));
};

// edit------------------------------------

// exports.getEditHotel = (req, res, next) => {
//   const { hotelId } = req.params;

//   Hotel.findOne({ _id: hotelId })
//     .then(hotel => {
//       let results = {};
//       results.hotel = hotel;

//       Room.find({ _id: { $in: hotel.rooms } }).then(rooms => {
//         results.roomName = rooms.map(room => room.title);
//         res.status(200).send(results);
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.postEditHotel = (req, res, next) => {
//   const regex = /\n/;
//   const id = req.params.hotelId;
//   const {
//     name,
//     type,
//     city,
//     address,
//     photos,
//     rooms,
//     cheapestPrice,
//     distance,
//     desc,
//     title,
//     featured,
//   } = req.body;

//   Room.find({
//     title: { $in: typeof rooms == 'string' ? rooms.split(regex) : rooms },
//   })
//     .then(rooms => {
//       let roomIds = [];
//       rooms.map(room => {
//         roomIds.push(room._id.toString());
//       });

//       Hotel.findOne({ _id: id }).then(hotel => {
//         hotel.name = name;
//         hotel.type = type;
//         hotel.city = city;
//         hotel.address = address;
//         hotel.photos = photos;
//         hotel.rooms = roomIds;
//         hotel.cheapestPrice = cheapestPrice;
//         hotel.distance = distance;
//         hotel.desc = desc;
//         hotel.title = title;
//         hotel.featured = featured;
//         hotel.save();
//         res.status(200).send(JSON.stringify({ message: 'Hotel Updated!' }));
//       });
//     })
//     .catch(err => console.log(err));
// };

// exports.getEditRoom = (req, res, next) => {
//   const { roomId } = req.params;

//   Room.findOne({ _id: roomId })
//     .then(room => res.status(200).send(room))
//     .catch(err => console.log(err));
// };

// exports.postEditRoom = (req, res, next) => {
//   const { roomId } = req.params;
//   const { title, price, desc, maxPeople, hotel, roomNumbers } = req.body;

//   Room.findOne({ _id: roomId }).then(room => {
//     room.title = title;
//     room.price = price;
//     room.desc = desc;
//     room.maxPeople = maxPeople;
//     room.updatedAt = new Date();
//     room.roomNumbers =
//       typeof roomNumbers === 'string' ? roomNumbers.split(',') : roomNumbers;
//     room.save();
//     res.status(200).send(JSON.stringify({ message: 'Updated Room' }));
//     Hotel.findOne({ name: hotel }).then(hotel => {
//       if (!hotel.rooms.includes(roomId)) {
//         hotel.rooms.push(room._id);
//         hotel.save().then(() => console.log('Added room to Hotel'));
//       }
//     });
//   });
// };
