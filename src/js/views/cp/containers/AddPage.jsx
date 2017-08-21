import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpAction from '../action.js';
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
        document.title = '新增CP';
        let {actions, form} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_COUNTLIST);
        actions.utilAction.showLoading();
        let id = 0;
        //拉取 cp角色类型的数据
        let p1 = ws.get({ url: '/api/cpRole'});

        //拉取 所属公司数据
        let p2 = ws.get({ url: '/api/subCompany' });

        //拉取 cp类型的数据
        let p3 = ws.get({ url: '/api/cpType' });

        //拉取上级cp的数据
        let p4 = ws.get({ url: '/api/cpType/'+ id });

        Promise.all([p1, p2,p3,p4]).then(function(responses) {
          if (responses[0].code == 0) {
            form.cpRoleList = responses[0].data;
          }if (responses[1].code == 0 ) {
            form.upayCompanyList = responses[1].data;
            _.map(form.upayCompanyList,function(item){
              if(form.model.upayCompany == item.name){
                form.model.upayCompany = item.id;
              }
            })
          }if (responses[2].code == 0){
            form.cpTypeList = responses[2].data;
          }if (responses[3].code == 0) {
            form.cpPaterList = responses[3].data;
          }

            actions.cpAction.changeForm(form);
            actions.utilAction.hideLoading();
        });
    }

    onSubmit() {
        let {form, actions} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.cpAction.changeForm(form);
            return;
        }

        ws.post({
            url: '/api/cp',
            data: form.model
        }).then(function(response) {
            // actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('添加成功');
                history.push('/cp/list');
            }else{
              alert(response.msg)
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
    let form = state.reducers.cp.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpAction: bindActionCreators(CpAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
