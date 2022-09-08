const reservation = require('../models/reservationModel')
const pie = require('../models/pieModel')

exports.getPie = async (req, res, next) => {
    let pieDate=[];
    try {
        const resultSheduled = await reservation.find({status:"Scheduled"})
        const resultCompleted = await reservation.find({status:"Completed"})
        pieDate.push({type:"Sheduled",value:resultSheduled.length})
        pieDate.push({type:"Completed",value:resultCompleted.length})
        res.status(200).json(pieDate)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}