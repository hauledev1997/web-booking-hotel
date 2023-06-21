const User = require('../models/User');
const Transaction = require('../models/Transaction');
const mongodb = require('mongodb');

exports.register = (req, res, next) => {
  const userName = req.body.userName;
  const passWord = req.body.passWord;
  const user = new User({
    userName: userName,
    passWord: passWord,
    isAdmin: false,
  });
  user
    .save()
    .then(user => {
      console.log(user);
      res.redirect('http://localhost:3000/login');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.login = (req, res, next) => {
  console.log('send success');
  const userNameLogin = req.body.username;
  const passWordLogin = req.body.password;
  User.find()
    .then(users => {
      const indexUserLogin = users.findIndex(
        user => user.userName == userNameLogin && user.passWord == passWordLogin
      );
      console.log(indexUserLogin);
      if (indexUserLogin !== -1) {
        res.status(200).json({ user: users[indexUserLogin] });
      } else {
        res.json({ text: 'error' });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postReservation = (req, res, next) => {
  const { user, hotel, room, dateStart, dateEnd, price, payment, status } =
    req.body;
  const transaction = new Transaction({
    user: user,
    hotel: new mongodb.ObjectId(hotel),
    room: room,
    dateStart: dateStart,
    dateEnd: dateEnd,
    price: price,
    payment: payment,
    status: status,
  });

  transaction
    .save()
    .then(result => {
      res
        .status(200)
        .send(JSON.stringify({ message: 'Successfully Reserved' }));
      console.log('Added Transaction');
    })
    .catch(err => console.log(err));
};

exports.postTransaction = (req, res, next) => {
  const user = req.body.user;

  Transaction.find({ user: user })
    .populate('hotel', 'title')
    .then(transaction => {
      console.log(transaction);
      res.status(200).send(transaction);
    })
    .catch(err => console.log(err));
};
