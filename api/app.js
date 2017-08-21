var express = require('express');
var tokenFilter = require('./filter/tokenFilter');

var app = express();
app.use(tokenFilter);
app.use('/login', require('./router/login'));
app.use('/oss', require('./router/oss'));
app.use('/user', require('./router/user'));
app.use('/enums', require("./router/enums"));
app.use('/user', require('./router/user'));
app.use('/enums', require("./router/enums"));
app.use('/cp', require('./router/cp'));
app.use('/cpType', require('./router/cpType'));
app.use('/app', require('./router/app'));
app.use('/openProvinceList', require('./router/openProvinceList'));
app.use('/appCmdRelation', require('./router/appCmdRelation'));
app.use('/cpKeyAndNameList', require('./router/cpKeyAndNameList'));
app.use('/appKeyAndNameList', require('./router/appKeyAndNameList'));
app.use('/cmdKeyAndNameList', require('./router/cmdKeyAndNameList'));
app.use('/cmdKeyAndName', require('./router/cmdKeyAndName'));
app.use('/codeCmdProvince', require('./router/codeCmdProvince'));
app.use('/good', require('./router/good'));
app.use('/count', require('./router/count'));
app.use('/appCmdRelation', require('./router/charge'));
app.use('/cpRole', require('./router/cpRole'));
app.use('/province', require('./router/province'));
app.use('/shieldCity', require('./router/shieldCity'));
app.use('/subCompany', require('./router/subCompany'));
app.use('/cpCmdFeeLimit', require('./router/cpCmdFeeLimit'));
app.use('/cpCmdFeeLimit', require('./router/cpCmdFeeLimit'));
app.use('/cpReduceper', require('./router/cpReduceper'));
app.use('/codeKeyAndName', require('./router/codeKeyAndName'));
app.use('/codeProvince', require('./router/codeProvince'));
app.use('/phoneImsi', require('./router/phoneImsi'));
app.use('/cmd', require('./router/spCodeCmd'));
app.use('/sp', require('./router/sp'));
app.use('/spCode', require('./router/spCode'));
app.use('/spCodeConfig', require('./router/spCodeConfig'));
app.use('/spUser', require('./router/spUser'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    var status = err.status || 500;
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error json
    console.log(err);
    res.status(status);
    res.send(err.message);
});

module.exports = app;
