var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * cp核减配置列表查询
 */
router.get('/', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/cpReduce ',
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
 * cp核减配置状态列表查询
 */
router.get('/switchStatus', function(req, res) {
    ws.get({
        url: '/common/switchStatus',
        token: getToken(req),
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * cp核减配置单条查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/cpReduce/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});
/**
 * cp核减配置新增
 */
router.post('/', function(req, res) {
    ws.post({
        url: '/cpReduce',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * cp核减配置修改
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/cpReduce/'+ req.params.id,
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * cp核减配置删除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/cpReduce/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
