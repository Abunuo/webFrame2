import React from 'react';
import {validate} from '../validate.js';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import AutoComplete from '../../AutoComplete.jsx';
import url from '../url.js';

export default class extends React.Component {

    constructor(props) {
      super(props);
      this.clean = this.clean.bind(this);
    }

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            if( field == 'carrier' ) {
              if(form.model.Rate) {
                switch(value) {
                  case '1' :
                    form.model.mobileRate = form.model.Rate;
                    form.model.unicomRate = 0;
                    form.model.telecomRate = 0;
                    break;
                  case '2' :
                    form.model.mobileRate = 0;
                    form.model.unicomRate = form.model.Rate;
                    form.model.telecomRate = 0;
                    break;
                  case '3' :
                    form.model.mobileRate = 0;
                    form.model.unicomRate = 0;
                    form.model.telecomRate = form.model.Rate;
                    break;
                  default:
                };
              }
            }
            if( field == 'Rate' && value) {
              value = Number(value);
              switch(form.model.carrier) {
                case '1' :
                  form.model.mobileRate = value;
                  break;
                case '2' :
                  form.model.unicomRate = value;
                  break;
                case '3' :
                  form.model.telecomRate = value;
                  break;
                default:
              };
            };
            form.errors[field] = validate(field)(value, form.model);
            form.model[field] = value;
            actions.codeListAction.changeForm(form);
        }
    }

    clean(){
      let { actions } = this.props;
      actions.codeListAction.resetForm();
    }

    back() {
      window.history.go(-1);
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.codeListAction.resetForm();
    }

    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;
        let disabled = url(location.search).id ? true : false;

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
        let codeTypeList =  _.map(form.codeType, function(item) {
            return {
                key: item.id,
                value: item.name
            }
        });
        let spList =  _.map(form.spList, function(item) {
            return {
                key: item.key,
                value: item.name
            }
        });
        return (
            <div className="form channel-form">
                <FormField label="SP简称：" error={errors.spKey}>
                    <FormField.AutoCompleteForObject datas={spList} disabled={disabled} value={model.spKeyShow} valueKey={model.spKey} onChangeValue={this.onChangeField('spKeyShow').bind(this)} onChangeKey={this.onChangeField('spKey').bind(this)}/>
                </FormField>
                <FormField label="代码名称：" error={errors.fullName}>
                    <FormField.Input value={model.fullName} onChange={this.onChangeField('fullName').bind(this)}/>
                </FormField>
                <FormField label="运营商：" error={errors.carrier}>
                    <FormField.Select value={model.carrier} datas={mobileCompanyList} onChange={this.onChangeField('carrier').bind(this)}/>
                </FormField>
                <FormField label="分成比例(%)：" error={errors.Rate}>
                  <FormField.Input type="number" value={model.Rate} onChange={this.onChangeField('Rate').bind(this)}/>
                  {/* <div className="col-sm-4">
                    <FormField label="移动">
                      <FormField.Input type="number" value={model.mobileRate} onChange={this.onChangeField('mobileRate').bind(this)}/>
                    </FormField>
                  </div>
                  <div className="col-sm-4">
                    <FormField label="联通">
                      <FormField.Input type="number" value={model.unicomRate} onChange={this.onChangeField('unicomRate').bind(this)}/>
                    </FormField>
                  </div>
                  <div className="col-sm-4">
                    <FormField label="电信">
                      <FormField.Input type="number" value={model.telecomRate} onChange={this.onChangeField('telecomRate').bind(this)}/>
                    </FormField>
                  </div> */}
                </FormField>
                <FormField label="代码类别：" error={errors.codeType}>
                    <FormField.Select datas={codeTypeList} value={model.codeType} type="password" onChange={this.onChangeField('codeType').bind(this)}/>
                </FormField>
                <FormField label="业务类型：" error={errors.bizType}>
                  <FormField.Select datas={bizTypeList} value={model.bizType} onChange={this.onChangeField('bizType').bind(this)}/>
                </FormField>
                <FormField label="调用SP路径：">
                    <FormField.Input value={model.route} placeholder="技术人员填写" onChange={this.onChangeField('route').bind(this)}/>
                </FormField>
                <FormField>
                    <div  className="search-btn-container form form-search">
                        <FormField>
                          <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                        </FormField>
                        <FormField>
                          <button className="btn btn-primary " onClick={this.back}>返回</button>
                        </FormField>
                    </div>
                </FormField>

            </div>
        )
    }
}
