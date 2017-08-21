import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CountAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';

class UpdatePage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '修改计费点配置';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.COUNT_LIST);
        actions.utilAction.showLoading();

        //网络请求数据
        ws.get({
            url: '/api/count/' + params.id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                form.model = response.data;
                actions.countAction.changeForm(form);
            }
        });
        actions.utilAction.hideLoading();
        actions.countAction.changeForm(form);
    }

    onSubmit() {

        //  提交数据
        let {form, actions, params} = this.props;
        actions.utilAction.showLoading();

        form.model.ctime=null;
        form.model.utime=null;
        ws.post({
            url: '/api/count/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('修改成功');
                history.push('/count');
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
    let form = state.reducers.count.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            countAction: bindActionCreators(CountAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdatePage)
