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
        let params = url(location.search), id, data, title;

        if(form.mobileCompany == '' && form.bizType == '' && form.codeType == ''){
          let p1 = ws.get({ url: '/api/spCode/mobileCompany'});
          let p2 = ws.get({ url: '/api/spCode/bizType'});
          let p3 = ws.get({ url: '/api/spCode/codeType'});
          let p4 = ws.get({ url: '/api/sp/spList'});

          Promise.all([p1, p2, p3, p4]).then(function(responses) {
            if (responses[0].code == 0) {
              form.mobileCompany = responses[0].data;
            };
            if (responses[1].code == 0) {
              form.bizType = responses[1].data;
            };
            if (responses[2].code == 0) {
              form.codeType = responses[2].data;
            };
            if (responses[3].code == 0) {
              form.spList = responses[3].data;
            };
            actions.codeListAction.changeForm(form);
          });
        };
        if(params.id){
          id = params.id;
          title = '代码编辑';
          ws.get({
              url: '/api/spCode/' + id,
          }).then(function (response) {
              actions.utilAction.hideLoading();
              if (response.code == 0) {
                  data = response.data;
                  form.model = response.data;

                  switch(form.model.carrier) {
                    case '1' :
                      form.model.Rate = response.data.mobileRate;
                      break;
                    case '2' :
                      form.model.Rate = response.data.unicomRate;
                      break;
                    case '3' :
                      form.model.Rate = response.data.telecomRate;
                      break;
                    default:
                  };

                  actions.codeListAction.changeForm(form);
              }
          })
        }else{
          title = '代码新增';
        }

        document.title = title;
        actions.utilAction.changeNavActive(navIds.SP_DATA_CODE_ADD_UPDATA);
    }

    onSubmit() {
        let {actions, form} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.codeListAction.changeForm(form);
            return;
        }
        if(url(location.search).id){
          //编辑
          ws.post({
              url: '/api/spCode/' + url(location.search).id,
              data: form.model
          }).then(function(response) {
              switch(response.code) {
                  case 0:
                      alert('修改成功');
                      location.replace('/SP/DmListPage');
                      break;
                  default:
                      alert(response.msg);
              }
          })
        } else {
          //新增
          ws.post({
              url: '/api/spCode',
              data: form.model
          }).then(function(response) {
              switch(response.code) {
                  case 0:
                      alert('新增成功');
                      location.replace('/SP/DmListPage');
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
    let form = state.reducers.spCodeList.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            codeListAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
