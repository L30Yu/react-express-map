const express = require('express');
const app = express();
const ServerPortRouter = express.Router();
const getAddresses = require('../utils/readCsv');

ServerPortRouter.route('/').post(function (req, res) {
    if (req.body.addresses) {
        let query = req.body.addresses;
        getAddresses(query).then(addresses => {
            let result = addresses.filter(value => {
                return value.split(" ").find(word => word.toLowerCase().indexOf(query) === 0);
            });
            res.json({ addresses: result });
        });
    }
    // else if(req.address) res.json({address: req.address});
    else res.json({ body: req.body, hello: 'this is server...' });
});

module.exports = ServerPortRouter;