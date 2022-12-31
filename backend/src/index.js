const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

const filePath = path.join(__dirname, '..', '..', 'frontend', 'index.html');
const html = fs.readFileSync(filePath, 'utf-8');

const frontend = { root: '../frontend' };

app.get('/', async (req, res) => {
  const data = await db.loadAllPublicPCs();
  const injectedHtml = html.replace('undefined', escapeHTML(JSON.stringify(data)));
  return res.send(injectedHtml);
});

app.get('/*.(js|png)', (req, res) => {
  res.sendFile(req.url, frontend);
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

const escapeHTML = (str) =>
  str.replace(
    /[&<>]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
      }[tag])
  );
