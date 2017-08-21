import React from 'react';
import {validate} from '../validate.js';
import FormField from '../../FormField.jsx';
import {Link} from "react-router";
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    componentWillUnmount() {
        let {actions} = this.props;
        actions.cpReduceperAction.resetForm();
    }

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            if(field === 'percent') {
                if(!/^\d+$/.test(value)) value=0;
                value = (Number(value) != NaN && Number(value)> 0) ? (Number(value)>=100?100: Number(value)) : 0 ;
            }
            if(field === 'cpKey')
            {
                if (value != null) {
                    let id = value;
                    //请求某个cp下的app的数据信息
                    ws.get({
                        url:'/api/appKeyAndNameList/'+ id
                    }).then(function(response){
                        if(response.code == 0){
                            form.appNameList = response.data;
                            actions.cpReduceperAction.changeForm(form);
                        }
                    })
                }
            }
            if(field === 'appKey')
            {
                if (value != null) {
                    let id = value;
                    //请求某个app下的code数据信息
                    ws.get({
                        url:'/api/codeKeyAndName/'+ id
                    }).then(function(response){
                        if(response.code == 0){
                            form.codeList = response.data;
                            actions.cpReduceperAction.changeForm(form);
                        }
                    })
                }
            }
            if(field === 'codeKey')
            {
                if (value != null) {
                    let id = value;
                    //请求某个代码的配置省份数据信息
                    ws.get({
                        url:'/api/codeProvince/'+ id
                    }).then(function(response){
                        if(response.code == 0){
                            form.provinceList = response.data;
                            actions.cpReduceperAction.changeForm(form);
                        }
                    })
                }
            }
            form.errors[field] = validate(field)(value, form.model);
            form.model[field] = value;
            actions.cpReduceperAction.changeForm(form);
        }
    }
    render() {
        let {form, onSubmit, cp, status} = this.props,
            {model, errors, appNameList, codeList, provinceList} = form;
        provinceList = _.map(provinceList, function(item) {
            return {
                key: item.key,
                value: item.name
            }
        });
        status = _.map(status, function(item) {
            return {
                key: item.statusId,
                value: item.statusName
            }
        });
        return (
            <div className="form game-form">
                <FormField label="CP名称:" error={errors.cpShow}>
                    <FormField.AutoCompleteForObject datas={cp} keyName="key" valueName="name" value={model.cpShow} valueKey={model.cpKey} onChangeValue={this.onChangeField('cpShow').bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                </FormField>
                <FormField label="APP名称：" error={errors.appShow}>
                    <FormField.AutoCompleteForObject datas={appNameList} keyName="key" valueName="name" value={model.appShow} valueKey={model.appKey} onChangeValue={this.onChangeField('appShow').bind(this)} onChangeKey={this.onChangeField('appKey').bind(this)}/>
                </FormField>
                <FormField label="代码名称：" error={errors.codeShow}>
                    <FormField.AutoCompleteForObject datas={codeList} keyName="key" valueName="name" value={model.codeShow} valueKey={model.codeKey} onChangeValue={this.onChangeField('codeShow').bind(this)} onChangeKey={this.onChangeField('codeKey').bind(this)}/>
                </FormField>
                <FormField label="省份" error={errors.province}>
                    <FormField.Select datas={provinceList} value={model.province} onChange={this.onChangeField('province').bind(this)}/>
                </FormField>
                <FormField label="核减比例(%)：" error={errors.percent}>
                    <FormField.Input value={model.percent}  onChange={this.onChangeField('percent').bind(this)}/>
                </FormField>
                <FormField label="核减状态：" error={errors.status}>
                    <FormField.Select datas={status} value={model.status}  onChange={this.onChangeField('status').bind(this)}/>
                </FormField>
                <FormField>
                    <div  className="search-btn-container form form-search">
                        <FormField>
                            <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                        </FormField>
                        <FormField>
                            <Link className="btn btn-primary" to="/cpreduceper">返回</Link>
                        </FormField>
                    </div>
                </FormField>
            </div>
        )
    }
}