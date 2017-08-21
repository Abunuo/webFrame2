import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CountAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {ws, navIds} from '../../../lib/main.js';
import {validateAll, isValid,validate} from '../validate.js';
import history from '../../history.jsx';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '新增计费点';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.COUNT_LIST);
    }

    onSubmit() {
        let {form, actions} = this.props;
        form.model.isDefaultDialog = 0;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.countAction.changeForm(form);
            return;
        }
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/count',
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('添加成功');
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
)(AddPage)
