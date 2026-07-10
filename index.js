const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/tgnum', async (req, res) => {
  try {
    const { tgusername } = req.query;

    if (!tgusername) return res.status(400).json({ 
      "Api Buy": "@Boss_Hcrr",
      error: "tgusername required",
      developer: "@Boss_Hcrr"
    });

    // ✅ Real upstream API — no key needed
    const response = await fetch(
      `https://fz-tgnumid-info-paidxc.gauravcyber0.workers.dev/?tgusername=${encodeURIComponent(tgusername)}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const text = await response.text();
    let upstream;
    try {
      upstream = JSON.parse(text);
    } catch(e) {
      return res.status(502).json({
        "Api Buy": "@Boss_Hcrr",
        "Owner": "@Boss_Hcrr",
        error: "Upstream unavailable",
        developer: "@Boss_Hcrr"
      });
    }

    const finalResponse = {
      "Api Buy": "@Boss_Hcrr",
      "Owner": "@Boss_Hcrr",
      "response": {
        "parameters": {
          "value": tgusername,
          "service": "Telegram to Number",
          "success": upstream?.response?.parameters?.success || false
        },
        "data": upstream?.response?.data || []
      },
      "credit": "@Boss_Hcrr",
      "developer": "@Boss_Hcrr"
    };

    return res.json(finalResponse);

  } catch (err) {
    return res.status(500).json({
      "Api Buy": "@Boss_Hcrr",
      "Owner": "@Boss_Hcrr",
      error: err.message,
      developer: "@Boss_Hcrr"
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    status: "running ✅",
    endpoint: "/tgnum?tgusername=@username",
    developer: "@Boss_Hcrr"
  });
});

app.listen(3000);
