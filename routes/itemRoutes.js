const express = require('express');
const { getItemController, addItemController, editItemController, deleteItemController } = require('../controllers/itemContrroller');


const router = express.Router();

router.get('/get-item',getItemController)
router.post('/add-item',addItemController)
router.put('/edit-item',editItemController)
router.delete('/delete-item/:itemId',deleteItemController)



module.exports= router