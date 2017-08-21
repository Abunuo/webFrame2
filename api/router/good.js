var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 计费点列表、  cp列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/goods',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

/**
 * cp新增
 */
router.post('/', function(req, res) {
    ws.post({
        url: '/goods',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * cp删除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/goods/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
