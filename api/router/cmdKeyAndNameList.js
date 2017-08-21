var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * app简易列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/codeCmds/keyAndName',
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
