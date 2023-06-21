const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');
const hotelRoutes = require('./routes/hotel');
const adminRoutes = require('./routes/admin');
app.use(cors());
app.use(express.json({ type: ['application/json'] }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const User = require('./models/User');
// app.use((req, res, next) => {
//   res.send('hello');
//   next();
// });
app.use(userRoutes);
app.use(hotelRoutes);
app.use(adminRoutes);
mongoose
  .connect(
    'mongodb+srv://diepvien006minhhau:gmisO7DYaBuC2hrM@cluster0.fmyicip.mongodb.net/hotel?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user.isAdmin) {
        const userAdmin = new User({
          userName: 'hau',
          passWord: '12',
          isAdmin: true,
        });
        userAdmin.save();
      }
    });

    app.listen(5000);
  })

  .catch(err => {
    console.log(err);
  });
