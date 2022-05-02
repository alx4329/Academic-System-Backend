const {  Subject, Teacher,User } = require('../db');
const router = require('express').Router();

router.get('/',async function(req,res){
    try {
        let {dni} = req.query
        if(dni){
            let teacher = await Teacher.findOne({
                where: {
                    id: dni
                }
            })
            teacher? res.send(teacher) : res.status(404).send({message: "No se encontro el profesor"})
        } else {
            let teachers = await Teacher.findAll()            
            res.send(teachers)
        }        
    } catch (error){
        console.log(error)
        res.send({'error': error})
    }
})



router.post('/', async function(req, res) {
    
    let { name, dni, fileNumber, subjects } =req.body; 

    try{
        let user = await User.findOne({
            where: {dni}
        })
        if(!user) return res.status(404).send({message: "No se encontro el usuario"})
        if(!name || !dni) return res.send({message: 'Completar todos los campos'})
        let teacher = await Teacher.create({
            name,
            dni,
            fileNumber
        })
        if(subjects){
            subjects.forEach(async subject => {
                let sub = await Subject.findOne({
                    where: {
                        id: subject
                    }
                })
                if(sub){
                    teacher.addSubject(sub)
                }
            })
        }
        await user.setTeacher(teacher)
        res.send(teacher)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})

router.put('/', async function(req,res){
    let { name, dni,fileNumber } = req.body;
    console.log(name,dni,fileNumber)
    
    const dbTeacher = await Teacher.findOne({
        where: {
            dni: dni
        }
    })
    console.log(dbTeacher)
    
    try{
        let teacher = await Teacher.update({
            name:name,
            dni: dni,
            fileNumber: fileNumber
        },{
            where: {
                dni:dni
            }
        })
        console.log(teacher)
        res.send(teacher)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})




module.exports = router;