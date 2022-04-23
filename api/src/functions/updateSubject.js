const {  Subject } = require('../db.js');


const updateSubject =  (name, code, toCourse, toTakeExam) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let subject = await Subject.update({
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

module.exports = updateSubject;