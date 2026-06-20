const express = require('express');
const router = express.Router();
const AuthorRequest = require('../models/AuthorRequest');

router.post('/', async (req, res) => {
  try {
    const { name, contactNumber, email, booksWritten, message } = req.body;

    if (!name || !contactNumber || !email || booksWritten === undefined) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    const request = new AuthorRequest({
      name,
      contactNumber,
      email,
      booksWritten,
      message
    });

    await request.save();
    res.status(201).json({ message: 'Your request has been submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const requests = await AuthorRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch author requests.' });
  }
});

router.patch('/:id/approve', async (req, res) => {
  try {
    const request = await AuthorRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to approve request.' });
  }
});

module.exports = router;
