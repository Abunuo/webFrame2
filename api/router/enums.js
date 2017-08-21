var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

router.get('/op/roles', function(req, res) {
    ws.get({
        url: '/signUp/op/roles',
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * 省份列表查询
 */
router.get('/province', function(req, res) {
    ws.get({
        url: '/codeCmds/province',
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
module.exports = router;