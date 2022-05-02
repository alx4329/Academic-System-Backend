const { Router } = require('express');
const careers = require('./careers')
const subjects = require('./subjects')
const teachers = require('./teachers')
const students = require('./students')
const exams = require('./exams')
const users = require('./users')

const router = Router();

router.use('/careers', careers);
router.use('/subjects', subjects);
router.use('/teachers', teachers);
router.use('/students', students);
router.use('/exams', exams);
router.use('/users', users);

module.exports = router;
