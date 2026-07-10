const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/tgnum', async (req, res) => {
  try {
    const { tgusername, apikey } = req.query;

    if (!tgusername) return res.status(400).json({ error: "tgusername required" });
    if (!apikey) return res.status(401).json({ error: "apikey required" });

    // ✅ Real upstream API call
    const response = await fetch(
      `https://username-usrid-to-num.onrender.com/username/${encodeURIComponent(tgusername)}?key=${apikey}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0"
        },
        timeout: 15000
      }
    );

    const upstream = await response.json();

    // ✅ Build exact response format
    const finalResponse = {
      "Api Buy": "@Boss_Hcrr",
      "Owner": "@Boss_Hcrr",
      "response": {
        "parameters": {
          "value": tgusername,
          "service": "Telegram to Number",
          "success": true
        },
        "data": upstream?.data || upstream?.result || upstream?.contacts || []
      },
      "credit": "@Boss_Hcrr",
      "developer": "@Boss_Hcrr"
    };

    return res.json(finalResponse);

  } catch (err) {
    return res.status(500).json({
      error: err.message,
      "Api Buy": "@Boss_Hcrr",
      developer: "@Boss_Hcrr"
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    status: "running",
    endpoint: "/tgnum?tgusername=@username&apikey=YOUR_KEY",
    developer: "@Boss_Hcrr"
  });
});

app.listen(3000);
