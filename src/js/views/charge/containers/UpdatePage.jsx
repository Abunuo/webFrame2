import React from 'react';
import Form from '../components/FormUpdate.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ChargeAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';
import {validateAll, isValid,validate} from '../validate.js';

class UpdatePage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '修改CP代码资费配置';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.CHARGE);
        actions.utilAction.showLoading();

        //获取要修改的数据信息
        let p1 =  ws.get({url: '/api/appCmdRelation/' + params.id});

        // 获取省份数据
        let p2 = ws.get({url: '/api/province'});

        //获取城市数据
        let p3 = ws.get({url: '/api/shieldCity'});

        Promise.all([p1,p2,p3]).then(function(responses){
          if (responses[0].code == 0) {
            console.log(responses[0].data);
            form.model = responses[0].data;
            form.model.cpNameShow = form.model.cpName;
          }if(responses[1].code == 0 ){
            form.provinceList = responses[1].data;
          }if (responses[2].code == 0) {
            form.shieldCityList = responses[2].data;
          }
          actions.chargeAction.changeForm(form);
          actions.utilAction.hideLoading();
        })
    }

    onSubmit() {
        let {form, actions, params} = this.props;
        actions.utilAction.showLoading();
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.chargeAction.changeForm(form);
            actions.utilAction.hideLoading();
            return;
        }
        
        ws.post({
            url: '/api//appCmdRelation/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('修改成功');
                history.push('/charge');
            }
        })
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.charge.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            chargeAction: bindActionCreators(ChargeAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePage)
