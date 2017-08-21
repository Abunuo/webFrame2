import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';

export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.userAction.changeForm(form);
        }
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.userAction.resetForm();
    }


    render() {
        let {form, opRoles, onSubmit, isUpdate} = this.props,
            {model, errors} = form,
            nameView;
        opRoles = _.map(opRoles, function(item) {
            return {
                key: item.roleId,
                value: item.roleName
            }
        });
        if(isUpdate) {
            nameView = (
                <div className="form-control">{model.name}</div>
            )
        } else {
            nameView = (
                <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
            )
        }
        return (
            <div className="form cp-form">
                <FormField label="账号：" error={errors.name}>
                    {nameView}
                </FormField>
                <FormField label="密码：" error={errors.password}>
                    <FormField.Input type="password" value={model.password} onChange={this.onChangeField('password').bind(this)}/>
                </FormField>
                <FormField label="角色：" error={errors.role}>
                    <FormField.Select datas={opRoles} value={model.role} valueType="number" onChange={this.onChangeField('role').bind(this)}/>
                </FormField>
                <FormField>
                    <button className="btn btn-default form-control" onClick={onSubmit}>提交</button>
                </FormField>
            </div>
        )
    }
}