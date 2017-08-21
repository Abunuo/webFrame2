var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

//代码资费查询
router.get('/', function(req, res) {
    ws.get({
        url: '/codeCmds',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

//查询代码资费列表（key name）
router.get('/cmdList', function(req, res) {
    ws.get({
        url: '/codeCmds/keyAndName',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

//查询省份
router.get('/province', function(req, res) {
    ws.get({
        url: '/codeCmds/province',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        res.send(response);
    });
});

//查询城市列表
router.get('/shieldCity', function(req, res) {
    ws.get({
        url: '/codeCmds/shieldCity',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        res.send(response);
    });
});

//sp id查询
router.get('/:id', function(req, res) {
    ws.get({
        url: '/codeCmds/' + req.params.id,
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});


//代码资费新加
router.post('/', function(req, res) {
    ws.post({
        url: '/codeCmds',
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

//代码资费状态全开/全关
router.post('/changeStatus', function(req, res) {
    ws.post({
        url: '/codeCmds/statusChange',
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

//代码资费修改
router.post('/:id', function(req, res) {
    ws.post({
        url: '/codeCmds/' + req.params.id,
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});




module.exports = router;
