import React from 'react';
import FormField from '../../FormField.jsx';
import AutoComplete from '../../AutoComplete.jsx';
import {ws} from '../../../lib/main.js';


export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.state={
          cpNameList : []
        };
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            console.log(model);
            actions.cpAction.changeListQueryOptions(model);
        }
    }

    componentDidMount(){
        let _this = this;
        ws.get({
          url:'/api/cpKeyAndNameList'
        }).then(function(response){
          if(response.code == 0){
            _this.setState({
                cpNameList: response.data
            })
          }
        })
    }


    onSearch() {
        let {actions, onSearch} = this.props;
        actions.cpAction.resetListPagination();
        onSearch();
    }

    onReset() {
      let {actions, onSearch} = this.props;
      actions.cpAction.resetListQueryOptions();
    }

    render() {
        let {model, onSearch} = this.props;
        let cpTypeList = _.map([{"id": 0,"name": "壳"},{"id": 1,"name": "api"},{"id": 2,"name": "sdk"}],function(item){
              return {
                key: item.id,
                value :item.name
              }
        });

        let cpNameList = _.map(this.state.cpNameList,function(item){
          return{
            key: item.key,
            value: item.name
          }
        })

        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        {/* <FormField label="CP类型:">
                          <AutoComplete helperList={isSelfConsumptionList} value={model.isSelfConsumption} onChange={this.onChangeField('isSelfConsumption').bind(this)} />
                        </FormField> */}
                        <FormField label="CP简称：">
                          <FormField.AutoCompleteForObject datas={cpNameList} value={model.cpName} valueKey={model.cpKey} onChangeValue={this.onChangeField('cpName').bind(this)}
                          onChangeKey={this.onChangeField('cpKey').bind(this)}/>
                            {/* <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/> */}
                        </FormField>
                        <FormField label="对接方式:" >
                            <FormField.Select datas={cpTypeList} value={model.cpType} onChange={this.onChangeField('cpType').bind(this)}/>
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
