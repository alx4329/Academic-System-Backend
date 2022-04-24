const { Router } = require('express');
const { Career } = require('../db');
const router = require('express').Router();

router.get('/',async function(req,res){
    try {
        let careerId = req.query.career       
        
        if(careerId){
            let career = await Career.findOne({
                where: {
                    id: careerId
                }
            })
            res.send(career)
        } else {
            let careers = await Career.findAll()            
            res.send(careers)
        }        
    } catch (error){
        console.log(error)
    }
})
router.get('/:careerId', async function(req,res){
    let {careerId} = req.params;

    try{
        const career = await Career.findOne({
            where: {
                id: careerId
            }
        })
        career ? res.send(career) : res.status(404).send({message: 'Career not found'})
    }catch(error){
        console.log(error)
    }
})

router.post('/', async function(req, res) {
    // console.log(req.body); 
    let { name, code } =req.body; 
    try{
        let career = await Career.create({
            name,
            code
        })
        res.send(career)
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})

router.put('/', async function(req,res){
    let { name, code } = req.body;
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

router.delete('/', async function(req,res){
    let { careerId } = req.query;
    try{
        let career = await Career.destroy({
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

router.put('/state', async function(req,res){
    let { careerId } = req.query;
    let { state } = req.body;
    try{
        let career = await Career.update({
            active: state
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


module.exports = router;