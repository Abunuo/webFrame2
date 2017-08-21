export function validate(field) {
    return function(value, model) {
        var error = null;
        switch (field) {
            case 'spKey':
                if(value == null || value.length == 0) {
                  error = '请选择SP简称'
                }
                break;
            case 'fullName':
                if(value == null || value.length == 0) {
                    error = '请输入代码名称';
                }
                break;
            case 'carrier':
                if(value == null || value.length == 0) {
                    error = '请选择运营商';
                }
                break;
            case 'Rate':
                if(value == null || value.length == 0) {
                    error = '请输入分成比例';
                } else if(value < 0 || value > 100){
                    error = '请输入正确的分成比例（0-100）';
                }
                break;
            // case 'mobileRate':
            //     if(value == null || value.length == 0) {
            //         error = '请输入移动分成比例';
            //     } else if(value < 0 || value > 100){
            //         error = '请输入正确的移动分成比例（0-100）';
            //     }
            //     break;
            // case 'unicomRate':
            //     if(value == null || value.length == 0) {
            //         error = '请输入联通分成比例';
            //     } else if(value < 0 || value > 100){
            //         error = '请输入正确的联通分成比例（0-100）';
            //     }
            //     break;
            // case 'telecomRate':
            //     if(value == null || value.length == 0) {
            //         error = '请输入电信分成比例';
            //     } else if(value < 0 || value > 100){
            //         error = '请输入正确的电信分成比例（0-100）';
            //     }
            //     break;
            case 'codeType':
                if(value == null || value.length == 0) {
                    error = '请选择代码类型';
                }
                break;
            case 'bizType':
                if(value == null || value.length == 0) {
                    error = '请选择业务类型';
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
