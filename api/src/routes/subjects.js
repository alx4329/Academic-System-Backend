const { Subject, Career } = require('../db');
const router = require('express').Router();
const createSubject = require('../functions/createSubject');

router.get('/',async function(req,res){
    try {
        let subjectId = req.query.subject
        if(subjectId){
            let subject = await Subject.findOne({
                where: {
                    id: subjectId
                }
            })
            subject ? res.send(subject): res.status(404).send({message: "No se encontro la materia"})
        } else {
            let subjects = await Subject.findAll()            
            res.send(subjects)
        }        
    } catch (error){
        console.log(error)
    }
})

router.post('/', async function(req, res) {
    
    let { name, code,year, toCourse, toTakeExam, careerId, lastSubject,period} =req.body;
    if(!name || !code || !careerId) return res.status(400).send({message: 'Completar todos los campos'})

    try{
        const subject = await createSubject(name, code,year, toCourse, toTakeExam, careerId,period)
        if(lastSubject){
            await Career.update({
                completed: true,
            },{
                where:{
                    id: careerId
                }
            })
       }
        res.send(subject)
    }catch(e){
        console.log(e.errors[0].message)
        e.errors[0]?.message ? res.status(400).send({message: e.errors[0].message}) : res.status(500).send({message: "Error al crear la materia"})
        
    }
    
    
})

router.put('/', async function(req,res){
    let { name, code, toCourse, toTakeExam } = req.body;
    let { subjectId } = req.query;
    try{
        let subject = await Subject.update({
            name,
            code,
            toCourse,
            toTakeExam
        },{
            where: {
                id: subjectId
            }
        })
        res.send(subject)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})
//ver si usar esta ruta
router.delete('/', async function(req,res){
    let { subjectId } = req.query;
    try{
        let subject = await Subject.destroy({
            where: {
                id: subjectId
            }
        })
        res.send(subject)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})




module.exports = router;