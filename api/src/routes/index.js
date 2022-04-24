const { Router } = require('express');
const careers = require('./careers')
const subjects = require('./subjects')
const teachers = require('./teachers')
const students = require('./students')
const exams = require('./exams')

const router = Router();

router.use('/careers', careers);
router.use('/subjects', subjects);
router.use('/teachers', teachers);
router.use('/students', students);
router.use('/exams', exams);


module.exports = router;
