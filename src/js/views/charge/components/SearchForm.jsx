import React from 'react';
import FormField from '../../FormField.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            // console.log(" "+value+" "+field);
            actions.chargeAction.changeListQueryOptions(model);
        }
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.chargeAction.resetListPagination();
        onSearch();
    }

    onReset() {
      let {actions, onSearch} = this.props;
      actions.chargeAction.resetListQueryOptions();
    }

    render() {
        let {model, onSearch, form, cpNameList, appNameList} = this.props;

        let cpList = _.map(cpNameList,function(item){
          return {
            key: item.key,
            value: item.name
          }
        });

        let appList = _.map(appNameList,function(item){
          return {
            key: item.key,
            value: item.name
          }
        });

        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="CP简称:">
                          <FormField.AutoCompleteForObject  datas={cpList} value={model.cpKeyShow} valueKey={model.cpKey} onChangeValue={this.onChangeField("cpKeyShow").bind(this)} onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                        </FormField>
                        <FormField label="App名称:">
                          <FormField.AutoCompleteForObject  datas={appList} value={model.appKeyShow} valueKey={model.appKey} onChangeValue={this.onChangeField("appKeyShow").bind(this)} onChangeKey={this.onChangeField('appKey').bind(this)}/>
                        </FormField>
                        <FormField label="代码资费编号:">
                            <FormField.Input value={model.cmdKey} onChange={this.onChangeField('cmdKey').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-primary" onClick={onSearch}>查询</button>
                    </FormField>
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onReset.bind(this)}>重置</button>
                    </FormField>
                </div>
            </div>
        )
    }
}
