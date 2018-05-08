const express = require('express');
const app = express();
const ServerPortRouter = express.Router();

ServerPortRouter.route('/').get(function (req, res) {    
        if(req.body.address) res.json({address: req.body.address});
        else if(req.address) res.json({address: req.address});
        else res.json({body: req.body});    
});

module.exports = ServerPortRouter;