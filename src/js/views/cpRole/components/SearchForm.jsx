import React from 'react';
import FormField from '../../FormField.jsx';
import AutoComplete from '../../AutoComplete.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state={
          cpNameList:[],
          appNameList:[]
        }
    }

    onChangeField(field) {
        let _this = this;
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            actions.cpAction.changeListQueryOptions(model);
        }
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.cpAction.resetListPagination();
        onSearch();
    }

    onReset() {
      let {actions, onSearch} = this.props;
      actions.cpAction.resetListQueryOptions();
      onSearch();
      onReset();
    }

    render() {
        let {model, onSearch} = this.props;
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="CP简称：">
                            <FormField.Input value={model.cpName} onChange={this.onChangeField('cpName').bind(this)}/>
                        </FormField>
                        {/* <FormField label="APP编号：">
                            <FormField.Input value={model.appKey} onChange={this.onChangeField('appKey').bind(this)}/>
                        </FormField> */}
                        <FormField label="APP名称：">
                            <FormField.Input value={model.appName} onChange={this.onChangeField('appName').bind(this)}/>
                        </FormField>
                        {/* <FormField label="计费点名称：" >
                            <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                        </FormField> */}
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
