var express = require('express');
var router = express.Router();
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');



const {
  ensureAuthenticated,
  forwardAuthenticated
} = require('../config/auth');

//databases, Schema 
var Gyno = require('../models/gyno_info');
var Blog = require('../models/blog');
var Period = require('../models/periods');
var FPreg = require('../models/pregnancies');
var SPreg = require('../models/second_trimester')
//var TPreg = require('../models/third_trimester')
var Hbp = require('../models/highbp')
var Weightl = require('../models/weight_loss')
var Leg = require('../models/leg')
var User = require('../models/user');
var Query = require('../models/queries');
var Comment = require('../models/comments');
var Bcomment = require('../models/bcomment');












//landing page
router.get('/', forwardAuthenticated, function (req, res, next) {
  res.render('landingpage', {
    title: 'NARI'
  });
});




//signin page
router.get('/signin', forwardAuthenticated, async function (req, res, next) {
  res.render('signin');
});

/* router.post('/signin', function (req, res, next) {

  
})
 */
router.post('/signin',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/signin',
    failureFlash: true
  })
);



//go home once authenticated


//User Registration
router.get('/signup', forwardAuthenticated, async function (req, res, next) {
  res.render('signup');
});


router.post('/adduser', function (req, res, next) {
  console.log(req.body);
  User.find({
      email: req.body.email
    }).exec()
    .then(user => {
      if (user.length >= 1) {
        console.log('User already exists');
        res.redirect('/');
      } else {

        bcrypt.genSalt(10, (err, salt) => {

          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });

            } else {
              const usere = new User({
                email: req.body.email,
                password: hash,
                age: req.body.age,
                username: req.body.name,
              });
              usere.save()
                .then(result => {
                  console.log(result);
                  req.flash('success_msg', 'Your are now registered and can login');
                  res.redirect('/signin');
                }).catch(err => {
                  console.log(err);
                });
            }
          });
        })


      }
    })
    .catch((err) => {
      console.log('error.......' + err);
    })

});

//logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;




















//home
router.get('/home', ensureAuthenticated, function (req, res, next) {

  res.render('home', {
    title: 'NARI',
    user: req.user
  });
});





//blog
//blog page
router.get('/blog', ensureAuthenticated, function (req, res, next) {
  Blog.find().sort({
    date: -1
  }).exec((err, blog) => {
    res.render('blog', {
      blog,
      user: req.user
    });
    console.log('....... data', blog);
    return blog;
  })
});

//Information of gynologist
router.get('/gyno', ensureAuthenticated, function (req, res, next) {
  Gyno.find().exec((err, gyno) => {
    res.render('gyno', {
      gyno,
      user: req.user
    });
    console.log('....... data', gyno);
    return gyno;
  })
});

//exercise
router.get('/exercise', ensureAuthenticated, function (req, res, next) {
  res.render('exercise', {
    user: req.user
  });
})

//period exercises
router.get('/exercise/periods', ensureAuthenticated, function (req, res, next) {
  Period.find().exec((err, period) => {
    res.render('exerciseDesc', {
      period,
      user: req.user
    });
    console.log('....... data', period);
    return period;
  })
});

//firsttrimester pregnancy
router.get('/exercise/pregnancy/first', ensureAuthenticated, function (req, res, next) {
  FPreg.find().exec((err, period) => {
    res.render('exerciseDesc', {
      period,
      user: req.user
    });
    console.log('....... data', period);
    return period;
  })
});


//second trimester pregnancy
router.get('/exercise/pregnancy/second', ensureAuthenticated, function (req, res, next) {
  SPreg.find().exec((err, period) => {
    res.render('exerciseDesc', {
      period,
      user: req.user
    });
    console.log('....... data', period);
    return period;
  })
});


//high bp
router.get('/exercise/bp', ensureAuthenticated, function (req, res, next) {
  Hbp.find().exec((err, period) => {
    res.render('exerciseDesc', {
      period,
      user: req.user
    });
    console.log('....... data', period);
    return period;
  })
});


//legs
router.get('/exercise/leg', ensureAuthenticated, function (req, res, next) {
  Leg.find().exec((err, period) => {
    res.render('exerciseDesc', {
      period,
      user: req.user
    });
    console.log('....... data', period);
    return period;
  })
});

//weight loss
router.get('/exercise/weightloss', ensureAuthenticated, function (req, res, next) {
  Weightl.find().exec((err, period) => {
    res.render('exerciseDesc', {
      period,
      user: req.user
    });
    console.log('....... data', period);
    return period;
  })
});



//





//Form of blog

router.get('/blogform', ensureAuthenticated, function (req, res, next) {
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
router.get('/blog/:_id', ensureAuthenticated, function (req, res, next) {

  Blog.findOne({
    _id: req.params._id
  }, function (err, blog) {
    Bcomment.find({
      blogid: blog._id
    }).sort({
      date: -1
    }).exec((err, comment) => {
      res.render('blogone', {
        blog,
        user: req.user,
        comment
      });
    })

    console.log('blog selected .....', blog);
  })
});


//add blog comment

router.post('/bcomment', function (req, res, next) {
  var comment = new Bcomment({
    userId: req.user.id,
    username: req.user.username,
    blogid: req.body._id,
    comment: req.body.comment,

  })
  var add = '/blog/' + comment.blogid;

  var promise = comment.save();
  promise.then(comment => {
    console.log('query saved', comment);
    res.redirect(add);

  })


})





//delete blog
router.get('/delete/:_id', ensureAuthenticated, function (req, res, next) {
  Blog.deleteOne({
    _id: req.params._id
  }, function (err, movie) {
    console.log('blog deleted.....', blog);
    res.redirect('/blog');
  });

})


//edit blog
router.get('/edit/:_id', ensureAuthenticated, function (req, res, next) {
  Blog.findOne({
    _id: req.params._id
  }, function (err, movie) {
    console.log('blog selected....', blog);
    res.render('updateMovie', {
      blog
    });
  });
})


//queries
router.get('/ask', ensureAuthenticated, async function (req, res, next) {

  Query.find().sort({
    date: -1
  }).exec((err, queries) => {

    Comment.find().sort({
      date: -1
    }).exec((err, comment) => {
      res.render('queries', {
        queries,
        comment: comment
      });
    })

    console.log('....... data', queries);
    return queries;
  })
});

//askquery

/* userId: String,
name: String,
title: String,
description: String */

router.post('/addquery', function (req, res, next) {
  var x = 0;
  var query = new Query({
    userId: req.user.id,
    username: req.user.username,
    description: req.body.question,
    like: x,
    comment: x,


  })

  var promise = query.save();
  promise.then((query) => {
    console.log('query saved', query);
    res.redirect('/ask');
  })
});

router.post('/like', function (req, res, next) {


  Query.findOneAndUpdate({
    _id: req.body.postid
  }, {
    $set: {
      "like": like++
    }
  }, function (err, query) {
    res.redirect('/ask');
  })


})

router.post('/comment', function (req, res, next) {


  Query.findOneAndUpdate({
    _id: req.body.postid
  }, {
    $set: {
      "comment": comment + 1
    }
  }, function (err, query) {
    res.redirect('/ask');
  })


})




//addcomment

/* username: String,
    userid: String,
    queryid: String,
    comment: String,
    date: {
        type: Date,
        default: Date.now(),
    },
    like: Number, */


router.post('/addcomment', function (req, res, next) {
  var comment = new Comment({
    userId: req.user.id,
    username: req.user.username,
    queryid: req.body._id,
    comment: req.body.comment,

  })

  var promise = comment.save();
  promise.then(comment => {
    console.log('query saved', comment);
    res.redirect('/ask');

  })


})




module.exports = router;