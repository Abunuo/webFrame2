import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BlackListAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';

class AddPage extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkImsi = this.checkImsi.bind(this);
        this.checkPhone = this.checkPhone.bind(this);
    }

    componentDidMount() {
        document.title = '号码屏蔽新增';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.BLACKLIST);
    }

    onSubmit() {
        let {form, actions} = this.props;
        let datas = {}, phones, imsis;
        phones = form.model.phones;
        imsis = form.model.imsi;
        if ((phones == null || phones.trim() == "") && (imsis == null || imsis.trim() == "")) {
            alert("请至少输入一种正确的屏蔽号码!");
            return false;
        }
        let lphone = {msg: "", list: null},
            limsi = {msg: "", list: null},
            msg = "";
        if (phones != null && phones.trim() != "") {
            lphone = this.checkPhone(phones);
        }
        if (imsis != null && imsis.trim() != "") {
            limsi = this.checkImsi(imsis);
        }
        msg = lphone.msg + limsi.msg;
        if (msg != "") {
            alert("亲，出现错误啦！\r\n" + msg);
            return false;
        } else {
            datas.phone = _.uniq(lphone.list);
            datas.imsi = _.uniq(limsi.list);
        }
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/phoneImsi/blacklist',
            data: datas
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                alert('添加成功！');
                history.push('/blacklist');
            } else {
                alert("添加失败！");
            }
        });
    }

    checkPhone(datas) {
        let result = {msg: "", list: null},
            msg = "",
            list = null,
            txt = datas;
        var listI = txt.trim().split("\r\n");
        var listF = txt.trim().split("\n");
        if (listI.length > listF.length) {
            list = listI;
        } else {
            list = listF;
        }
        for (var i = 0; i < list.length; i++) {
            var len = i + 1;
            var phone = list[i].trim().replace(/\s/g, "");
            if (!(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone))) {
                msg += '第' + len + '个请输入有效的手机号!\n';
            }
        }
        result.msg = msg;
        result.list = list;
        return result;
    }

    checkImsi(datas) {
        let result = {msg: "", list: null},
            msg = "",
            list = null,
            txt = datas;
        var listI = txt.trim().split("\r\n");
        var listF = txt.trim().split("\n");
        if (listI.length > listF.length) {
            list = listI;
        } else {
            list = listF;
        }
        for (var i = 0; i < list.length; i++) {
            var len = i + 1;
            var phone = list[i].trim().replace(/\s/g, "");
            if (!(/^\d{15}$/.test(phone))) {
                msg += '第' + len + '个请输入有效的IMSI!\n';
            }
        }
        result.msg = msg;
        result.list = list;
        return result;
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit}/>
        );
    }

}
function mapStateToProps(state) {
    let form = state.reducers.blacklist.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            blackListAction: bindActionCreators(BlackListAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
