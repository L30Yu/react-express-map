const express = require('express');
const app = express();
const ServerPortRouter = express.Router();
const getAddresses = require('../utils/readCsv');

ServerPortRouter.route('/').post(function (req, res) {
    if (req.body.query) {
        let query = req.body.query.trim().toLowerCase();

        getAddresses(query).then(addresses => {
            let result = addresses.filter(value => {
                return value.toLowerCase().indexOf(query) >= 0;
            }).filter((elem, pos, arr) => {
                return arr.indexOf(elem) === pos;
            });;
            res.json({ addresses: result });
        });
    }
    // else if(req.address) res.json({address: req.address});
    else res.json({ body: req.body, hello: 'this is server...' });
});

module.exports = ServerPortRouter;