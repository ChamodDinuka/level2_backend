const reservation = require('../models/reservationModel')
const pie = require('../models/pieModel')
const user = require('../models/userModel')

exports.getPie = async (req, res, next) => {
    let pieDate = [];
    try {
        const resultSheduled = await reservation.find({ status: "Scheduled" })
        const resultCompleted = await reservation.find({ status: "Completed" })
        pieDate.push({ type: "Sheduled", value: resultSheduled.length })
        pieDate.push({ type: "Completed", value: resultCompleted.length })
        res.status(200).json(pieDate)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
exports.getBar = async (req, res, next) => {
    let barDate = [];
    try {
        const userList = await user.find();
        userList.forEach(async (user, index) => {
            barDate.push({ label: user.firstName + " " + user.lastName, type: user.firstName + " " + user.lastName, value: user.count})          
        })
        res.status(200).json(barDate)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}