var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 获取cpRole角色类型
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/signUp/cp/roles',
        token: getToken(req)
    }).then(function(response) {
        console.log(1);
        res.send(response);
    })
});

module.exports = router;
