export function validate(field) {
    return function(value, model) {
      var error = null;
      switch (field) {
        case 'password':
          let patrn = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
          if (!patrn.exec(value)) {
            console.log("校验错误");
            error = '请输入6~20位字母和数字';
          }
          break;
        case 'type':
          if(value == null || value.length == 0) {
              error = '请输入对接方式';
          }
          break;
        case 'upayCompany':
          if(value == null || value.length == 0) {
              error = '请输入所属公司';
          }
          break;
        case 'loginName':
          if(value == null || value.length == 0) {
              error = '请输入登录账号';
          }
          break;
          default:
            break;
        }
        return error;
    }
}

export function validateAll(model, validate) {
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
