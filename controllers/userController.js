const userModal = require('../models/userModal')


const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await userModal.findOne({ userId, password, verified: true });

        if (user) {
            return res.status(200).json({ message: "Login Successful", user }); 
        } else {
            return res.status(401).json({ message: "Login failed", user: null }); 
        }
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};



 const registerController = async (req, res) => {
    try {
        const newUser = new userModal({...req.body, verified:true})
        await newUser.save()
        res.status(201).send('User Register Successfully')
    } catch (error) {
        
        res.status(400).json({ message: "Server error", error });
        console.log(error)
    }
}




module.exports = {
   loginController,
   registerController
}