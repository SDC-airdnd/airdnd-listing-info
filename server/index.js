const express = require('express');
const app = express(); 
const bodyParser = require('body-parser')
const db = require('../database/index.js');
const { aql } = require('arangojs');
const cors = require('cors');
const port = 3002;

app.use(cors());
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/listings/:id', async (req, res) => {
  const { id } = req.params;
  const query = aql`FOR listing in listingInfo FILTER listing.id == ${parseInt(id)} RETURN listing`;

  try {
    const cursor = await db.query(query);
    const result = await cursor.all();

    // result turns an array, pull first json out of array to return
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
