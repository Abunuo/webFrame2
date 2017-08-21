export function validate(field) {
    return function(value, model) {
        let error = null;
        switch (field) {
            case "name":
                if(value == null) {
                    error = "账号不能为空";
                }
                break;
            case "password":
                if(value == null) {
                    error = "密码不能为空";
                }
                break;
            case "role":
                if(value == null) {
                    error = "用户角色不能为空";
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
    let fields = ["name", "password", "role"];
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