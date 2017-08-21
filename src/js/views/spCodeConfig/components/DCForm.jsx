import React from 'react';
import {validate} from '../validate.js';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import AutoComplete from '../../AutoComplete.jsx';

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
            actions.codeConfigAction.changeForm(form);
        }
    }

    clean(){
      let { actions } = this.props;
      actions.codeConfigAction.resetForm();
    }

    back() {
      window.history.go(-1);
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.codeConfigAction.resetForm();
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;

        let provinceList = _.map(form.province, function(item) {
          return {
            key: item.id,
            value: item.name
          }
        });
        return (
            <div className="form channel-form">
                <FormField label="省份：" error={errors.province}>
                    <FormField.AutoCompleteForObject datas={provinceList} valueKey={model.province} value={model.provinceShow} onChangeKey={this.onChangeField('province').bind(this)} onChangeValue={this.onChangeField('provinceShow').bind(this)}/>
                </FormField>
                <FormField label="支付日限（元）：" error={errors.dailyLimit} >
                    <FormField.Input type="number" value={model.dailyLimit} onChange={this.onChangeField('dailyLimit').bind(this)}/>
                </FormField>
                <FormField label="支付月限（元）：" error={errors.monthlyLimit}>
                    <FormField.Input type="number" value={model.monthlyLimit} onChange={this.onChangeField('monthlyLimit').bind(this)}/>
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
