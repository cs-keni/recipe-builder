const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: './uploads/avatars',
    filename: function(req, file, cb) {
        cb(null, 'avatar-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Update profile
router.put('/update', auth, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.user.id);

        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        user.name = name;
        user.email = email;
        await user.save();

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Change password
router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload avatar
router.post('/avatar', [auth, upload.single('avatar')], async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.avatar = `/uploads/avatars/${req.file.filename}`;
        await user.save();

        res.json({ avatar: user.avatar });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update avatar (from default icons)
router.put('/avatar/icon', auth, async (req, res) => {
    try {
        const { icon } = req.body;
        const user = await User.findById(req.user.id);
        user.avatar = icon;
        await user.save();

        res.json({ avatar: user.avatar });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 