import React from 'react';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onReset = this.onReset.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChangeField(field) {
        return function (value) {
            let {model, actions, form} = this.props;
            model[field] = value;
            if(field === 'spKey')
            {
                if (value != null) {
                    let spKey = value;
                    ws.get({
                        url:'/api/spCode/codeList',
                        data:{
                            spKey:spKey
                        }
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
                if(model.spKey == null||model.spKey == '')
                    alert("请先选择SP");
            }
            actions.cpReduceperAction.changeListQueryOptions(model);
        }
    }

    onReset() {
        let {actions} = this.props;
        actions.cpReduceperAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.cpReduceperAction.resetListPagination();
        setTimeout(onSearch, 0);
    }

    render() {
        let {model, cp, province, sp, form} = this.props,
            {codeList} = form;
        province = _.map(province, function(item) {
            return {
                key: item.id,
                value: item.name
            }
        });
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="CP简称:">
                            <FormField.AutoCompleteForObject datas={cp} keyName="key" valueName="name" value={model.cpShow} valueKey={model.cpKey} onChangeValue={this.onChangeField('cpShow').bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                        </FormField>
                        <FormField label="SP简称:">
                            <FormField.AutoCompleteForObject datas={sp} keyName="key" valueName="name" value={model.spShow} valueKey={model.spKey} onChangeValue={this.onChangeField('spShow').bind(this)} onChangeKey={this.onChangeField('spKey').bind(this)}/>
                        </FormField>
                        <FormField label="代码名称:" >
                            <FormField.AutoCompleteForObject datas={codeList} keyName="key" valueName="name" value={model.codeShow} valueKey={model.codeKey} onChangeValue={this.onChangeField('codeShow').bind(this)} onChangeKey={this.onChangeField('codeKey').bind(this)} placeholder="请先选择SP简称"/>
                        </FormField>
                        <FormField label="省份">
                            <FormField.Select datas={province} value={model.provinceId} onChange={this.onChangeField('provinceId').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onSearch}>查询</button>
                    </FormField>
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onReset}>重置</button>
                    </FormField>
                </div>
            </div>
        )
    }
}