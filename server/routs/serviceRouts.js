const{service,getService} = require('../controller/serviceController')

const router = require('express').Router()

router.post('/service',service)
router.post('/appoints',getService)

module.exports = router