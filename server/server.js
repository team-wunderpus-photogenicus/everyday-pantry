const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '/build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/public/index.html'));
})



app.listen(3000, () => console.log('Listening on port 3000.'));
