import React from 'react';
import FormField from '../../FormField.jsx';
import { ws } from '../../../lib/main.js';
import url from '../url.js';
import ProvinceSelect from '../../ProvinceSelect.jsx.js';

export default class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        notice:'模糊提示'
      };
      this.reset = this.reset.bind(this);
      this.onSearch = this.onSearch.bind(this);
    }

    componentDidMount() {
      let { actions, onSearch } = this.props;
      actions.cmdListAction.resetListQueryOptions();
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, form} = this.props;
            if(field == "spKey") {
              ws.get({ url: '/api/spCode/codeList', data: {spKey: value}})
                .then(function(response) {
                  if(response.code == 0){
                    form.codeList = response.data;
                    actions.cmdListAction.changeForm(form);
                  }
                });
            };
            if(field == "codeKey") {
              ws.get({ url: '/api/cmd/cmdList', data: {codeKey: value}})
                .then(function(response) {
                  if(response.code == 0){
                    form.cmdList = response.data;
                    actions.cmdListAction.changeForm(form);
                  }
                });
            };
            model[field] = value;
            actions.cmdListAction.changeListQueryOptions(model);
        }
    }

    reset() {
      let { actions } = this.props;
      actions.cmdListAction.resetListQueryOptions();
    }

    onSearch() {
        let {actions, onSearch, form} = this.props;
        actions.cmdListAction.resetListPagination();
        let p1 = ws.get({ url: '/api/spCode/codeList' });
        let p2 = ws.get({ url: '/api/cmd/cmdList'});
        Promise.all([p1, p2]).then(function(responses) {
          if(responses[0].code == 0){
            form.codeList = responses[0].data;
          };
          if(responses[1].code == 0){
            form.cmdList = responses[1].data;
          };
          actions.cmdListAction.changeForm(form);
        })
        setTimeout(onSearch, 0);
    }

    render() {
        let {model, form} = this.props;

        let spList = _.map(form.spList, function(item) {
          return {
            key: item.key,
            value: item.name
          }
        });
        let codeList =  _.map(form.codeList, function(item) {
            return {
                key: item.key,
                value: item.name
            }
        });
        let cmdList =  _.map(form.cmdList, function(item) {
            return {
                key: item.key,
                value: item.name
            }
        });
        let provinceList =  _.map(form.province, function(item) {
            return {
                id: item.id,
                name: item.name
            }
        });
        let statusList = _.map(form.status, function(item) {
          return {
            key: item.id,
            value: item.name
          }
        })

        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                      <FormField label="sp简称:">
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
                      </FormField>
                      <FormField label="开通省份:">
                          <ProvinceSelect datas={provinceList} value={model.province} onChange={this.onChangeField('province').bind(this)}/>
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
