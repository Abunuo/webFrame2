import React from 'react';
import Form from '../components/ChargeCountForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {ws, navIds} from '../../../lib/main.js';
import history from '../../history.jsx';

class ChargeCountDetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '修改代码资费';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.CHARGE);
    }

    onSubmit() {
        let {form, actions} = this.props;
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/app',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('添加成功');
                history.push('/app');
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
            appAction: bindActionCreators(AppAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChargeCountDetailPage)
