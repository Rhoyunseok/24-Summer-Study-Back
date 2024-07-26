var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'node-admin-app' });
});

router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Main' });
});



router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  const userid = req.body.userid;
  const password = req.body.password;

  res.redirect('main');
});











module.exports = router;