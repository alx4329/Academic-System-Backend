const {  Subject, Career } = require('../db.js');



const createSubject =  (name, code,year, toCourse, toTakeExam, careerId,period) =>{
    return new Promise(async (resolve, reject) => {
        try{
            let subject = await Subject.create({
                name,
                code,
                year,
                toCourse: toCourse,
                toTakeExam: toTakeExam,
                period
            })
            const career = await Career.findOne({
                where: {
                    id: careerId
                }
            })
            await career.addSubject(subject)
            resolve(subject)
        }catch(e){
            reject(e)
        }
    })
}

module.exports = createSubject;