export function validate(field) {
    return function(value, model) {
      var error = null;
      switch (field){
        case "name":
          if (value == null || value.length == 0) {
              error = "请输入计费点名称";
          }
          if (value!=null) {
            if((value.toString().length) >= 12){
              error = "请输入少于12位的字符串";
            }
          }
          break;
        case "appKey":
          if (value == null || value.length == 0) {
              error = "请输入app简称";
          }
          break;
        case "price":
          if (value == null || value.length == 0) {
              error = "请输入计费点金额";
          }
          break;
        case "key":
          if (value == null || value.length == 0) {
              error = "请输入计费点编号";
          }
          break;
        default:
          break;
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
