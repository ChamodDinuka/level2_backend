const reservation = require('../models/reservationModel')
const user = require('../models/userModel')
const moment = require('moment')
const ErrorResponse = require('../utils/errorResponse')

exports.getReservation = async (req, res, next) => {
    try {
        let result=[]
        const page = parseInt(req.query.page, 10 || 1)
        const limit = parseInt(req.query.limit, 10 || 100)
        const skip = (page-1)*limit
        //const result = await reservation.find().skip(skip).limit(limit)
        if (req.query.sort) {
            let sortQuery = req.query.sort.split(',').join(' ')
            result = await reservation.find().skip(skip).limit(limit).sort(sortQuery)
        } else {
            result = await reservation.find().skip(skip).limit(limit)
        }
        res.status(200).json(result)
    } catch (error) {
        next(new ErrorResponse())
    }
}
exports.addReservation = async (req, res, next) => {
    try {
        const result = await reservation.create(req.body)
        const stylist = await user.find({_id:req.body.stylist})
        stylist[0].count = stylist[0].count+1
        const update = await user.findByIdAndUpdate(req.body.stylist, stylist[0], {
            new: true,
            runValidators: true
        })
        res.status(200).json({ success: true })
    } catch (error) {
        next(new ErrorResponse(error.message, 400))
    }

}
exports.updateReservation = async (req, res, next) => {
    if(req.body.date >= moment().format('YYYY-MM-DD')){
        try {
            const result = await reservation.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            })
            if (!result) {
                //return res.status(400).json({ success: false })
                throw new Error()
            }
            res.status(200).json({ success: true })
        } catch (error) {
            next(error)
        }
    }else{
        next(new ErrorResponse('Cannot schedule to past dates', 400))
    }
    

}
exports.deleteReservation = async (req, res, next) => {
    try {
        const selectedReservation = await reservation.findById(req.params.id)
        const stylist = await user.find({_id:selectedReservation.stylist})
        if(stylist[0].count > 0){
            stylist[0].count = stylist[0].count-1
        }else{
            stylist[0].count = stylist[0].count
        }
        
        const update = await user.findByIdAndUpdate(selectedReservation.stylist, stylist[0], {
            new: true,
            runValidators: true
        })
        const result = await reservation.findByIdAndDelete(req.params.id)
        if (!result) {
            //return res.status(400).json({ success: false })
            throw new Error()
        }
        res.status(200).json({ success: true })
    } catch (error) {
        //return res.status(400).json({ success: false })
        next(new ErrorResponse(error.message || 'Reservation is not found', 400))
    }
}
exports.getBlockedTime = async (req, res, next) => {
    try {
        let id = req.query.id
        let date = req.query.date
        let time =[]
        const result = await reservation.find({stylist:id,date:date})
        result.forEach((data)=>{
            if(Number(data.time.split(":")[0]) <=12 && Number(data.time.split(":")[0]) >=8 ){
                time.push(Number(data.time.split(":")[0]))
            }else{
                time.push(Number(data.time.split(":")[0])+12)
            }
        })
        res.status(200).json(time)
    } catch (error) {
        next(new ErrorResponse())
    }
}
