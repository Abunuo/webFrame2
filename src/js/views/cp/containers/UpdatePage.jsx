import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';

class UpdatePage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        document.title = '修改CP信息';
        let {form, actions, params} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_LIST);
        actions.utilAction.showLoading();
        let id = 0;

        //获取  url  中的需要修改的cp的id
        let p1 = ws.get({ url: '/api/cp/info/' + params.id });

        //拉取 cp角色类型的数据
        let p2 = ws.get({ url: '/api/cpRole'});

        //拉取 所属公司数据
        let p3 = ws.get({  url: '/api/subCompany' });

        //拉取cp类型的数据
        let p4 = ws.get({ url: '/api/cpType'});

        //拉取上级cp的数据
        let p5 = ws.get({ url: '/api/cpType/'+ id });

        Promise.all([p1, p2, p3, p4, p5]).then(function(responses) {
          if (responses[0].code == 0) {
            actions.utilAction.hideLoading();
            form.model = responses[0].data;
            // 把多层数据格式该成单层数据格式
            /*
             * 把typeId的值赋给type
             * 把 cp.roleId的值赋值给roleId
             * 根据pater是否为null进行数据的改变
            */
            form.model.type = form.model.type.typeId;
            form.model.roleId = form.model.cpRole.roleId;
            if(form.model.pater != null){
              form.model.cpKey = form.model.pater.key;
            }else{
              form.model.cpKey = " ";
            }
          }
          if (responses[1].code == 0) {
            form.cpRoleList = responses[1].data;
          }
          if (responses[2].code == 0 ) {
            form.upayCompanyList = responses[2].data;
            _.map(form.upayCompanyList,function(item){
              if(form.model.upayCompany == item.name){
                form.model.upayCompany = item.id;
              }
            })
          }
          if (responses[3].code == 0) {
            form.cpTypeList = responses[3].data;
          }
          if (responses[4].code == 0) {
            form.cpPaterList = responses[4].data;
          }
          actions.cpAction.changeForm(form);
        });
    }

    onSubmit() {
        let {form, actions, params} = this.props;
        form.model.role = form.model.roleId;
        actions.utilAction.showLoading();
        ws.post({
            url: '/api/cp/' + params.id,
            data: form.model
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                alert('修改成功');
                history.push('/cp/list');
            }else{
              alert(response.msg);
            }
        })
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} update={true} actions={actions} onSubmit={this.onSubmit}/>
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
)(UpdatePage)
