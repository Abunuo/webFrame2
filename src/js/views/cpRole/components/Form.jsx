import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {Link} from 'react-router';

export default class extends React.Component {

   constructor(props){
     super(props);
   }

    onChangeField(field) {
      let {form,actions} = this.props,
          {errors} = form;
        let _this = this;
        return function(value) {
            let {form, actions} = this.props;
            if (field == "roleId") {
              form.model['role'] = parseInt(value);
            }
            if (field == "isSelfConsumption") {
              value = parseInt(value);
            }
            if(field == 'type'){
              value = parseInt(value);
              if (value == 0 ) {
                form.model['isSelfConsumption'] = 2;
              }else{
                form.model['isSelfConsumption'] = "";
              }
            }

            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.cpAction.changeForm(form);
        }
    }

    onReset(){
      let {actions} = this.props;
      actions.cpAction.resetForm();
    }

    componentWillUnmount() {
        let {actions,form} = this.props;
        form.model=[];
        actions.cpAction.resetForm();
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;
        // console.log(model.upayCompany);
        // let cpTypeList = _.map(form.cpTypeList, function(item) {
        //     return {
        //         key: item.typeId,
        //         value: item.typeName
        //     }
        // });
        // let cpRoleList = _.map(form.cpRoleList, function(item) {
        //     return {
        //         key: item.roleId,
        //         value: item.roleName
        //     }
        // });
        // let upayCompanyList = _.map(form.upayCompanyList, function(item) {
        //     return {
        //         key: item.id,
        //         value: item.name
        //     }
        // });
        let isSelfConsumptionList = _.map(form.isSelfConsumptionList, function(item) {
          return {
            key: item.id,
            value: item.name
          }
        });
        // let cpPaterList = _.map(form.cpPaterList, function(item) {
        //   return {
        //     key: item.key,
        //     value: item.name
        //   }
        // })
        //
        // console.log(upayCompanyList);

        return (
            <div className="form cp-form">
              <FormField label="cp简称：" error={errors.name} required>
                  <FormField.Input disabled value={model.name} onChange={this.onChangeField('name').bind(this)}/>
              </FormField>
              <FormField label="cp公司全称：" error={errors.content} required>
                  <FormField.Input disabled value={model.fullName} onChange={this.onChangeField('fullName').bind(this)}/>
              </FormField>
              <FormField label="对接方式：" error={errors.type} required>
                  <FormField.Input disabled value={model.type} onChange={this.onChangeField('type').bind(this)}/>
                  {/* <FormField.Select disabled datas={cpTypeList} value={model.type} onChange={this.onChangeField('type').bind(this)}/> */}
              </FormField>
              <FormField label="上级cp：" error={errors.content}>
                  {/* <FormField.Select disabled datas={cpPaterList} value={model.cpKey} onChange={this.onChangeField('cpKey').bind(this)}/> */}
                  <FormField.Input value={model.paterName} disabled onChange={this.onChangeField('paterName').bind(this)}/>
              </FormField>
              <FormField label="cp类型：" error={errors.gameId}>
                  {/* <FormField.Input value={model.typeName} disabled onChange={this.onChangeField('typeName').bind(this)}/> */}
                  <FormField.Select disabled datas={isSelfConsumptionList} value={model.isSelfConsumption} onChange={this.onChangeField('isSelfConsumption').bind(this)}/>
              </FormField>
              <FormField label="所属公司：" error={errors.upayCompany} required>
                <FormField.Input value={model.upayCompany} disabled onChange={this.onChangeField('upayCompany').bind(this)}/>
                  {/* <FormField.Select disabled datas={upayCompanyList} value={model.upayCompany} onChange={this.onChangeField('upayCompany').bind(this)}/> */}
              </FormField>
              <FormField label="登录账号：" error={errors.loginName} required>
                  <FormField.Input disabled value={model.loginName} onChange={this.onChangeField('loginName').bind(this)}/>
              </FormField>
              <FormField label="登录密码：" error={errors.password} required>
                  <FormField.Input type="password" placeholder="请输入6-20个字母、数字" value={model.password} onChange={this.onChangeField('password').bind(this)}/>
              </FormField>
              <FormField>
                  <div className="search-btn-container form form-search">
                      <FormField>
                        <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                      </FormField>
                      <FormField>
                        <Link className="btn btn-primary" to="/cp/list">返回</Link>
                      </FormField>
                  </div>
              </FormField>
            </div>
        )
    }
}
