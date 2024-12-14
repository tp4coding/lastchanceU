const express = require('express');
const fsdb = require('../fsdb'); // Ensure the path to FileSYS is correct
const router = express.Router(); // Initialize the router object

// Get all registrations
router.get('/registrations', async (req, res) => {
    const data = await fsdb.readAll();
    res.json(data);
});

// Get registrations by name
router.get('/registrations/byname/:name', async (req, res) => {
    const { name } = req.params;
    const data = await fsdb.readAll();
    const filtered = data.filter((registration) => registration.name === name);
    res.json(filtered);
});

// Get registrations by event
router.get('/registrations/event/:eventName', async (req, res) => {
    const { eventName } = req.params;
    const data = await fsdb.readAll();
    const filtered = data.filter((registration) => registration.eventName === eventName);
    res.json(filtered);
});

// Cancel a registration
router.get('/registrations/cancel/:ticketNumber', async (req, res) => {
    const { ticketNumber } = req.params;
    const success = await fsdb.delete(ticketNumber);
    if (success) {
        res.json({ message: `Ticket ${ticketNumber} successfully deleted.` });
    } else {
        res.status(404).json({ error: "Ticket not found." });
    }
});

// Export the router
module.exports = router;
