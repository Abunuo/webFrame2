import React from 'react';
import moment from 'moment';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpCmdFeeLimitAction from '../action.js';
import EnumAction from '../../_enums/action.js';
import * as UtilAction from '../../_util/action.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';
import {validateAll, isValid} from '../validate.js';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = 'CP放量配置新增';
        let {actions, province} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_CMD_FEE_LIMIT_LIST);
        ws.get({
            url: '/api/cpCmdFeeLimit/cp'
        }).then(function (response) {
            if (response.code === 0) {
                actions.cpCmdFeeLimitAction.changeCp(response.data);
            }
        });
    }

    onSubmit() {
        let {form, actions} = this.props;
        let errors = validateAll(form.model);
        if (!isValid(errors)) {
            form.errors = errors;
            actions.cpCmdFeeLimitAction.changeForm(form);
            return;
        }
        actions.utilAction.showLoading();
        let full, day, num,
            yearMonth = form.model.yearMonth,
            provinceId = form.model.province,
            cpKey = form.model.cpKey,
            cmdKey = form.model.cmdKey,
            limit = form.model.limit;
        full = yearMonth.split("-");
        day = full[2];
        yearMonth = full[0] + "-" + full[1];
        let daycount = new Date(full[0], full[1], 0);
        num = daycount.getDate();
        let data = {
            "provinceId": "1",
            "cpKey": "znVWRYHSrf",
            "cmdKey": "3rfefde",
            "yearMonth": "2017-06",
            "dailyLimits": [
                {"day": "01", "limit": "-1"},
                {"day": "02", "limit": "-1"},
                {"day": "03", "limit": "-1"},
                {"day": "04", "limit": "-1"},
                {"day": "05", "limit": "-1"},
                {"day": "06", "limit": "-1"},
                {"day": "07", "limit": "30"},
                {"day": "08", "limit": "30"},
                {"day": "09", "limit": "20"},
                {"day": "10", "limit": "20"},
                {"day": "11", "limit": "20"},
                {"day": "12", "limit": "20"},
                {"day": "13", "limit": "20"},
                {"day": "14", "limit": "20"},
                {"day": "15", "limit": "20"},
                {"day": "16", "limit": "20"},
                {"day": "17", "limit": "20"},
                {"day": "18", "limit": "20"},
                {"day": "19", "limit": "20"},
                {"day": "20", "limit": "20"},
                {"day": "21", "limit": "20"},
                {"day": "22", "limit": "20"},
                {"day": "23", "limit": "20"},
                {"day": "24", "limit": "20"},
                {"day": "25", "limit": "20"},
                {"day": "26", "limit": "20"},
                {"day": "27", "limit": "20"},
                {"day": "28", "limit": "20"},
                {"day": "29", "limit": "20"},
                {"day": "30", "limit": "20"},
                {"day": "31", "limit": "20"}
            ]
        };
        data.provinceId = provinceId;
        data.cpKey = cpKey;
        data.cmdKey = cmdKey;
        data.yearMonth = yearMonth;
        for (var i = 0; i < data.dailyLimits.length; i++) {
            if (day - 1 <= i && i < num) {
                data.dailyLimits[i].limit = "" + limit;
            } else if(i < num-1){
                data.dailyLimits[i].limit = '-1';
            }else {
                data.dailyLimits[i].limit = "";
            }
        }
        ws.post({
            url: '/api/cpCmdFeeLimit',
            data: data
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                history.push('/cpcmdfeelimit');
            }else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {form, actions, cp} = this.props;
        return (
            <Form form={form} actions={actions} cp={cp} onSubmit={this.onSubmit}/>
        );
    }
}
function mapStateToProps(state) {
    let cp = state.reducers.cpcmdfeelimit.toJS().form.cp,
        form = state.reducers.cpcmdfeelimit.toJS().form;
    return {form, cp};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpCmdFeeLimitAction: bindActionCreators(CpCmdFeeLimitAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch),
            enumAction: bindActionCreators(EnumAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
