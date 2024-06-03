const express = require('express');
const ServerlessHttp = require('serverless-http');
const filterByClientsParams = require('../middleware/filterParams');
const fetchFromSpreadSheet = require('../middleware/getDataFromSpreadSheet');

const app = express();
app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.post('/.netlify/functions/api/filter_data', [fetchFromSpreadSheet,filterByClientsParams], (req, res) => {
        res.send({data:req.body.filteredProperties});
    });

const handler = ServerlessHttp(app);

module.exports.handler = async(event, context) => {
    const result = await handler(event, context);
    return result;
}