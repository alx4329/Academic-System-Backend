const { User, Admin, Teacher, Student } = require('../db');
const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const validUUID= new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)


router.post('/signup',async function(req,res){
    try{
        const {rol, nombre, email, dni,  username,password, fileNumber} = req.body;        
        const user = await User.findOne({where: {dni}});

        if(user){
            return res.status(500).send({error: 'User already exists'})
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email, 
                password: hashedPassword, 
                username, 
                rol, 
                nombre, 
                dni
            });
            
            if(rol === 'Admin'){
                console.log("deberia crear Admin")
                const newAdmin = await Admin.create({ 
                    name: nombre, 
                    dni
                });
                newUser.setAdmin(newAdmin);
            }
            if(rol === 'Docente'){
                console.log("deberia crear Teacher")
                const newAdmin = await Teacher.create({ 
                    name: nombre, 
                    dni,
                    fileNumber
                });
                newUser.setTeacher(newAdmin);
            }
            if(rol === 'Estudiante'){
                console.log("deberia crear Student")
                const newAdmin = await Student.create({ 
                    name: nombre, 
                    dni,
                    fileNumber
                });
                newUser.setStudent(newAdmin);
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