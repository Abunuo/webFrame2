import React from 'react';
import Form from '../components/Form.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import history from '../../history.jsx';
import {validateAll, isValid} from '../validate.js';
import url from '../url.js';

class AddPage extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        let {actions, form} = this.props;
        let parems = url(location.search), id, data, title;
        if(form.province == "" || form.shieldCity == '' || form.codeList == '' || form.spList ==''){
          let p1 = ws.get({ url: '/api/cmd/province'});
          let p2 = ws.get({ url: '/api/cmd/shieldCity'});
          let p3 = ws.get({ url: '/api/spCode/codeList'});
          let p4 = ws.get({ url: '/api/sp/spList'});
          Promise.all([p1, p2, p3, p4]).then(function(responses){
            if(responses[0].code == 0){
              form.province = responses[0].data;
            };
            if(responses[1].code == 0){
              form.shieldCity = responses[1].data;
            };
            if(responses[2].code == 0){
              form.codeList = responses[2].data;
            };
            if(responses[3].code == 0){
              form.spList = responses[3].data;
            };
            actions.cmdListAction.changeForm(form);
          });
        };
        if(parems.id){
          id = parems.id;
          title = '代码资费编辑';
          ws.get({
              url: '/api/cmd/' + id,
          }).then(function (response) {
              actions.utilAction.hideLoading();
              if (response.code == 0) {
                  data = response.data;
                  form.model = response.data;
                  form.model.province = form.model.provinceId;
                  actions.cmdListAction.changeForm(form);
              }
          })
        }else {
          title = '代码资费新增';
        }
        document.title = title;
        actions.utilAction.changeNavActive(navIds.SP_DATA_CODE_RATES_ADD_UPDATA);
    }

    onSubmit() {
        let {actions, form} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.cmdListAction.changeForm(form);
            return;
        }
        form.model.status = Number(form.model.status);
        if(url(location.search).id){
          //编辑
          ws.post({
              url: '/api/cmd/' + url(location.search).id,
              data: form.model
          }).then(function(response) {
              switch(response.code) {
                  case 0:
                      alert('修改成功');
                      location.replace("/SP/DzListPage");
                      break;
                  default:
                      alert(response.msg);
              }
          })
        }else{
          //新增
          ws.post({
              url: '/api/cmd',
              data: form.model
          }).then(function(response) {
              switch(response.code) {
                  case 0:
                      alert('新增成功');
                      location.replace("/SP/DzListPage");
                      break;
                  default:
                      alert(response.msg);
              }
          })
        }
        form.codeList = [],
        actions.cmdListAction.changeForm(form);
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.spCmdList.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cmdListAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
