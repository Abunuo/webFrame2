export function validate(field) {
    return function(value, model) {
        let error = null;
        switch (field) {
            case "yearMonth":
                if(value == null) {
                    error = "请选择日期";
                }
                break;
            case "KeyShow":
                if(value == null) {
                    error = "请输入CP名称";
                }
                break;
            case "cmdKeyShow":
                if(value == null) {
                    error = "请输入代码资费编号";
                }
                break;
            case "province":
                if(value == null) {
                    error = "请选择省份";
                }
                break;
            case "limit":
                if(value == null) {
                    error = "请输入放量阈值";
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
    let fields = ["yearMonth","KeyShow","cmdKeyShow","province","limit"];
    fields.forEach(function(field) {
        let value = model[field];
        errors[field] = validate(field)(value, model);
    });
    return errors;
}

export function isValid(errors) {
    let result = true;
    for(let field in errors) {
        if(errors[field] != null) {
            result = false;
            break;
        }
    }
    return result;
}