const express = require('express');
const sendPostRequest = require('./request');
const config = require('../config.json');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;


const app = express();

const host = config.app.host;
const port = config.app.port;

app.get('/:service', async (req, res) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0);
    console.log(startOfDay)
    const to = startOfDay.getTime(); // ミリ秒単位のUnix時間
    const windowSize = 86400000;
    const service = req.params.service;
    const responseFileName = `${service}.csv`
    const csvHeader = config.csv.header;

    let response = await sendPostRequest(to, windowSize, service);

    // CSVデータをクライアントに送信
    const csvStringifier = createCsvStringifier({
      header: csvHeader, // ヘッダーの設定
    });
    const csvString = csvStringifier.getHeaderString() + '\n' + csvStringifier.stringifyRecords(response).trim();

    // レスポンスヘッダーを設定
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${responseFileName}`);
    

    res.status(200).send(csvString);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });
  
app.listen(port, () => {
console.log(`Server is running at http://${host}:${port}`);
});

