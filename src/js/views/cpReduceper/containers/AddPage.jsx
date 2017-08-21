import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpReduceperAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import EnumAction from '../../_enums/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';
import {validateAll, isValid} from '../validate.js';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'CP核减配置新增';
        let {actions, province} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_CHECK_REDUCE_LIST);
        // if (province == null || province.length === 0) {
        //     ws.get({
        //         url: '/api/enums/province'
        //     }).then(function (response) {
        //         if (response.code === 0) {
        //             actions.enumAction.changeProvince(response.data);
        //         }
        //     })
        // }
        ws.get({
            url: '/api/cpCmdFeeLimit/cp'
        }).then(function (response) {
            if (response.code === 0) {
                actions.cpReduceperAction.changeCp(response.data);
            }
        });
        // ws.get({
        //     url: '/api/spCode/codeList'
        // }).then(function (response) {
        //     if (response.code === 0) {
        //         actions.cpReduceperAction.changeCode(response.data);
        //     }
        // });
        ws.get({
            url: '/api/cpReduceper/switchStatus'
        }).then(function (response) {
            if (response.code === 0) {
                actions.cpReduceperAction.changeStatus(response.data);
            }
        });
    }

    onSubmit() {
        let {form, actions} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.cpReduceperAction.changeForm(form);
            return;
        }
        actions.utilAction.showLoading();
        let provinceId = form.model.province,
            cpKey = form.model.cpKey,
            appKey = form.model.appKey,
            percent = Number(form.model.percent),
            status = Number(form.model.status),
            codeKey = form.model.codeKey;
        let datas ={
            "cpKey": "aHYuBOIETT",
            "codeKey": "bNOxdd",
            "appKey": "bNOxdd",
            "provinceId": "1" ,
            "reducePercent": 70,
            "status": 1
        };
        datas.cpKey=cpKey;
        datas.codeKey = codeKey;
        datas.appKey = appKey;
        datas.provinceId = provinceId;
        datas.reducePercent = percent;
        datas.status = status;
        ws.post({
            url: '/api/cpReduceper',
            data: datas
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                history.push('/cpReduceper');
            } else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {form, actions, cp, status} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit} cp={cp} status={status}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.cpreduceper.toJS().form,
        status = state.reducers.cpreduceper.toJS().form.status,
        cp = state.reducers.cpreduceper.toJS().form.cp;
    return {form, cp, status};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpReduceperAction: bindActionCreators(CpReduceperAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch),
            enumAction: bindActionCreators(EnumAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
