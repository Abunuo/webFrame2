var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil');

//代码日月限 id查询
router.get('/select/:id', function(req, res) {
  ws.get({
    url: '/codeLimits/' + req.params.id,
    token: cookieUtil.getToken(req),
  }).then(function(response) {
    ws.handleResponse(response, res);
  });
});


//代码日月限查询
router.get('/:codeKey', function(req, res) {
    req.query.codeKey = req.params.codeKey;
    ws.get({
        url: '/codeLimits',
        token: cookieUtil.getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});


//代码日月限新加
router.post('/', function(req, res) {
    ws.post({
        url: '/codeLimits',
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

//代码日月限修改
router.post('/:id', function(req, res) {
    ws.post({
        url: '/codeLimits/' + req.params.id,
        token: cookieUtil.getToken(req),
        data: req.body
    }).then(function(response) {
        res.send(response);
    });
});

// 代码日月限删除
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/codeLimits/' + req.params.id,
        token: cookieUtil.getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


module.exports = router;
