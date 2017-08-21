var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


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
 * 计费点单个查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/goods/' + req.params.id,
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
 * 计费点修改
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/goods/' + req.params.id,
        data: req.body,
        token: getToken(req)
    }).then(function(response) {
        console.log("计费点修改");
        ws.handleResponse(response, res);
    })
});

module.exports = router;
