const { register,login, forgotPass, resetPassword, feedback } = require('../controller/userController')



const router = require('express').Router()

router.post('/registration',register)
router.post('/login',login)
router.post('/forgotPass',forgotPass)
router.post('/resetpass',resetPassword)
router.post('/feedback',feedback)



module.exports = router