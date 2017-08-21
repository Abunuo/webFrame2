import React from 'react';
import {validate} from '../validate.js';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import ProvinceSelect from '../../ProvinceSelect.jsx.js';
import url from '../url.js';

export default class extends React.Component {

    constructor(props) {
      super(props);
      this.clean = this.clean.bind(this);
      this.state = {
        disabled: 'true'
      }
    }

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            let _this = this;
            if(field == "spKey") {
              ws.get({ url: '/api/spCode/codeList', data: {spKey: value}})
                .then(function(response) {
                  if(response.code == 0){
                    form.codeList = response.data;
                    actions.cmdListAction.changeForm(form);
                    _this.setState({
                      disabled: undefined
                    })
                  }
                });
            }
            form.errors[field] = validate(field)(value, form.model);
            form.model[field] = value;
            actions.cmdListAction.changeForm(form);
        }
    }

    clean(){
      let { actions } = this.props;
      actions.cmdListAction.resetForm();
    }

    back() {
      window.history.go(-1);
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.cmdListAction.resetForm();
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form,
            placeholder = model.key ? model.key : '保存后自动生成';

        let statusList = _.map(form.status, function(item){
          return {
            key: item.id,
            value: item.name
          }
        });
        let provinceList = _.map(form.province, function(item){
          return {
            id: item.id,
            name: item.name
          }
        });
        let shieldCityList = _.map(form.shieldCity, function(item){
          return {
            key: item.code,
            value: item.name
          }
        });
        let codeList = _.map(form.codeList, function(item) {
          return {
            key: item.key,
            value: item.name
          }
        });
        let spList = _.map(form.spList, function(item) {
          return {
            key: item.key,
            value: item.name
          }
        });
        return (
            <div className="form channel-form">
                <FormField label="代码资费编号：" error={errors.key}>
                    <FormField.Input value={model.key} placeholder={ placeholder }
                    disabled onChange={this.onChangeField('key').bind(this)}/>
                </FormField>
                <FormField label="SP简称：" error={errors.spKey}>
                    <FormField.AutoCompleteForObject datas={spList} value={model.spKeyShow} valueKey={model.spKey} onChangeValue={this.onChangeField('spKeyShow').bind(this)} onChangeKey={this.onChangeField('spKey').bind(this)}/>
                </FormField>
                <FormField label="代码名称：" error={errors.codeKey}>
                    <FormField.AutoCompleteForObject datas={codeList} disabled={this.state.disabled} value={model.codeKeyShow} valueKey={model.codeKey} onChangeValue={this.onChangeField('codeKeyShow').bind(this)} onChangeKey={this.onChangeField('codeKey').bind(this)}/>
                </FormField>
                <FormField label="代码资费名称：" error={errors.name}>
                    <FormField.Input value={model.name} placeholder="请输入：SP简称+代码名称+其他" onChange={this.onChangeField('name').bind(this)}/>
                </FormField>
                <FormField label="代码资费（元）：" error={errors.price}>
                    <FormField.Input type="number" value={model.price} onChange={this.onChangeField('price').bind(this)}/>
                </FormField>
                <FormField label="开通省份：" error={errors.province}>
                    <ProvinceSelect datas={provinceList} value={model.province} onChange={this.onChangeField('province').bind(this)}/>
                </FormField>
                <FormField label="屏蔽城市：" error={errors.shieldCity}>
                    <FormField.MultipleAutoComplete datas={shieldCityList} value={model.shieldCity} onChange={this.onChangeField('shieldCity').bind(this)}/>
                </FormField>
                <FormField label="代码资费状态：" error={errors.status}>
                    <FormField.Select valueType="number" datas={statusList} value={model.status} onChange={this.onChangeField('status').bind(this)}/>
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
