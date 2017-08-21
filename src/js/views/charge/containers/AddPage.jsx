import React from 'react';
import Form from '../components/FormAdd.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ChargeAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {validateAll, isValid,validate} from '../validate.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'CP代码资费新增页面';
        let {actions,form} = this.props;
        actions.utilAction.changeNavActive(navIds.CHARGE);
        actions.utilAction.showLoading();

        // 获取省份数据
        let p1 = ws.get({url: '/api/province'});

        //获取城市数据
        let p2 = ws.get({url: '/api/shieldCity'});

        //获取cp名称的列表的数据
        let p3 = ws.get({url:'/api/cpKeyAndNameList'});

        //获取代码资费列表的数据
        let p4 = ws.get({url:'/api/cmdKeyAndNameList'});

        Promise.all([p1,p2,p3,p4]).then(function(responses){
          if(responses[0].code == 0 ){
            form.provinceList = responses[0].data;
          }if (responses[1].code == 0) {
            form.shieldCityList = responses[1].data;
          }if (responses[2].code == 0) {
            form.cpNameList = responses[2].data;
          }if (responses[3].code == 0) {
            form.cmdNameList = responses[3].data;
          }
          if (responses[0].code==0&&responses[1].code==0&&responses[2].code==0) {
            actions.chargeAction.changeForm(form);
            actions.utilAction.hideLoading();
          }
        })
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.chargeAction.changeForm(form);
            actions.utilAction.hideLoading();
            return;
        }

        ws.post({
            url: '/api/appCmdRelation',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('添加成功');
                history.push('/charge');
            }else{
              alert(response.msg);
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
)(AddPage)
