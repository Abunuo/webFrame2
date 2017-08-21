var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 拉取所有是壳的数据
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/cps/type/'+req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * 拉取cp类型的数据
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/cps/types',
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});



module.exports = router;
