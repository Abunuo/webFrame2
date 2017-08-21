import React from 'react';
import FormField from '../../FormField.jsx';
import ProvinceSelect from '../../ProvinceSelect.jsx.js';

export default class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        notice:'模糊查询'
      };
      this.reset = this.reset.bind(this);
      this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
      let { actions, onSearch } = this.props;
      actions.spAction.resetListQueryOptions();
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions} = this.props;
            model[field] = value;
            actions.spAction.changeListQueryOptions(model);
        }
    }

    reset() {
      let { actions } = this.props;
      actions.spAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.spAction.resetListPagination();
        setTimeout(onSearch, 0);
    }


    render() {
        let {model, onSearch, form} = this.props;
        // let spList =  _.map(form.spList, function(item) {
        //     return {
        //         key: item.key,
        //         value: item.name
        //     }
        // });
        // let codeList =  _.map(form.codeList, function(item) {
        //     return {
        //         key: item.key,
        //         value: item.name
        //     }
        // });
        // let cmdList =  _.map(form.cmdList, function(item) {
        //     return {
        //         key: item.key,
        //         value: item.name
        //     }
        // });
        let provinceList =  _.map(form.province, function(item) {
            return {
                id: item.id,
                name: item.name
            }
        });
        let mobileCompanyList =  _.map(form.mobileCompany, function(item) {
            return {
                key: item.id,
                value: item.name
            }
        });
        let bizTypeList =  _.map(form.bizType, function(item) {
            return {
                key: item.id,
                value: item.name
            }
        });
        let statusList =  _.map(form.status, function(item) {
            return {
                key: item.id,
                value: item.name
            }
        });
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div ref = "form" className="form form-search">
                        {/* <FormField label="sp简称:">
                            <FormField.AutoCompleteForObject datas={spList} value={model.spKeyShow} valueKey={model.spKey} onChangeValue={this.onChangeField('spKeyShow').bind(this)}
                            onChangeKey={this.onChangeField('spKey').bind(this)}/>
                        </FormField>
                        <FormField label="代码名称:">
                            <FormField.AutoCompleteForObject datas={codeList} value={model.codeKeyShow} valueKey={model.codeKey} onChangeValue={this.onChangeField('codeKeyShow').bind(this)}
                            onChangeKey={this.onChangeField('codeKey').bind(this)}/>
                        </FormField>
                        <FormField label="代码资费名称:">
                            <FormField.AutoCompleteForObject datas={cmdList} value={model.cmdKeyShow} valueKey={model.cmdKey} onChangeValue={this.onChangeField('cmdKeyShow').bind(this)}
                            onChangeKey={this.onChangeField('cmdKey').bind(this)}/>
                        </FormField> */}
                        <FormField label="sp简称:">
                          <FormField.Input value={model.spName} placeholder={this.state.notice} onChange={this.onChangeField('spName').bind(this)}/>
                        </FormField>
                        <FormField label="代码名称:">
                          <FormField.Input value={model.codeName} placeholder={this.state.notice} onChange={this.onChangeField('codeName').bind(this)}/>
                        </FormField>
                        <FormField label="代码资费名称:">
                          <FormField.Input value={model.cmdName} placeholder={this.state.notice} onChange={this.onChangeField('cmdName').bind(this)}/>
                        </FormField>
                        <FormField label="开通省份:">
                            <ProvinceSelect datas={provinceList} value={model.provinceId} onChange={this.onChangeField('provinceId').bind(this)}/>
                        </FormField>
                        <FormField label="运营商:">
                            <FormField.Select  value={model.carrier} datas={mobileCompanyList} onChange={this.onChangeField('carrier').bind(this)}/>
                        </FormField>
                        <FormField label="业务类型:">
                            <FormField.Select value={model.bizType} datas={bizTypeList} onChange={this.onChangeField('bizType').bind(this)}/>
                        </FormField>
                        <FormField label="代码资费状态:">
                            <FormField.Select value={model.status} datas={statusList} onChange={this.onChangeField('status').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-search btn-primary" onClick={this.onSearch}>查询</button>
                    </FormField>
                    <FormField>
                        <button className="btn btn-search btn-primary" onClick={this.reset}>重置</button>
                    </FormField>
                </div>
            </div>
        )
    }
}
