import React from 'react';
import FormField from '../../FormField.jsx';
import {validate} from '../validate.js';
import FileUploadButton from '../../FileUploadButton.jsx';
import ImageUploader from '../../ImageUploader.jsx';
import {ws} from '../../../lib/main.js';
import {Link} from 'react-router';

/*
    FileUploadButton 中的url用于设置上传的文件存放到哪一个文件夹下面
*/
export default class extends React.Component {

    onChangeField(field) {
        return function(value) {
            let {form, actions} = this.props;
            if(field == "isDefaultDialog"){
              value = parseInt (value);
            }
            form.model[field] = value;
            form.errors[field] = validate(field)(value, form.model);
            actions.countAction.changeForm(form);
        }
    }

    onReset(){
      let {actions} = this.props;
      actions.countAction.resetForm();
    }

    back() {
      window.history.go(-1);
    }

    componentDidMount(){
      let {actions,form} = this.props;
      actions.utilAction.showLoading();
      ws.get({
        url:'/api/appKeyAndNameList/'+cpKey
      }).then(function(response){
        if(response.code == 0){
            form.appNameList = response.data;
            actions.utilAction.hideLoading();
            actions.countAction.changeForm(form);
        }
      })
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.countAction.resetForm();
    }


    render() {
        let {form, onSubmit} = this.props,
            {model, errors} = form;

        let isDefaultDialogList = _.map(form.isDefaultDialogList,function(item){
          return {
            key: item.id,
            value: item.name
          }
        })

        let appNameList = _.map(form.appNameList,function(item){
          return {
            key: item.key,
            value: item.name
          }
        })

        return (
            <div className="form count-form">
              <FormField label="App简称:" error={errors.appName}>
                <FormField.AutoCompleteForObject datas={appNameList} value={model.appName} valueKey={model.appKey} onChangeValue={this.onChangeField('appName').bind(this)}
                onChangeKey={this.onChangeField('appKey').bind(this)}/>
                  {/* <FormField.Input  value={model.key} onChange={this.onChangeField('key').bind(this)}/> */}
              </FormField>
              <FormField label="计费点编号:" error={errors.key}>
                  <FormField.Input placeholder="如果不输入则会系统自动生成" value={model.key} onChange={this.onChangeField('key').bind(this)}/>
              </FormField>
              <FormField label="计费点名称:" error={errors.name}>
                  <FormField.Input  value={model.name} placeholder="请输入不超过12位的字符" onChange={this.onChangeField('name').bind(this)}/>
              </FormField>
              <FormField label="计费点金额（元）:" error={errors.price}>
                  <FormField.Number  value={model.price} onChange={this.onChangeField('price').bind(this)}/>
              </FormField>
              <FormField label="UPAY支付界面状态:" hide>
                <FormField.Select  datas={isDefaultDialogList} value={model.isDefaultDialog} onChange={this.onChangeField('isDefaultDialog').bind(this)}/>
              </FormField>
              {/* <FormField label="CP定制支付界面代码:" error={errors.content}>
                  <FileUploadButton url="/api/file/gift/code" btnName="点击选择导入文件" value={model.customDialog} onChange={this.onChangeField('customDialog').bind(this)}/>
              </FormField>
              <FormField label="CP定制支付界面图片:" error={errors.content}>
                <ImageUploader containerClass="image-uploader multiple" onChange={this.onChangeField('customImageUrl').bind(this)} value={model.custom_image_url}/>
              </FormField> */}
              {/* <FormField>
                  <button className="btn btn-default form-control" onClick={onSubmit}>保存</button>
              </FormField> */}
              <FormField>
                  <div  className="search-btn-container form form-search">
                      <FormField>
                        <button className="btn btn-primary" onClick={onSubmit}>保存</button>
                      </FormField>
                      <FormField>
                        <button className="btn btn-primary " onClick={this.back.bind(this)}>返回</button>
                      </FormField>
                  </div>
              </FormField>
            </div>
        )
    }
}
