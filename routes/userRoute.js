const express=require('express')
const { loginController,registerContoller } = require('../controller/userController');
const { resourceUsage } = require('process');

const router=express.Router()

//login
router.post('/login',loginController);

//register
router.post('/register',registerContoller);

module.exports=router