const { Router } = require('express');
const { Exam, Career, Subject, Student, Teacher } = require('../db');
const router = require('express').Router();

router.get('/',async function(req,res){
    try {
        let examId = req.query.exam
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