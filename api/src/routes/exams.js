const { Router } = require('express');
const { Exam, Career, Subject, Student, Teacher } = require('../db');
const router = require('express').Router();
const validUUID= new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
router.get('/',async function(req,res){
    try {
        let {examId} = req.query
        const validId=(validUUID).test(examId)
            if(!validId) return res.status(404).send({message: "El id de la carrera no es valido"})
        if(examId){
            let exam = await Exam.findOne({
                where: {
                    id: examId
                }
            })
            exam ? res.send(exam) : res.status(404).send({message: "No se encontro el examen"})
        } else {
            let exams = await Career.findAll()            
            res.send(exams)
        }        
    } catch (error){
        console.log(error)
    }
})


router.post('/', async function(req, res) {
    // console.log(req.body); 
    let {careerId, subjectName, studentId, teacherId, score, date} =req.body; 
        const validId=(validUUID).test(careerId)
        const validId2=(validUUID).test(teacherId)
        const validId3=(validUUID).test(studentId)
            if(!validId || !validId2 || ! validId3) return res.status(404).send({message: "Alguno de los id no es valido"})
    try{
        let career = await Career.findOne({
            where:{
                id:careerId
            }
        })
        let subject = await Subject.findOne({
            where: {
                name: subjectName
            }
        })

        let student = await Student.findOne({
            where: {
                id: studentId
            }
        })
        let teacher = await Teacher.findOne({
            where: {
                id: teacherId
            }
        })
        if(career && subject && student && teacher){
            let exam = await Exam.create({
                score,
                date,
                subjectName: subject.name,
                studentName: student.name,
                teacherName: teacher.name
            })
            await exam.setCareer(career)
            await exam.setSubject(subject)
            await exam.setStudent(student)
            await exam.setTeacher(teacher)
            exam ? res.send(exam) : res.status(404).send({message: "No se pudo crear el examen"})
        } else {
            res.status(404).send({message: "No se encontro alguno de los valores"})
        }
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})

router.delete('/', async function(req,res){
    let { examId } = req.query;
    const validId=(validUUID).test(examId)
            if(!validId) return res.status(404).send({message: "El id de la carrera no es valido"})
    try{
        let exam = await Exam.destroy({
            where: {
                id: examId
            }
        })
        exam ? res.send(exam) : res.status(404).send({message: "No se pudo eliminar el examen"})
    }catch(e){
        console.log(e)
        res.send({'error': e})
    }
})




module.exports = router;