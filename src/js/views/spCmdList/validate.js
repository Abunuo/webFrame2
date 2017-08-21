export function validate(field) {
    return function(value, model) {
        var error = null;
        switch (field) {
            case 'spKey':
                if(value == null || value.length == 0) {
                    error = '请选择SP简称';
                }
                break;
            case 'codeKey':
                if(value == null || value.length == 0) {
                    error = '请选择代码名称';
                }
                break;
            case 'name':
                if(value == null || value.length == 0) {
                    error = '请输入代码资费名称';
                }
                break;
            case 'price':
                if(value == null || value.length == 0) {
                    error = '请输入代码资费价格';
                } else if(value < 0){
                    error = '请输入正确的价格'
                }
                break;
            case 'province':
                if(value == null || value.length == 0) {
                    error = '请选择开通省份';
                }
                break;
            case 'status':
                if(value == null || value.length == 0) {
                    error = '请选择代码资费状态';
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
