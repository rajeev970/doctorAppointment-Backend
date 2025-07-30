var express = require('express');
const {register,login,currentUser,getDoctorsForUser,bookdoctor,appointment,applyfordoctor,UpdateDoctorStatus, getDoctorsForAdmin} =require('../controlers/usercontoller');
const {validateToken,validateadminToken} = require('../middleware/validatetokenhandle');
var router = express.Router();

/* GET home page. */
router.post('/user/login',login);
router.post('/user/registration',register);
router.get('/user/current',validateToken,currentUser);
router.get('/get-doctors-user',validateToken,getDoctorsForUser);
router.get('/bookdoctor/:doctorId',validateToken,bookdoctor);
router.get('/appointment',appointment);
router.post('/applyfordoctor',validateToken,applyfordoctor);
router.get('/admin/getdoctor-admin',validateadminToken,getDoctorsForAdmin);
router.put('/admin/doctor-validation',validateadminToken,UpdateDoctorStatus)

module.exports = router;
