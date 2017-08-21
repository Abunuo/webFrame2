import React from 'react';
import {validate} from '../validate.js';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import {Link} from 'react-router';

export default class extends React.Component {

    constructor(props) {
      super(props);
      this.clean = this.clean.bind(this);
    }

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            form.errors[field] = validate(field)(value, form.model);
            form.model[field] = value;
            actions.spListAction.changeForm(form);
        }
    }

    clean(){
      let { actions } = this.props;
      actions.spListAction.resetForm();
    }

    back() {
      window.history.go(-1);
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.spListAction.resetForm();
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;

        let upayCompanyList =  _.map(form.upayCompanyList, function(item) {
            return {
                key: item.id,
                value: item.name
            }
        });

        return (
            <div className="form channel-form">
                <FormField label="SP简称：" error={errors.name}>
                    <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                </FormField>
                <FormField label="SP公司全称：" error={errors.fullName}>
                    <FormField.Input value={model.fullName} onChange={this.onChangeField('fullName').bind(this)}/>
                </FormField>
                <FormField label="所属公司：" error={errors.upayCompany}>
                    <FormField.Select datas={upayCompanyList} value={model.upayCompany} onChange={this.onChangeField('upayCompany').bind(this)}/>
                </FormField>
                <FormField label="联系人：">
                    <FormField.Input value={model.contact} onChange={this.onChangeField('contact').bind(this)}/>
                </FormField>
                <FormField label="联系电话：" error={errors.mobile}>
                    <FormField.Input value={model.mobile} placeholder={"请输入:15345678910或者010-58756542"} onChange={this.onChangeField('mobile').bind(this)}/>
                </FormField>
                <FormField label="联系邮箱：" error={errors.email}>
                    <FormField.Input type="email" value={model.email} onChange={this.onChangeField('email').bind(this)} />
                </FormField>
                <FormField>
                    <div  className="search-btn-container form form-search">
                        <FormField>
                          <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                        </FormField>
                        <FormField>
                          <button className="btn btn-primary " onClick={this.back}>返回</button>
                        </FormField>
                    </div>
                </FormField>
            </div>
        )
    }
}
