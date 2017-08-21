var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var getToken = require('../util/cookieUtil').getToken;

/**
 * 黑名单新增
 */
router.get('/blacklist', function(req, res) {
    ws.get({
        url: '/blacklist',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * 手机黑名单列表查询
 */
router.get('/phone', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/blacklist/phone',
        token: token,
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * IMSI黑名单列表查询
 */
router.get('/imsi', function(req, res) {
    var token = getToken(req);
    ws.get({
        url: '/blacklist/imsi  ',
        token: token,
        qs: req.query
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * 黑名单新增
 */
router.post('/blacklist', function(req, res) {
    ws.post({
        url: '/blacklist',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * 手机黑名单新增
 */
router.post('/phone', function(req, res) {
    ws.post({
        url: '/blacklist/phone',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * IMSI黑名单新增
 */
router.post('/imsi', function(req, res) {
    ws.post({
        url: '/blacklist/imsi',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});
/**
 * 黑名单移除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/blacklist/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
