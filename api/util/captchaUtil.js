var Captcha = require("trek-captcha");
var bcrypt = require("bcrypt");

function processResult(result, cb) {
    var captchaText = result.token;
    var saltRounds = 10;
    var captchaEncrypted = bcrypt.hashSync(captchaText.toLowerCase(), saltRounds);
    result.encryptedCode = captchaEncrypted;
    cb(result);
}

function generate() {
    return new Promise(function(resolve, reject) {
        try {
            var captchaResult = Captcha();
            if(captchaResult instanceof Promise) {
                captchaResult.then(function(result) {
                  processResult(result, resolve);
                }).catch(function(error) {
                  reject(error);
                });
            } else {
              processResult(captchaResult, resolve);
            }

        } catch (error) {
            reject(error);
        }
    });
}


function validate(captcha, encryptCaptcha) {
    captcha = captcha != null ? captcha : "";
    encryptCaptcha = encryptCaptcha != null ? encryptCaptcha : "";
    return bcrypt.compareSync(captcha.toLowerCase(), encryptCaptcha);
}

module.exports = {
    generate,
    validate
}
