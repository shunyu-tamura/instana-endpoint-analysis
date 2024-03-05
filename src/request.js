const axios = require('axios');
const config = require('../config.json');

const apiUrl = `${config.api.protocol}://${config.api.host}${config.api.endpoint}`;
const apiToken = config.api.token;
const basicMetrics = config.api.metrics.basic;

// 非同期関数を作成
async function sendPostRequest(to, windowSize, service) {
  try {
    let offset = 0;
    let data = {
        "group": {
            "groupbyTag": "endpoint.name",
            "groupbyTagEntity": "DESTINATION"
        },
        "tagFilters": [{
            "name": "service.name",
            "operator": "EQUALS",
            "entity": "DESTINATION",
            "value": service
        }],
        "metrics": basicMetrics,
        "order": {
            "by": "endpoint.name",
            "direction": "ASC"
        },
        "pagination": {
            "IngestionTime": 0,
            "offset": offset
        },
        "timeFrame": {
            "to": to,
            "windowSize": windowSize
        }
    };
    const headers = {
        'Authorization': `apiToken ${apiToken}`,
        'content-type': 'application/json'
      };
      
      // HTTPリクエストを送信してレスポンスを取得
      const response = await axios.post(apiUrl, data, { headers });
      

    // レスポンスのデータを変数に入れる
    const responseData = response.data;

    csvData = responseData.items.map(item => ({
        endpoint: item.name,
        calls: item.metrics['calls.sum'][0][1],
        mean: item.metrics['latency.mean'][0][1],
        max: item.metrics['latency.max'][0][1],
        min: item.metrics['latency.max'][0][1],
        p50: item.metrics['latency.p50'][0][1],
      }));

    return csvData; // 必要に応じて返り値としても使えます
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // エラーが発生した場合、エラーを再スローするか処理することができます
  }
}

module.exports = sendPostRequest;
