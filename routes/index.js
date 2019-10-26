var express = require('express');
var router = express.Router();
const app = express();
const bcrypt = require('bcrypt');

//databases, Schema 
var Gyno = require('../models/gyno_info');
var User = require('../models/user');
var Blog = require('../models/blog');
var Period = require('../models/periods');
var FPreg = require('../models/pregnancies');
var SPreg = require('../models/second_trimester')
//var TPreg = require('../models/third_trimester')
var Hbp = require('../models/highbp')
var Weightl = require('../models/weight_loss')
var Leg = require('../models/leg')

/* Landing page */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'NARI' });
});


//signin page
router.get('/signin', function (req, res, next) {
  /*  var email = req.body.email;
   var password = req.body.password;
 
   User.getUserByName(email)
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
     }); */
  res.render('signin');
})


//blog
//blog page
router.get('/blog', function (req, res, next) {
  Blog.find().exec((err, blog) => {
    res.render('blog', { blog });
    console.log('....... data', blog);
    return blog;
  }
  )
});

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

//period exercises
router.get('/exercise/periods', function (req, res, next) {
  Period.find().exec((err, period) => {
    res.render('exerciseDesc', { period });
    console.log('....... data', period);
    return period;
  }
  )
});

//firsttrimester pregnancy
router.get('/exercise/pregnancy/first', function (req, res, next) {
  FPreg.find().exec((err, period) => {
    res.render('exerciseDesc', { period });
    console.log('....... data', period);
    return period;
  }
  )
});


//second trimester pregnancy
router.get('/exercise/pregnancy/second', function (req, res, next) {
  SPreg.find().exec((err, period) => {
    res.render('exerciseDesc', { period });
    console.log('....... data', period);
    return period;
  }
  )
});


//high bp
router.get('/exercise/bp', function (req, res, next) {
  Hbp.find().exec((err, period) => {
    res.render('exerciseDesc', { period });
    console.log('....... data', period);
    return period;
  }
  )
});


//legs
router.get('/exercise/leg', function (req, res, next) {
  Leg.find().exec((err, period) => {
    res.render('exerciseDesc', { period });
    console.log('....... data', period);
    return period;
  }
  )
});

//weight loss
router.get('/exercise/weightloss', function (req, res, next) {
  Weightl.find().exec((err, period) => {
    res.render('exerciseDesc', { period });
    console.log('....... data', period);
    return period;
  }
  )
});



//





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
    res.redirect('/blog');
  })


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
    .then(user => {
      if (user.length >= 1) {
        console.log('User already exists');
        res.redirect('/');
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
                res.redirect('/');
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
