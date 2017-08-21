var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

//sp查询
router.get('/', function(req, res) {
    ws.get({
        url: '/userLimit',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

//sp id查询
router.get('/:id', function(req, res) {
    ws.get({
        url: '/userLimit/' + req.params.id,
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});


//sp新加
router.post('/', function(req, res) {
    ws.post({
        url: '/userLimit',
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

//sp修改
router.post('/:id', function(req, res) {
    ws.post({
        url: '/userLimit/' + req.params.id,
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});


module.exports = router;
