
const { Career, Student, User } = require('../db');
const router = require('express').Router();

router.get('/',async function(req,res){
    try {
        let studentId = req.query.student
        if(studentId){
            let student = await Student.findOne({
                where: {
                    id: studentId
                }
            })
            student? res.send(student) : res.status(404).send({message: "No se encontro el estudiante"})
        } else {
            let students = await Student.findAll({include: User})            
            res.send(students)
        }        
    } catch (error){
        console.log(error)
        res.send({'error': error})
    }
})



router.post('/', async function(req, res) {
    
    let { name, dni, fileNumber, career } =req.body; 

    try{
        if(!name || !dni || !fileNumber || !career) return res.send({message: 'Completar todos los campos'})
        let user = await User.findOne({
            where: {dni}
        })
        if(!user) return res.status(404).send({message: "No se encontro el usuario"})
        let careerId = await Career.findOne({
            where: {
                name: career
            }
        })
        if(careerId){
            let student = await Student.create({
                name,
                dni,
                fileNumber
            })
            await student.setCareer(careerId)
            await user.setStudent(student)
            student ? res.send(student) : res.status(404).send({message: "No se pudo crear el estudiante"})
        } else {
            res.status(404).send({message: "No se encontro la carrera"})
        }
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
    
    
})
//probar esta ruta 
router.put('/', async function(req,res){
    let { name, dni,fileNumber } = req.body;
    
    try{
        let student = await Student.update({
            name,
            dni,
            fileNumber
        },{
            where: {
                dni
            }
        })
        res.send(student)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})

router.delete('/',async function(req,res){
    let { dni } = req.query;
    try{
        let student = await Student.destroy({
            where: {dni}
        })
        
        let user= await User.destroy({
            where: {dni}
        })
        
        student && user ? res.send({status:"ok"}) : res.sendStatus(404).send({message: "No se pudo eliminar el estudiante"})
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})




module.exports = router;