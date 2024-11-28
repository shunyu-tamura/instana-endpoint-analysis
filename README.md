# instana-endpoint-analysis

## Overview

This is a CSV download API created by wrapping InstanaAPI.

### Configuration File Modifications

Edit the following sections in `config.json`:

- `"host": "api.example.com"`  
  - The host for Instana.  
- `"token": "your_api_token"`  
  - The API token for Instana.  
    - Official documentation: [Instana Web REST API](https://www.ibm.com/docs/en/instana-observability/current?topic=apis-web-rest-api)

---

### Startup

Start the application with the following command:  

```bash
npm start
```

If you see the following output, the application has started successfully:

```bash
> instana-endpoint-analysis@1.0.0 start
> node ./src/main.js

Server is running at http://localhost:3000
```

---

### Download CSV

#### Download Results for the Previous Day

Access the following URL in your browser:  
*(Note: Replace `xxx` with the service you want to analyze.)*

```
http://localhost:3000/analysis/service/xxx
```

You should be able to download a CSV file containing the API analysis results within the service for the previous day.

---

#### Download Results for a Specific Date

To specify a date, add the following query parameter:  
*(Note: Replace `yyyymmdd` with the desired analysis date.)*

```
http://localhost:3000/analysis/service/xxx?date=yyyymmdd
```
