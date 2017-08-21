import React from 'react';
import Form from '../components/SpForm.jsx';
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

        if(form.upayCompanyList == '') {
          let p1 = ws.get({ url: '/api/sp/upayCompany'});
          Promise.all([p1]).then(function(responses) {
            if (responses[0].code == 0) {
              form.upayCompanyList = responses[0].data;
            }
            actions.spListAction.changeForm(form);
          });
        };
        if(params.id){
          id = params.id;
          title = 'SP编辑';
          ws.get({ url: '/api/sp/' + id })
            .then(function(response) {
              if (response.code == 0) {
                form.model = response.data;
                actions.spListAction.changeForm(form);
              }
            })
        }else{
          title = 'SP新增';
        }

        document.title = title;
        actions.utilAction.changeNavActive(navIds.SP_DATA_ADD_UPDATA);
    }

    onSubmit() {
        let {actions, form} = this.props;
        let errors = validateAll(form.model);
        if(!isValid(errors)) {
            form.errors = errors;
            actions.spListAction.changeForm(form);
            return;
        }
        // actions.utilAction.showLoading();
        if(url(location.search).id){
          //编辑
          ws.post({
            url: '/api/sp/' + url(location.search).id,
            data: form.model
          }).then(function(response) {
            // actions.utilAction.hideLoading();
            switch(response.code) {
              case 0:
              alert('修改成功');
              location.replace('/SP/SpListPage');
              break;
              default:
              alert(response.msg);
            }
          })
        } else {
          //新加
          ws.post({
            url: '/api/sp',
            data: form.model
          }).then(function(response) {
            // actions.utilAction.hideLoading();
            switch(response.code) {
              case 0:
                alert('新增成功');
                location.replace('/SP/SpListPage');
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
    let form = state.reducers.spList.toJS().form;
    return {
        form: form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            spListAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPage)
