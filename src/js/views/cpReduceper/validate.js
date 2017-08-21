export function validate(field) {
    return function(value, model) {
        let error = null;
        switch (field) {
            case "cpShow":
                if(value == null) {
                    error = "请输入CP名称";
                }
                break;
            case "appShow":
                if(value == null) {
                    error = "请输入代码名称";
                }
                break;
            case "codeShow":
                if(value == null) {
                    error = "请输入代码名称";
                }
                break;
            case "province":
                if(value == null) {
                    error = "请选择省份";
                }
                break;
            case "percent":
                if(value == null) {
                    error = "请选输入核减比例值（0-100）";
                }
                break;
            case "status":
                if(value == null) {
                    error = "请选择核减状态";
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
    let fields = ["cpShow","appShow","codeShow","province","percent","status"];
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