const express = require('express')
const router = express.Router();
const {getType} =require('../controllers/typeController')
const {getPie} = require('../controllers/pieController')
const {getClients,addClient,updateClient,deleteClient} = require('../controllers/clients')
const {getReservation,addReservation,updateReservation,deleteReservation,getBlockedTime} = require('../controllers/reservationController')

//client routes
router.route('/clients/:id').put(updateClient).delete(deleteClient)
router.route('/clients').get(getClients).post(addClient)

//reservation routes
router.route('/reservations/:id').put(updateReservation).delete(deleteReservation)
router.route('/reservations').get(getReservation).post(addReservation)
router.route('/blocked').get(getBlockedTime)

//get types
router.route('/types').get(getType)

//get data for pie and bar chart
router.route('/pie').get(getPie)

// router.get('/clients/:id',(req,res)=>{
//     res.status(200).json({status:"success"})
// })

module.exports = router