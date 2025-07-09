var express = require('express');
const {register,login,currentUser} =require('../controlers/usercontoller');
const validateToken = require('../middleware/validatetokenhandle');
var router = express.Router();

/* GET home page. */
router.post('/user/login',login);
router.post('/user/registration',register);
router.get('/user/current',validateToken,currentUser);


module.exports = router;
