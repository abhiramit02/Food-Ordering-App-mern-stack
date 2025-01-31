const User = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        const datas = await User.find();
        res.status(200).json(datas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUsers = async (req, res) => {
    try {
        const { name, email, password, phone, address, isAdmin } = req.body;

        // Store the password as plain text
        const newUser = await User.create({ name, email, password, phone, address, isAdmin });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if the entered password matches the stored plain text password
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Since you're not using jwt, you can just return success message
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,  // Ensure this is included
            // Any other fields you need
          });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.editUsers = async (req, res) => {
    try {
        const edit_id = req.params.id;
        const { name, email, password, phone, address, isAdmin } = req.body;
        const updatedUser = await User.findByIdAndUpdate(edit_id, { name, email, password, phone, address, isAdmin }, { new: true });
        if (updatedUser) {
            return res.status(200).json(updatedUser);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUsers = async (req, res) => {
    try {
        const delete_id = req.params.id;
        await User.findByIdAndDelete(delete_id);
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
};
