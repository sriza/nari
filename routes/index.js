var express = require('express');
var router = express.Router();
const app = express();
const bcrypt = require('bcrypt');

//databases, Schema 
var Gyno = require('../models/gyno_info');
var User = require('../models/user');


/* Landing page */
/*
router.get('/', function (req, res, next) {
  res.render('landing_page', { title: 'NARI' });
});

router.get('/signin', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.getUserByEmail(email)
    .then(function (user) {
      return bcrypt.compare(password, user.password);
    })
    .then(function (samePassword) {
      if (!samePassword) {
        res.status(403).send();
      }
      res.send();
    })
    .catch(function (error) {
      console.log("Error authenticating user: ");
      console.log(error);
      next();
    });
}) */

//Information of gynologist
router.get('/gyno', function (req, res, next) {
  Gyno.find().exec((err, gyno) => {
    res.render('gyno', { gyno });
    console.log('....... data', gyno);
    return gyno;
  }
  )
});


//User Registration
router.get('/signup', async function (req, res, next) {
  res.render('signup');
});

router.post('/adduser', function (req, res, next) {
  console.log(req.body);
  //creating a variable for 
  User.find({ email: req.body.email }).exec()
    .then(user => {
      if (user) {
        return res.status(422).json({
          message: 'Mail exists'
        });
      } else {
        bcrypt.hash(req.body.email, 10, (err, hash) => {
          if (err) {
            return res.status(500).json(
              {
                error: err
              });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            });

            user.save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: 'User Created'
                })
              }).catch(err => {
                console.log(err);
              });
          }
        });

      }
    })
    .catch((err) => {
      console.log('error.......' + err);
    })

});




router.get('/landingpage', function (req, res, next) {
  var data = new User({
    username: req.body.name,
    password: req.body.password,
  })

  //var result = User.findOne("name" = username);

})





module.exports = router;
