
// express
const express = require('express');
const app = express();
const port = 3000;


app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const dbCode = require('./public/models/mongo-db.js');

const documentToWrite = { name: 'Jeff',
                          job: 'Salesman',
                          fdas: 'gdfs' };

dbCode.readFromWrite(documentToWrite);
// dbCode.readItem('testdb', 'testcoll', '64ada170721fd11a05aab29e');
