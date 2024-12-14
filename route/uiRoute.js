const express = require('express');
const path = require('path');
const router = express.Router();

// Render the registration form
router.get('/registrations/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/register.html'));
});

// Render the view page
router.get('/registration/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../resources/view/view.html'));
});

module.exports = router;
