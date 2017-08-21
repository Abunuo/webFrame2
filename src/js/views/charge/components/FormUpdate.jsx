import React from 'react';
import {Link} from "react-router";
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    onChangeField(field) {
       let _this=this;
        return function(value) {
            let {form, actions} = this.props;
            if(field == 'cpName') {
              if (value != null) {
                let id = value;

                //请求app的数据信息
                ws.get({
                    url:'/api/appKeyAndNameList/'+ id
                }).then(function(response){
                  if(response.code == 0){
                    form.appNameList = response.data;
                    actions.chargeAction.changeForm(form);
                    _this.appList();
                  }
                })
              }
            }

            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.chargeAction.changeForm(form);
        }
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.chargeAction.resetForm();
    }

    onReset(){
      let {actions} = this.props;
      actions.chargeAction.resetForm();
    }

    appList(){
      let {form} = this.props;
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;
        let  provinceList = _.map(form.provinceList,function(item){
          return {
            key: item.id,
            value: item.name
          }
        });

        let shieldCityList = _.map(form.shieldCityList,function(item){
          return {
            key: item.code,
            value: item.name
          }
        });
        //
        // let cpNameList = _.map(form.cpNameList,function(item){
        //   return {
        //     key: item.id,
        //     value: item.name
        //   }
        // });
        //
        // let cmdNameList = _.map(form.cmdNameList,function(item){
        //   return {
        //     key: item.id,
        //     value: item.id
        //   }
        // });
        //
        // var appNameList = _.map(form.appNameList,function(item){
        //   return {
        //     key: item.id,
        //     value: item.name
        //   }
        // });
        return (
            <div className="form cp-form">
              <FormField label="CP简称:" error={errors.cpName}>
                <FormField.Input disabled required value={model.cpName} disabled onChange={this.onChangeField('cpName').bind(this)}/>
              </FormField>
              <FormField label="CPKey:" hide error={errors.name}>
                <FormField.Input disabled value={model.cpKey} disabled onChange={this.onChangeField('cpKey').bind(this)}/>
              </FormField>
              <FormField label="APP名称:" error={errors.appName}>
                <FormField.Input disabled required value={model.appName} disabled onChange={this.onChangeField('appName').bind(this)}/>
              </FormField>
              <FormField label="APPKey:" hide error={errors.name}>
                <FormField.Input disabled value={model.appKey} disabled onChange={this.onChangeField('appKey').bind(this)}/>
              </FormField>
              <FormField label="代码资费编号:" error={errors.cmdKeyShow}>
                  <FormField.Input disabled value={model.cmdKey} disabled onChange={this.onChangeField('cmdKey').bind(this)}/>
              </FormField>
              <FormField label="开通省份:" error={errors.content}>
                  <FormField.Input placeholder="根据代码资费编号显示" value={model.cmdProvinceName} disabled onChange={this.onChangeField('cmdProvinceName').bind(this)}/>
              </FormField>
              <FormField label="屏蔽省份:" error={errors.content}>
                  {/* <FormField.AutoCompleteForObject required datas={cpNameList} value={model.cpName} valueKey={model.cpKey} onChangeValue={this.onChangeField("cpName").bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/> */}
                  <FormField.MultipleAutoComplete datas={provinceList} value={model.shieldProvinceId} onChange={this.onChangeField('shieldProvinceId').bind(this)}/>
              </FormField>
              <FormField label="屏蔽城市:" error={errors.content}>
                  {/* <FormField.AutoCompleteForObject required datas={cpNameList} value={model.cpName} valueKey={model.cpKey} onChangeValue={this.onChangeField("cpName").bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/> */}
                  <FormField.MultipleAutoComplete datas={shieldCityList} value={model.shieldCityNum} onChange={this.onChangeField('shieldCityNum').bind(this)}/>
              </FormField>
              <FormField label="权重:" error={errors.priority}>
                  <FormField.Number value={model.priority} onChange={this.onChangeField('priority').bind(this)}/>
              </FormField>
              <FormField>
                  <div  className="search-btn-container form form-search">
                      <FormField>
                        <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                      </FormField>
                      <FormField>
                        <Link className="btn btn-primary" to="/charge">返回</Link>
                      </FormField>
                  </div>
              </FormField>
            </div>
        )
    }
}
