const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); 
const cors = require('cors'); //異なるlocalhostでも通信できるようにする？

const uri = process.env.ATLAS_URI;


mongoose.connect(uri, ({useNewUrlParser: true, useUnifiedTopology: true}))
mongoose.connection.once('open', () => {
  console.log('connected to database!')
})

app.use(cors());
app.use(
  '/graphql', graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(8000, () => {
  console.log('now listening for requests on port 8000');
});
