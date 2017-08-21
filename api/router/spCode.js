var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

//spCode查询
router.get('/', function(req, res) {
    ws.get({
        url: '/codes',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

//查询所有代码的key与name
router.get('/codeList', function(req, res) {
    ws.get({
        url: '/codes/keyAndName',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//查询运营商信息
router.get('/mobileCompany', function(req, res) {
    ws.get({
        url: '/codes/mobileCompany',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//查询业务类型
router.get('/bizType', function(req, res) {
    ws.get({
        url: '/codes/bizType',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//查询代码类型
router.get('/codeType', function(req, res) {
    ws.get({
        url: '/codes/codeType',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//代码 id查询
router.get('/:id', function(req, res) {
    ws.get({
        url: '/codes/' + req.params.id,
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//spCode新加
router.post('/', function(req, res) {
    ws.post({
        url: '/codes',
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

//spCode修改
router.post('/:id', function(req, res) {
    ws.post({
        url: '/codes/' + req.params.id,
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

// spCode删除
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/codes/' + req.params.id,
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


module.exports = router;
