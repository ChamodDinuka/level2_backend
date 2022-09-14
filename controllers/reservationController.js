const reservation = require('../models/reservationModel')
const moment = require('moment')

exports.getReservation = async (req, res, next) => {
    try {
        const result = await reservation.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
exports.addReservation = async (req, res, next) => {
    try {
        const result = await reservation.create(req.body)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }

}
exports.updateReservation = async (req, res, next) => {
    try {
        const result = await reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }

}
exports.deleteReservation = async (req, res, next) => {
    try {
        const result = await reservation.findByIdAndDelete(req.params.id)
        if (!result) {
            return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        return res.status(400).json({ success: false })
    }
}
exports.getBlockedTime = async (req, res, next) => {
    try {
        let id = req.query.id
        let date = req.query.date
        let time =[]
        const result = await reservation.find({stylist:id,date:date})
        result.map((data)=>{
            time.push(Number(data.time.split(":")[0]))
        })
        res.status(200).json(time)
    } catch (error) {
        res.status(400).json({ success: false })
    }
}
