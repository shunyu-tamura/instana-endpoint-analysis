const express = require('express');
const sendPostRequest = require('./request');
const config = require('../config.json');
const csv = require('csv-writer').createObjectCsvStringifier;


const app = express();

const host = config.app.host;
const port = config.app.port;

app.get('/', async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const to = startOfDay.getTime(); // ミリ秒単位のUnix時間
    const windowSize = 86400000;

    let response = await sendPostRequest(to, windowSize);

    const csvHeader = config.api.csv.header;
    const csvStringifier = csv({
      header: csvHeader,
    });

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });
  
app.listen(port, () => {
console.log(`Server is running at http://${host}:${port}`);
});

