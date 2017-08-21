import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';

export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.chargeAction.changeForm(form);
        }
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.chargeAction.resetForm();
    }


    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;
        return (
            <div className="form cp-form">
              <FormField label="代码资费编号:" error={errors.name}>
                  <FormField.Input value={model.codeTariffId} onChange={this.onChangeField('codeTariffId').bind(this)}/>
              </FormField>
              <FormField label="开通省份:" error={errors.name}>
                  <FormField.Input value={model.open} onChange={this.onChangeField('open').bind(this)}/>
              </FormField>
              <FormField label="屏蔽城市:" error={errors.content}>
                  <FormField.Input value={model.shieldCountry} onChange={this.onChangeField('shieldCountry').bind(this)}/>
              </FormField>
              <FormField label="权重:" error={errors.content}>
                  <FormField.Input value={model.weight} onChange={this.onChangeField('weight').bind(this)}/>
              </FormField>
              <FormField>
                  <button className="btn btn-default form-control" onClick={onSubmit}>提交</button>
              </FormField>
            </div>
        )
    }
}
