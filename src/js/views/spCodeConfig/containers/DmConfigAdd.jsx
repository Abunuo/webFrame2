import React from 'react';
import Form from '../components/DCForm.jsx';
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

        let p1 = ws.get({ url: '/api/cmd/province'});
        Promise.all([p1]).then(function(responses){
          if(responses[0].code == 0){
            form.province = responses[0].data;
          }
          actions.codeConfigAction.changeForm(form);
        });
        if(parems.id){
          id = parems.id;
          title = '代码日月限编辑';
          ws.get({
              url: '/api/spCodeConfig/select/' + id,
          }).then(function (response) {
              actions.utilAction.hideLoading();
              if (response.code == 0) {
                  data = response.data;
                  form.model = response.data;
                  actions.codeConfigAction.changeForm(form);
              }
          })
        }else {
          title = '代码日月限新增';
        }
        document.title = title;
        actions.utilAction.changeNavActive(navIds.SP_DATA_CODE_CONFIG_ADD);
    }

    onSubmit() {
        let {actions, form} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.codeConfigAction.changeForm(form);
            return;
        }
        if(url(location.search).codeKey){
          //新增
          form.model.codeKey = url(location.search).codeKey;
          ws.post({
              url: '/api/spCodeConfig',
              data: form.model
          }).then(function(response) {
              switch(response.code) {
                  case 0:
                      alert('新增成功');
                      location.pathname = '/SP/DmConfig';
                      break;
                  default:
                      alert(response.msg);
              }
          })
        } else if(url(location.search).id){
          //编辑
          let query = "/SP/DmConfig?codeKey=" + form.model.codeKey;
          ws.post({
              url: '/api/spCodeConfig/' + url(location.search).id,
              data: form.model
          }).then(function(response) {
              switch(response.code) {
                  case 0:
                      alert('修改成功');
                      location.replace(query);
                      break;
                  default:
                      alert(response.msg);
              }
          })
        }
    }

    render() {
        let {form, actions} = this.props;
        return (
            <Form form={form} actions={actions} onSubmit={this.onSubmit}/>
        )
    }
}

function mapStateToProps(state) {
    let form = state.reducers.spCodeConfig.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            codeConfigAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
