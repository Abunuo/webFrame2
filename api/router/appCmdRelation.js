var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 查询单条app代码分配规则
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/appCmdRelation/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        console.log(response);
        ws.handleResponse(response, res);
    })
});



module.exports = router;
