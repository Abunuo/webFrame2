import React from 'react';
import FormField from '../../FormField.jsx';
import {Link} from "react-router";
export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeImsi = this.onChangeImsi.bind(this);
    }

    componentWillUnmount() {
        let {actions} = this.props;
        actions.blackListAction.resetForm();
    }

    onChangePhone(event) {
        let {form, actions} = this.props;
        form.model.phones = event.target.value;
        actions.blackListAction.changeForm(form);
    }

    onChangeImsi(event) {
        let {form, actions} = this.props;
        form.model.imsi = event.target.value;
        actions.blackListAction.changeForm(form);
    }

    render() {
        let {form, onSubmit} = this.props,
            {model} = form;
        return (
            <div className="form phone-form">
                <div className="form-group">
                    <textarea className="form-input form-control phoneinput" onChange={this.onChangePhone} value={model.phones}
                              placeholder="请输入手机号，多个请用Enter(回车)键隔开"/>
                    <textarea className="form-input form-control phoneinput" onChange={this.onChangeImsi} value={model.imsi}
                              placeholder="请输入imsi，多个请用Enter(回车)键隔开"/>
                </div>
                <div className="form-group">
                    <div className="clearfix">
                    <div className="input-container col-sm-1">
                    </div>
                      <div className="input-container col-sm-1">
                        <a className="btn btn-primary" onClick={onSubmit}>保存</a>
                      </div>
                      <div className="input-container col-sm-2">
                        <a className="btn btn-primary" href="/blacklist">返回</a>
                      </div>
                    </div>
                    <div className="hr-line-dashed"></div>
                </div>
            </div>
        )
    }
}
