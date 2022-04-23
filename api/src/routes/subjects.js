const { Router } = require('express');
const { conn } = require('../db.js');
const { Career, Subject } = require('../db');
const router = require('express').Router();
const fetch = require("node-fetch");
const db = require('../db.js');
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
    
    let { name, code, toCourse, toTakeExam } =req.body; 
    if(!name || !code) return res.send({message: 'Completar todos los campos'})

    try{
       const subject = await createSubject(name, code, toCourse, toTakeExam)
        res.send(subject)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
    
    res.json(gameCreated)
})

router.put('/', async function(req,res){
    let { name, code, toCourse, toTakeExam } = req.body;
    let { careerId } = req.query;
    try{
        let career = await Career.update({
            name,
            code
        },{
            where: {
                id: careerId
            }
        })
        res.send(career)
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