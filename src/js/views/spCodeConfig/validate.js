export function validate(field) {
    return function(value, model) {
        var error = null;
        switch (field) {
            case 'province':
                if(value == null || value.length == 0) {
                    error = '请选择省份';
                }
                break;
            case 'dailyLimit':
                if(value == null || value.length == 0) {
                    error = '请输入支付日限';
                }
                break;
            case 'monthlyLimit':
                if(value == null || value.length == 0) {
                    error = '请输入支付月限';
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
