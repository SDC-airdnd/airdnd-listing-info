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

app.get('/listings/:id', (req, res) => {
  const { id } = req.params;
  const listings = db.collection('listingInfo');

  

  db.query(aql`
    FOR listing in ${listings}
    FILTER listing.id == ${id}
    RETURN listing
  `)
    .then((cursor) => {
      //console.log('cursor: ', cursor);
  
      cursor.forEach((listing) => {
        res.status(200).send(listing);
      })
      
    })
    .catch((error) => {
      res.status(500).send(error.message);
    })

  // try {
  //   const result = await db.query(aql);

  //   console.log('listing: ', result);
  //   res.status(200).send(result);
  // } catch (error) {
  //   res.status(500).send(error.message);
  // }

  // db.findOne({id: req.params.id}).exec((err, docs) => {
  //     if (err) {
  //       res.status(500).send();
  //     } else {
  //       res.status(200).send(docs);
  //     }
  //   })
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
