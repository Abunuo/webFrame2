import React from 'react';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import url from '../url.js';

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
      let { actions, onSearch} = this.props;
      actions.codeListAction.resetListQueryOptions();
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, form} = this.props;
            if(field == "spKey") {
              ws.get({ url: '/api/spCode/codeList', data: {spKey: value}})
                .then(function(response) {
                  if(response.code == 0){
                    form.codeList = response.data;
                    actions.codeListAction.changeForm(form);
                  }
                });
            };
            model[field] = value;
            actions.codeListAction.changeListQueryOptions(model);
        }
    }

    reset() {
      let { actions } = this.props;
      actions.codeListAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch, form} = this.props;
        actions.codeListAction.resetListPagination();
        ws.get({ url: '/api/spCode/codeList'})
          .then(function(response) {
            if(response.code == 0){
              form.codeList = response.data;
              actions.codeListAction.changeForm(form);
            }
          });
        setTimeout(onSearch, 0);
    }

    render() {
        let {model, form} = this.props;
        let spList = _.map(form.spList, function(item) {
          return {
            key: item.key,
            value:item.name
          }
        });
        let codeList = _.map(form.codeList, function(item) {
          return {
            key: item.key,
            value:item.name
          }
        });
        let mobileCompanyList = _.map(form.mobileCompany, function(item) {
          return {
            key: item.id,
            value:item.name
          }
        });
        let bizTypeList = _.map(form.bizType, function(item) {
          return {
            key: item.id,
            value:item.name
          }
        });
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="SP简称:">
                            <FormField.AutoCompleteForObject datas={spList} value={model.spKeyShow} valueKey={model.spKey} onChangeValue={this.onChangeField('spKeyShow').bind(this)} onChangeKey={this.onChangeField('spKey').bind(this)}/>
                        </FormField>
                        <FormField label="代码名称:">
                            <FormField.AutoCompleteForObject datas={codeList} value={model.codeKeyShow} valueKey={model.codeKey} onChangeValue={this.onChangeField('codeKeyShow').bind(this)} onChangeKey={this.onChangeField('codeKey').bind(this)}/>
                        </FormField>
                        <FormField label="运营商:">
                            <FormField.Select  value={model.carrier} datas={mobileCompanyList} onChange={this.onChangeField('carrier').bind(this)}/>
                        </FormField>
                        <FormField label="业务类型:">
                            <FormField.Select value={model.bizType} datas={bizTypeList} onChange={this.onChangeField('bizType').bind(this)}/>
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
