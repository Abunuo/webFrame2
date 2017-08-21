var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * cp放量配置列表查询
 */
router.get('/', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/cpCmdFeeLimit ',
        token: token,
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * cp列表查询
 */
router.get('/cp', function(req, res) {
    ws.get({
        url: '/cps',
        token: getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * 代码资费编号列表查询
 */
router.get('/codeCmds', function(req, res) {
    ws.get({
        url: '/codeCmds ',
        token: getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * cp放量配置单条查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/cpCmdFeeLimit/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});
/**
 * cp放量配置新增
 */
router.post('/', function(req, res) {
    ws.post({
        url: '/cpCmdFeeLimit',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * cp放量配置修改
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/cpCmdFeeLimit/'+ req.params.id,
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * cp放量配置删除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/cpCmdFeeLimit/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
