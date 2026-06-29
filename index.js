const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/userid=:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { key } = req.query;

    const response = await fetch(
      `https://username-usrid-to-num.onrender.com/userid=${id}?key=${key}`
    );
    const data = await response.json();

    // ✅ Developer change
    data.developer = "@Boss_Hcrr";

    res.json(data);
  } catch (err) {
    res.json({ status: false, error: "Something went wrong" });
  }
});

app.get('/', (req, res) => {
  res.send('UserID to Number API Running! ✅');
});

app.listen(3000);
