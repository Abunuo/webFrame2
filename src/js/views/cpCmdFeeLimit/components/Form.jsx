import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import Datetime from '../../Datetime.jsx';
import {Link} from "react-router";
import moment from "moment";
import {ws} from '../../../lib/main.js';

export default class extends React.Component {
    componentWillUnmount() {
        let {actions} = this.props;
        actions.cpCmdFeeLimitAction.resetForm();
    }

    onChangeField(field) {
        return function (value) {
            let {form, actions} = this.props;
            if(field === 'limit') {
                if(!/^\d+$/.test(value)) value=0;
                value = (Number(value) != NaN && Number(value)> 0) ? Number(value) : 0 ;
            }
            if(field === 'cpKey')
            {
                if (value != null) {
                    let cpKey = value;
                    ws.get({
                        url:'/api/cmdKeyAndName/'+ cpKey
                    }).then(function(response){
                        if(response.code == 0){
                            form.codeCmdsList = response.data;
                            actions.cpCmdFeeLimitAction.changeForm(form);
                        }
                    })
                }
            }
            if(field === 'cmdKey')
            {
                if (value != null) {
                    let cmdKey = value;
                    //请求某个代码资费所在省份数据信息
                    ws.get({
                        url:'/api/codeCmdProvince/'+ cmdKey
                    }).then(function(response){
                        if(response.code == 0){
                            form.provinceList = response.data;
                            actions.cpCmdFeeLimitAction.changeForm(form);
                        }
                    })
                }
            }
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.cpCmdFeeLimitAction.changeForm(form);
        }
    }

    isValidDate(currentDate){
        return currentDate.valueOf() >= new moment(new moment().format("YYYY-MM-DD"), "YYYY-MM-DD").valueOf();
    }

    render() {
        let {form, onSubmit, cp} = this.props,
            {model, errors, codeCmdsList, provinceList} = form;
        provinceList = _.map(provinceList, function(item) {
            return {
                key: item.key,
                value: item.name
            }
        });
        return (
            <div className="form cp-form">
                <FormField label="日期:" error={errors.yearMonth}>
                    <Datetime value={model.yearMonth} isValidDate={this.isValidDate} onChange={this.onChangeField('yearMonth').bind(this)}
                              dateFormat="YYYY-MM-DD" timeFormat={false} closeOnSelect={true} minDate="2017-03-02"
                              inputProps={{className: 'form-input form-control'}}/>
                </FormField>
                <FormField label="CP名称:" error={errors.KeyShow}>
                    <FormField.AutoCompleteForObject datas={cp} keyName="key" valueName="name" value={model.KeyShow} valueKey={model.cpKey} onChangeValue={this.onChangeField('KeyShow').bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                </FormField>
                <FormField label="代码资费编号：" error={errors.cmdKeyShow}>
                    <FormField.AutoCompleteForObject datas={codeCmdsList} keyName="key" valueName="key" value={model.cmdKeyShow} valueKey={model.cmdKey} onChangeValue={this.onChangeField('cmdKeyShow').bind(this)} onChangeKey={this.onChangeField('cmdKey').bind(this)}/>
                </FormField>
                <FormField label="省份" error={errors.province}>
                    <FormField.Select datas={provinceList} value={model.province} onChange={this.onChangeField('province').bind(this)}/>
                </FormField>
                <FormField label="放量阈值：" error={errors.limit}>
                    <FormField.Input value={model.limit} onChange={this.onChangeField('limit').bind(this)}/>
                </FormField>
                <FormField>
                    <div  className="search-btn-container form form-search">
                        <FormField>
                            <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                        </FormField>
                        <FormField>
                            <Link className="btn btn-primary" to="/cpcmdfeelimit">返回</Link>
                        </FormField>
                    </div>
                </FormField>
            </div>
        )
    }
}