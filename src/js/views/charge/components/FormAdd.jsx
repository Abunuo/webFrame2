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
            if(field == 'cpKey') {
              if (value != null) {
                let id = value;

                //请求app的数据信息
                ws.get({
                    url:'/api/appKeyAndNameList/'+ id
                }).then(function(response){
                  if(response.code == 0){
                    form.appNameList = response.data;
                    actions.chargeAction.changeForm(form);
                    // _this.appList();
                  }
                })
              }
            }
            if(field == 'cmdKey' ){
              if (value != null) {
                let id = value;

                //请求省份的数据信息
                ws.get({
                    url:'/api/openProvinceList/'+ id
                }).then(function(response){
                  if(response.code == 0){
                    let openProvinceList = response.data;
                    form.cmdProvince = openProvinceList.cmdProvinces;
                    actions.chargeAction.changeForm(form);
                    // _this.appList();
                  }
                })
              }
            }
            // if(field == 'priority'){
            //   console.log(value);
            //   value = parseInt(value);
            // }
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

    // appList(){
    //   let {form} = this.props;
    //   var appNameList = _.map(form.appNameList,function(item){
    //     return {
    //       key: item.id,
    //       value: item.name
    //     }
    //   });
    // }

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

        let cpNameList = _.map(form.cpNameList,function(item){
          return {
            key: item.key,
            value: item.name
          }
        });

        let cmdNameList = _.map(form.cmdNameList,function(item){
          return {
            key: item.key,
            value: item.key
          }
        });

        var appNameList = _.map(form.appNameList,function(item){
          return {
            key: item.key,
            value: item.name
          }
        });
        return (
            <div className="form cp-form">
              <FormField label="CP简称:" error={errors.cpName}>
                    <FormField.AutoCompleteForObject required datas={cpNameList} value={model.cpName} valueKey={model.cpKey} onChangeValue={this.onChangeField("cpName").bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/>
              </FormField>
              <FormField label="APP名称:" error={errors.appName}>
                  <FormField.AutoCompleteForObject  required datas={appNameList} value={model.appName} valueKey={model.appKey} onChangeValue={this.onChangeField("appName").bind(this)} onChangeKey={this.onChangeField('appKey').bind(this)}/>
              </FormField>
              <FormField label="代码资费编号:" error={errors.cmdKeyShow}>
                  <FormField.AutoCompleteForObject required datas={cmdNameList} value={model.cmdKeyShow} valueKey={model.cmdKey} onChangeValue={this.onChangeField("cmdKeyShow").bind(this)} onChangeKey={this.onChangeField('cmdKey').bind(this)}/>
              </FormField>
              <FormField label="开通省份:" error={errors.content}>
                  <FormField.Input placeholder="根据代码资费编号显示" value={form.cmdProvince} disabled onChange={this.onChangeField('cmdProvince').bind(this)}/>
              </FormField>
              <FormField label="屏蔽省份:" error={errors.content}>
                  <FormField.MultipleAutoComplete datas={provinceList} value={model.shieldProvinceId} onChange={this.onChangeField('shieldProvinceId').bind(this)}/>
              </FormField>
              <FormField label="屏蔽城市:" error={errors.content}>
                  <FormField.MultipleAutoComplete datas={shieldCityList} value={model.shieldCityNum} onChange={this.onChangeField('shieldCityNum').bind(this)}/>
              </FormField>
              <FormField label="权重:" error={errors.priority}>
                <FormField.Input placeholder="请输入0~100之间的数字" value={model.priority} placeholder="请输入0~100之间的数字" onChange={this.onChangeField('priority').bind(this)}/>
                  {/* <FormField.Number min="0" max="100" value={model.priority} placeholder="请输入0~100之间的数字" onChange={this.onChangeField('priority').bind(this)}/> */}
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
