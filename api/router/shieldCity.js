var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 获取所有的省份列表信息
 */

router.get('/', function(req, res) {
    ws.get({
        url: '/codeCmds/shieldCity',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

module.exports = router;
