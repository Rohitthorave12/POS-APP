const billsModel = require('../models/billsModel.js')


 const addBillsController = async (req, res) => {
    try {
        const newBill = new billsModel(req.body)
        await newBill.save()
        res.status(201).send('Bill Created Successfully!')
    } catch (error) {
        
        res.status(400).json({ message: "Server error", error });
        console.log(error)
    }
}


const getBillsController = async (req, res) => {
    try {
        const bills = await billsModel.find();
        res.status(200).json(bills);  
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Server error", error });
    }
};




module.exports = {
    addBillsController,
    getBillsController
}