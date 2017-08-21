export function validate(field) {
    return function(value, model) {
        var error = null;
        switch (field) {
            case 'password':
                if(value == null || value.length == 0) {
                    error = '请输入密码';
                } else if(value.length < 8) {
                    error = '请输入至少8位长度密码';
                }
                break;
            case 'passwordAgain':
                if(value == null || value.length == 0) {
                    error = '请输入确认密码';
                } else if(value != model.password) {
                    error = '两次输入的密码不一致';
                }
                break;
            default:
                // do nothing
        }
        return error;
    }
}

export function validateAll(model) {
    let errors = {};
    for(let field in model) {
        let value = model[field];
        errors[field] = validate(field)(value, model);
    }
    return errors;
}

export function isValid(errors) {
    let isValid = true;
    for(let p in errors) {
        let value = errors[p];
        if(value && value.length > 0) {
            isValid = false;
            break;
        }
    }
    return isValid;
}