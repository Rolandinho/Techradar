const express = require('express');
const router = express.Router();

// Hårdkodad data
const radarEntries = [
  {
    "plattform": "AWS",
    "verktyg": "EC2",
    "beskrivning": "Elastic Compute Cloud",
    "funktionsomrade": "Cloud Computing",
    "adopt": true,
    "trial": false,
    "assess": false,
    "hold": false
  },
  {
    "plattform": "Azure",
    "verktyg": "Azure Functions",
    "beskrivning": "Serverless compute service",
    "funktionsomrade": "Cloud Computing",
    "adopt": true,
    "trial": true,
    "assess": false,
    "hold": false
  }
];

// GET route som returnerar hårdkodad data
router.get('/', (req, res) => {
  res.json(radarEntries);
});

module.exports = router;
