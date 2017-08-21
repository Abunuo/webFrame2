var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

//sp查询
router.get('/', function(req, res) {
    ws.get({
        url: '/sps',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

//查询所有sp的key与name
router.get('/spList', function(req, res) {
    ws.get({
        url: '/sps/keyAndName',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//获取所属公司列表
router.get('/upayCompany', function(req, res) {
    ws.get({
        url: '/sps/subCompany',
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//sp id查询
router.get('/:id', function(req, res) {
    ws.get({
        url: '/sps/' + req.params.id,
        token: cookieUtil.getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

//sp获取全部列表
// router.get('/all', function(req, res) {
//     ws.get({
//         url: '/sps',
//         token: cookieUtil.getToken(req)
//     }).then(function(response) {
//         res.send(response);
//     });
// });


//sp新加
router.post('/', function(req, res) {
    ws.post({
        url: '/sps',
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

//sp修改
router.post('/:id', function(req, res) {
    ws.post({
        url: '/sps/' + req.params.id,
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});


module.exports = router;
