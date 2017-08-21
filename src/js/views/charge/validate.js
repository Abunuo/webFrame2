export function validate(field) {
    return function(value, model) {
      var error = null;
      switch (field){
        case "cpName" :
          if (value == null || value.length == 0) {
            error = "请输入cp名称";
          }
          break;
        case "appName" :
          if (value == null || value.length == 0) {
            error = "请输入app名称";
          }
          break;
        case "cmdKeyShow" :
          if (value == null || value.length == 0) {
            error = "请输入代码资费编号";
          }
          break;
        case "priority" :
          var reg = /^[1-9]\d*$|^0$/;
          if (reg.exec(value)) {
            if(value > 100 || value < 0){
              error = '请输入大于0小于等于100的数字';
            }
          }
          if (!reg.exec(value)) {
            error = '请输入正确的格式';
          }
          if (value == null || value.length == 0) {
            error = "请输入权重"
          }
        default:
          break;
      }
      return error
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
