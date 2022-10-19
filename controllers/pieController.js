const reservation = require('../models/reservationModel')
const pie = require('../models/pieModel')
const user = require('../models/userModel')
const moment = require('moment')

exports.getPie = async (req, res, next) => {
    let pieDate = [];
    try {
        const resultSheduled = await reservation.find({ status: "Scheduled" })
        const resultCompleted = await reservation.find({ status: "Completed" })
        pieDate.push({ type: "Sheduled", value: resultSheduled.length })
        pieDate.push({ type: "Completed", value: resultCompleted.length })
        res.status(200).json(pieDate)
    } catch (error) {
        //res.status(400).json({ success: false })
        next(new ErrorResponse(error.message, 400))
    }
}
exports.getBar = async (req, res, next) => {
    let startOfWeek = moment().startOf('week').format('YYYY-MM-DD');
    let endOfWeek   = moment().endOf('week').format('YYYY-MM-DD');
    const resp = await reservation.aggregate([
        {
          $match: {
            date: { $gt: startOfWeek, $lt: endOfWeek },
          },
        },
        {
          $group: {
            _id: "$stylist",
            value: {
                $count: {}
             }
          },
        },
  
      ]);
    let barDate = [];
    try {
        await Promise.all(resp.map(async (users, index) => {
            let userList = await user.find({"_id":users._id});
            let label = userList[0].firstName + " " + userList[0].lastName
            barDate.push({ label: label, type: label , value: users.value})     
        })
        )
        res.status(200).json(barDate)
    } catch (error) {
        //res.status(400).json({ success: false })
        next(new ErrorResponse(error.message, 400))
    }
}