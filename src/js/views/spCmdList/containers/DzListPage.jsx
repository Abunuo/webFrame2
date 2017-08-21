import React from 'react';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import { Link } from 'react-router';
import FormField from '../../FormField.jsx';
import url from '../url.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.openAll = this.openAll.bind(this);
        this.closeAll = this.closeAll.bind(this);
    }

    componentDidMount() {
        document.title = '代码资费信息';
        let {actions, queryOptions, pagination, form} = this.props;
        actions.utilAction.changeNavActive(navIds.SP_DATA_RATES_LIST);

        let p1 = ws.get({ url: '/api/cmd/province'});
        let p2 = ws.get({ url: '/api/cmd/shieldCity'});
        let p3 = ws.get({ url: '/api/spCode/codeList'});
        let p4 = ws.get({ url: '/api/sp/spList'});
        let p5 = ws.get({ url: '/api/cmd/cmdList'});
        Promise.all([p1, p2, p3, p4, p5]).then(function(responses){
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
          if(responses[4].code == 0){
            form.cmdList = responses[4].data;
          };
          actions.cmdListAction.changeForm(form);
        });

        if(url(location.search) != null) {
          actions.utilAction.showLoading();
          let data = {
            ...queryOptions,
            page: pagination.pageNo
          }
          if(url(location.search).spKey && url(location.search).codeKey && url(location.search).cmdKey) {
            data.spKey = url(location.search).spKey;
            data.codeKey = url(location.search).codeKey;
            data.cmdKey = url(location.search).cmdKey;
          } else if(url(location.search).spKey && url(location.search).codeKey){
            data.spKey = url(location.search).spKey;
            data.codeKey = url(location.search).codeKey;
          }
          ws.get({
            url: '/api/cmd',
            data
          }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
              actions.cmdListAction.changeListData(response.data);
              pagination.total = response.pagination.total;
              actions.cmdListAction.changeListPagination(pagination);
            }
          })
        } else {
          this.refresh();
        }
    }

    refresh() {
        this.refs.grid.refresh();
    }

    openAll() {
      let _this = this;
      if(confirm("确认全开？")){
        ws.post({
            url: '/api/cmd/changeStatus',
            data: {
              status: 1,
              codeKey: url(location.search).codeKey ? url(location.search).codeKey : null
            }
        }).then(function (response) {
            if (response.code == 0) {
                alert("修改成功！");
                _this.refresh();
            }
        })
      }
    }

    closeAll() {
      let _this = this;
      if(confirm("确认全关？")){
        ws.post({
            url: '/api/cmd/changeStatus',
            data: {
              status: 0,
              codeKey: url(location.search).codeKey ? url(location.search).codeKey : null
            }
        }).then(function (response) {
            if (response.code == 0) {
                alert("修改成功！");
                _this.refresh();
            }
        })
      }
    }

    render() {
        let {datas, pagination, queryOptions, actions, form} = this.props;
        var btnStyle = {
          marginRight: 10
        }, btnStyle1 = {
          marginRight: 60
        };
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh} form={form}/>
                <div className="grid-operation-zone ">
                      <Link className="btn btn-primary" to='/SP/DzAddPage'>新增</Link>
                      <button className="btn btn-primary " style={btnStyle1} onClick={this.closeAll}>全关</button>
                      <button className="btn btn-primary " style={btnStyle} onClick={this.openAll}>全开</button>
                </div>
                <ListGrid ref="grid" actions={actions} dataSource={datas} pagination={pagination} queryOptions={queryOptions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.spCmdList.toJS().list,
        form = state.reducers.spCmdList.toJS().form;
    return {
          ...listState,
          form
      };
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
)(ListPage)
