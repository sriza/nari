var express = require('express');
var router = express.Router();
const app = express();
const bcrypt = require('bcrypt');

//databases, Schema 
var Gyno = require('../models/gyno_info');
var User = require('../models/user');
var Blog = require('../models/blog');
var Period = require('../models/periods');



/* Landing page */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'NARI' });
});


//signin page
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
})

//Information of gynologist
router.get('/gyno', function (req, res, next) {
  Gyno.find().exec((err, gyno) => {
    res.render('gyno', { gyno });
    console.log('....... data', gyno);
    return gyno;
  }
  )
});

//exercise
router.get('/exercise', function (req, res, next) {
  res.render('exercise');
})



//period exercise
router.get('/periods', function (req, res, next) {
  Period.find().exec((err, period) => {
    res.render('exercise', { period });
    console.log('.........data', period);
    return period;
  })

})





//Form of blog

router.get('/blogform', function (req, res, next) {
  res.render('blog_form');
});

router.post('/addblog', function (req, res, next) {

  var blog = new Blog({
    name: req.body.name,
    title: req.body.title,
    blog: req.body.blog,
  })

  var promise = blog.save();
  promise.then((blog) => {
    console.log('Blog saved', blog);
    res.redirect('/gyno');
  })


});


//blog page
router.get('/blog', function (req, res, next) {
  Blog.find().exec((err, blog) => {
    res.render('blog', { blog });
    console.log('....... data', blog);
    return blog;
  }
  )
});

//one blog
router.get('/blog/:_id', function (req, res, next) {

  Blog.findOne({ _id: req.params._id }, function (err, blog) {
    res.render('blogone', { blog });
    console.log('blog selected .....', blog);
  })
});


//delete blog
router.get('/delete/:_id', function (req, res, next) {
  Blog.deleteOne({ _id: req.params._id }, function (err, movie) {
    console.log('blog deleted.....', blog);
    res.redirect('/blog');
  });

})


//edit blog
router.get('/edit/:_id', function (req, res, next) {
  Blog.findOne({ _id: req.params._id }, function (err, movie) {
    console.log('blog selected....', blog);
    res.render('updateMovie', { blog });
  });
})



//User Registration
router.get('/signup', async function (req, res, next) {
  res.render('signup');
});

router.post('/adduser', function (req, res, next) {
  console.log(req.body);
  User.find({ email: req.body.email }).exec()
    .then(email => {
      if (email) {
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
              password: hash,
              age: req.body.age,
              name: req.body.name,
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


module.exports = router;
