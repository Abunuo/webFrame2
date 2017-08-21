var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var cookieUtil = require('../util/cookieUtil')
var getToken = cookieUtil.getToken;

/**
 * app列表
 */
router.get('/', function(req, res) {
    ws.get({
        url: '/apps',
        token: getToken(req),
        qs: req.query
    }).then(function(response) {
        res.send(response);
    });
});

/**
 * app新增
 */
router.post('/', function(req, res) {
   let data = req.body;
   let tokenInfo = cookieUtil.getTokenInfo(req);
   if(tokenInfo && tokenInfo.cpKey) {
     data.cpKey = tokenInfo.cpKey;
     ws.post({
         url: '/apps',
         token: getToken(req),
         data: data
     }).then(function(response) {
         ws.handleResponse(response, res);
     });
   } else {
     res.send({
       code: 401,
       msg: "权限不足"
     });
   }

});

/**
 * app修改
 */
router.post('/:id', function(req, res) {
    ws.post({
        url: '/apps/' + req.params.id,
        token: getToken(req),
        data: req.body
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});

/**
 * app删除
 */
router.delete('/:id', function(req, res) {
    ws.delete({
        url: '/apps/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});


/**
 * app按id查询
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/apps/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        ws.handleResponse(response, res);
    })
});



module.exports = router;
