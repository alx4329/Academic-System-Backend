const { User, Admin, Teacher, Student, Career } = require('../db');
const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const validUUID= new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)


router.post('/signup',async function(req,res){
    try{
        const {rol, nombre, apellido,email, dni,  username,password, fileNumber, careerId} = req.body;     
        const user = await User.findOne({where: {dni}});
        if(user){
            return res.status(500).send({error: 'El usuario ya existe'})
        } else {
            if(rol === "Estudiante"){
                const student = await Student.findOne({where: {fileNumber}});
                if(student) return res.status(400).send({message: "El numero de legajo ya existe"})
            }
            if(rol === "Docente"){
                const docente = await Teacher.findOne({where: {fileNumber}});
                if(docente) return res.status(400).send({message: "El numero de legajo ya existe"})
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email, 
                password: hashedPassword, 
                username, 
                rol, 
                nombre,
                apellido, 
                dni
            });
            
            if(rol === 'Admin'){
                const newAdmin = await Admin.create({ 
                    name: nombre+apellido, 
                    dni
                });
                newUser.setAdmin(newAdmin);
            }
            if(rol === 'Docente'){
                const newAdmin = await Teacher.create({ 
                    name: nombre,
                    surname:apellido, 
                    dni,
                    fileNumber
                });
                newUser.setTeacher(newAdmin);
            }
            if(rol === 'Estudiante'){
                const career = await Career.findOne({where: {id: careerId}})
                const newStudent = await Student.create({ 
                    name: nombre,
                    surname:apellido, 
                    dni,
                    fileNumber
                });
                newUser.setStudent(newStudent);
                newStudent.setCareer(career)
            }
            return res.send({
                user:{
                id: newUser.id,
                rol: newUser.rol,
                nombre: newUser.nombre,
                email: newUser.email,
                dni: newUser.dni
            }});
        }
    }catch(e){
        console.log(e)
        e.errors? res.status(500).send({error: e.errors[0].message}) : res.status(500).send({error: e.message})
        
    }
})


router.post('/signin', async function(req, res) {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where:{email: email}});
        if(user){
            const isValid = await bcrypt.compare(password, user.password);
            if(isValid){
                const token = jwt.sign({id: user.id}, process.env.SECRET_KEY);
                return res.json({
                    token,
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        rol: user.rol,
                        nombre: user.nombre,
                        apellido:user.apellido
                    }
                })
            }else {
                console.log('Invalid password')
                return res.status(401).json({error: 'Alguno de los datos no es valido'})}
        }else {
            console.log("User not found")
            return res.status(401).json({error: 'Alguno de los datos no es valido'})}
    }catch(err){
        console.log(err)
    }
})


router.delete('/', async function(req,res){
    try{
        const {dni} = req.body;
        const user = await User.findOne({where:{dni}});
        if(user){
            await user.destroy();
            return res.send({message: 'User deleted'})
        }else {
            return res.status(401).json({error: 'User not found'})}
    }catch(err){
        console.log(err)
    }
})

module.exports = router;