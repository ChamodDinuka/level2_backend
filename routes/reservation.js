const express = require('express')
const router = express.Router();
const {getClients,addClient,updateClient,deleteClient} = require('../controllers/clients')

router.route('/clients/:id').put(updateClient).delete(deleteClient)
router.route('/clients').get(getClients).post(addClient)


// router.get('/clients/:id',(req,res)=>{
//     res.status(200).json({status:"success"})
// })

module.exports = router