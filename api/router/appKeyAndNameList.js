var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 获取cp下的app列表
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/apps/idAndName/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        console.log(response);
        ws.handleResponse(response, res);
    })
});

/**
 * 获取appkey的数据列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/apps/idAndName',
        token: getToken(req)
    }).then(function(response) {
        console.log(response);
        ws.handleResponse(response, res);
    })
});

module.exports = router;
