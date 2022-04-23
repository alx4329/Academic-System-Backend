const {  Subject } = require('../db.js');


const createSubject =  (name, code, toCourse, toTakeExam) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let subject = await Subject.create({
                name,
                code,
                toCourse: toCourse,
                toTakeExam: toTakeExam
            })
            resolve(subject)
        }catch(e){
            //reject(e)
        }
    })
}

module.exports = createSubject;