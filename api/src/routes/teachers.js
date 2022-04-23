const { Router } = require('express');
const { Career, Subject, Teacher } = require('../db');
const router = require('express').Router();

router.get('/',async function(req,res){
    try {
        let teacherId = req.query.teacher
        if(teacherId){
            let teacher = await Teacher.findOne({
                where: {
                    id: teacherId
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

router.get('/:teacherId', async function(req,res){
    let {teacherId} = req.params;
    try{
        const teacher = await Teacher.findOne({
            where: {
                id: teacherId
            }
        })
        teacher ? res.send(teacher) : res.status(404).send({message: 'Teacher not found'})
    }catch(error){
        console.log(error)
    }
})

router.post('/', async function(req, res) {
    // console.log(req.body); 
    let { name, dni, fileNumber, subjects } =req.body; 

    try{
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
        res.send(teacher)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
    
    res.json(gameCreated)
})
//probar esta ruta 
router.put('/', async function(req,res){
    let { name, dni,fileNumber } = req.body;
    let { teacherId } = req.query;
    try{
        let teacher = await Career.update({
            name,
            dni,
            fileNumber
        },{
            where: {
                id: teacherId
            }
        })
        res.send(teacher)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})




module.exports = router;