var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;

/**
 * cp列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/cps',
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
        url: '/cps',
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    });
});

/**
 * cp单个查询详细信息
 */
router.get('/info/:id', function(req, res) {
    ws.get({
        url: '/cps/info/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * cp单个查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/cps/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});



/**
 * cp删除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/cps/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


/**
 * cp修改
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/cps/' + req.params.id,
        data: req.body,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

module.exports = router;
