const { Router } = require('express');
const { Career } = require('../db');
const router = require('express').Router();
const validUUID= new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
router.get('/',async function(req,res){
    try {
        let {careerId} = req.query
        if(careerId){
            const validId=(validUUID).test(careerId)
            if(!validId) return res.status(404).send({message: "El id de la carrera no es valido"})
            let career = await Career.findOne({
                where: {
                    id: careerId
                }
            })
            career? res.send(career): res.status(500).status(404).send({error: "No se encontro la carrera"})
        } else {
            let careers = await Career.findAll()            
            // console.log(careers)
            res.send(careers)
        }        
    } catch (error){
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
        res.status(500).send({'error': e})
    }
})

router.put('/', async function(req,res){
    let { name, code,active } = req.body;
    let { careerId } = req.query;
    const validId=(validUUID).test(careerId)
            if(!validId) return res.status(404).send({message: "El id de la carrera no es valido"})
    if(careerId){
        const validId=(validUUID).test(careerId)
            if(!validId) return res.status(404).send({message: "El id de la carrera no es valido"})
        try{
            let career = await Career.update({
                name,
                code
            },{
                where: {
                    id: careerId
                }
            })
            career[0]===1?   res.send(career): res.status(404).send({message: "No se encontro la carrera"})
        }catch(e){
            console.log(e)
            res.send({'error': e})
        }

    } else{
        res.status(404).send({message: "Debe enviar un id de carrera"})
    }
})

router.delete('/', async function(req,res){
    let { careerId } = req.query;
    const validId=(validUUID).test(careerId)
            if(!validId) return res.status(404).send({message: "El id de la carrera no es valido"})
    try{
        let career = await Career.destroy({
            where: {
                id: careerId
            }
        })
        res.send(career)
    }catch(e){
        console.log(e)
        res.status(500).send({'error': e})
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
        res.status(500).send({'error': e})
    }
})


module.exports = router;