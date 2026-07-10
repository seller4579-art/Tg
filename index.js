const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/tgnum', async (req, res) => {
  try {
    const { tgusername, apikey } = req.query;

    if (!tgusername) return res.status(400).json({ error: "tgusername required" });
    if (!apikey) return res.status(401).json({ error: "apikey required" });

    // Clean username - @ remove karo
    const cleanUsername = tgusername.replace('@', '');

    // ✅ Sahi upstream URL
    const upstreamUrl = `https://username-usrid-to-num.onrender.com/username/${cleanUsername}?key=${apikey}`;

    const response = await fetch(upstreamUrl, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    });

    // ✅ Pehle text lo phir parse karo
    const text = await response.text();

    let upstream;
    try {
      upstream = JSON.parse(text);
    } catch (e) {
      // HTML aa raha hai — upstream down ya wrong URL
      return res.status(502).json({
        "Api Buy": "@Boss_Hcrr",
        "Owner": "@Boss_Hcrr",
        "error": "Upstream API unavailable",
        "tip": "Real upstream API ka sahi URL daalo",
        "developer": "@Boss_Hcrr"
      });
    }

    // ✅ Data extract karo
    let data = [];
    if (Array.isArray(upstream)) data = upstream;
    else if (upstream?.data) data = Array.isArray(upstream.data) ? upstream.data : [upstream.data];
    else if (upstream?.result) data = Array.isArray(upstream.result) ? upstream.result : [upstream.result];
    else if (upstream?.contacts) data = upstream.contacts;
    else if (upstream?.number || upstream?.phone) data = [upstream];

    const finalResponse = {
      "Api Buy": "@Boss_Hcrr",
      "Owner": "@Boss_Hcrr",
      "response": {
        "parameters": {
          "value": tgusername,
          "service": "Telegram to Number",
          "success": data.length > 0
        },
        "data": data
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
    endpoint: "/tgnum?tgusername=@username&apikey=YOUR_KEY",
    developer: "@Boss_Hcrr"
  });
});

app.listen(3000);
