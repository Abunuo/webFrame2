import React from 'react';
import moment from 'moment';
import FormField from '../../FormField.jsx';
import Datetime from '../../Datetime.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onReset = this.onReset.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChangeField(field) {
        return function (value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            actions.cpCmdFeeLimitAction.changeListQueryOptions(model);
        }
    }

    onReset() {
        let {actions} = this.props;
        actions.cpCmdFeeLimitAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.cpCmdFeeLimitAction.resetListPagination();
        setTimeout(onSearch, 0);

    }
    render() {
        let {model, onSearch, codecmds, province, cp} = this.props;
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
                        <FormField label="日期:">
                            <Datetime value={model.yearMonth} onChange={this.onChangeField('yearMonth').bind(this)}
                                      dateFormat="YYYY-MM" timeFormat={false} viewMode="months" closeOnSelect={true}
                                      inputProps={{className: 'form-input form-control'}}/>
                        </FormField>
                        <FormField label="CP简称:">
                            <FormField.AutoCompleteForObject datas={cp} keyName="key" valueName="name" value={model.cpShow} valueKey={model.cpKey} onChangeValue={this.onChangeField('cpShow').bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                        </FormField>
                        <FormField label="代码资费编号：">
                            <FormField.AutoCompleteForObject datas={codecmds} keyName="key" valueName="key" value={model.cmdKeyShow} valueKey={model.cmdKey} onChangeValue={this.onChangeField('cmdKeyShow').bind(this)} onChangeKey={this.onChangeField('cmdKey').bind(this)}/>
                        </FormField>
                        <FormField label="省份">
                            <FormField.Select datas={province} value={model.provinceId} onChange={this.onChangeField('provinceId').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search cpcmdfeelimit">
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