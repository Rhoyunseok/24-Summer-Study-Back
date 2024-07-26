var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'node-chat-app' });
});

module.exports = router;

router.get('/main', function(req, res, next) {
  res.render('main', { title: 'Main' });
});

router.get('/login', function(req, res, next) {
  res.render('login',{resultMsg:false});
});

router.post('/login', function(req, res, next) {
  const userid = req.body.userid;
  const password = req.body.password;

  const resultMsg = false;

  if(resultMsg)  {
    res.redirect('main');
  }
  res.redirect('login',{resultMsg:false});
});