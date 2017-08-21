var express = require('express');
var router = express.Router();
var ws = require('../util/ws');
var jwtUtil = require('../util/jwtUtil');
var getToken = require('../util/cookieUtil').getToken;


/**
 * 根据代码资费编号，获取开通省份信息
 */
router.get('/:id', function(req, res) {
    ws.get({
        url: '/codeCmdInfo/' + req.params.id,
        token: getToken(req)
    }).then(function(response) {
        console.log(response);
        ws.handleResponse(response, res);
    })
});



module.exports = router;
