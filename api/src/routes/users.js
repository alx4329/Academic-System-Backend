const { User } = require('../db');
const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validUUID= new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)


router.post('/signup',async function(req,res){
    try{
        const {rol, nombre, email, dni,  username,password,} = req.body;        
        const user = await User.findOne({where: {dni}});

        if(user){
            return res.send({error: 'User already exists'})
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({email, password: hashedPassword, username, rol, nombre, dni});
            const token = jwt.sign({id: newUser.id}, process.env.SECRET_KEY);
            return res.send({token});
        }
    }catch(e){
        console.log(e)
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
                        email: user.email
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


module.exports = router;