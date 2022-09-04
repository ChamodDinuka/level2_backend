const express = require('express')
const router = express.Router();
const {getClients,addClient,updateClient,deleteClient} = require('../controllers/clients')
const {getReservation,addReservation,updateReservation,deleteReservation} = require('../controllers/reservationController')

//client routes
router.route('/clients/:id').put(updateClient).delete(deleteClient)
router.route('/clients').get(getClients).post(addClient)

//reservation routes
router.route('/reservations/:id').put(updateReservation).delete(deleteReservation)
router.route('/reservations').get(getReservation).post(addReservation)

// router.get('/clients/:id',(req,res)=>{
//     res.status(200).json({status:"success"})
// })

module.exports = router