const { Router } = require('express');
const careers = require('./careers')
const subjects = require('./subjects')
const teachers = require('./teachers')

const router = Router();

router.use('/careers', careers);
router.use('/subjects', subjects);
router.use('/teachers', teachers);


module.exports = router;
