const { Router } = require('express');
const { Career, Subject, Teacher, Student } = require('../db');
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
            let students = await Student.findAll()            
            res.send(students)
        }        
    } catch (error){
        console.log(error)
        res.send({'error': error})
    }
})



router.post('/', async function(req, res) {
    // console.log(req.body); 
    let { name, dni, fileNumber, career } =req.body; 

    try{
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
            student ? res.send(student) : res.status(404).send({message: "No se pudo crear el estudiante"})
        } else {
            res.status(404).send({message: "No se encontro la carrera"})
        }
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
    
    res.json(gameCreated)
})
//probar esta ruta 
router.put('/', async function(req,res){
    let { name, dni,fileNumber } = req.body;
    let { studentId } = req.query;
    try{
        let student = await Career.update({
            name,
            dni,
            fileNumber
        },{
            where: {
                id: studentId
            }
        })
        res.send(student)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})

router.delete('/',async function(req,res){
    let { studentId } = req.query;
    try{
        let student = await Student.destroy({
            where: {
                id: studentId
            }
        })
        student? res.send(student) : res.status(404).send({message: "No se pudo eliminar el estudiante"})
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})




module.exports = router;