const Items = require('../models/itemModel.js')


const getItemController = async (req, res) => {
    try {
        const items = await Items.find();
        res.status(200).json(items);  // Use `.json()` for API response
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

 const addItemController = async (req, res) => {
    try {
        const newItem = new Items(req.body)
        await newItem.save()
        res.status(201).send('Item Created Successfully!')
    } catch (error) {
        
        res.status(400).json({ message: "Server error", error });
        console.log(error)
    }
}

const editItemController = async (req, res) => {
    try {
        await Items.findOneAndUpdate({ _id: req.body.itemId }, req.body);
        res.status(200).json({ message: "Item Updated Successfully!" }); 
    } catch (error) {
        res.status(400).json({ message: "Server error", error });
        console.error("Error updating item:", error);
    }
};

const deleteItemController = async (req, res) => {
    try {
        const { itemId } = req.params;

        // const item = await Items.findById(itemId);
        // if (!item) {
        //     return res.status(404).json({ message: "Item not found" });
        // }
        await Items.findOneAndDelete({ _id: itemId });
        res.status(200).json({ message: "Item deleted successfully" }); 
         
    } catch (error) {
        res.status(500).json({ message: "Server error", error }); 
        console.error("Error deleting item:", error); 
    }
};


module.exports = {
    getItemController,
    addItemController,
    editItemController,
    deleteItemController
}