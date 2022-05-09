const { Router } = require('express');
const careers = require('./careers')
const subjects = require('./subjects')
const teachers = require('./teachers')
const students = require('./students')
const exams = require('./exams')
const users = require('./users')
const jwt = require('jsonwebtoken');
const router = Router();

const sessionChecker = async ( req, res, next) => {
    const authorization = req.get('authorization');
    console.log("AUTHORIZATION",authorization)
    let token = null
    if (authorization && authorization.lowerCase().startsWith('bearer ')){
        token = authorization.substring(7)
    }
    const decodedToken =  {};
    try{
        decodedToken= jwt.verify(token, process.env.SECRET_KEY)

    }catch(e){
        console.log(e)
    }
    if(!token || !decodedToken.id){
        return res.status(401).json({error: 'Token faltante o no valido'})
    } else {
        req.user = decodedToken.user
        next()
    }
}

router.use('/careers', careers);
router.use('/subjects', subjects);
router.use('/teachers', teachers);
router.use('/students', students);
router.use('/exams', exams);
router.use('/users', users);

module.exports = router;
