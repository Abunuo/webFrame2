import React from 'react';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import { Link } from 'react-router';
import url from '../url.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.datas = new Array(10);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = '代码信息';
        let {actions, queryOptions, pagination, form} = this.props;
        actions.utilAction.changeNavActive(navIds.SP_DATA_CODE_LIST);

        let p1 = ws.get({ url: '/api/spCode/mobileCompany'});
        let p2 = ws.get({ url: '/api/spCode/bizType'});
        let p3 = ws.get({ url: '/api/spCode/codeType'});
        let p4 = ws.get({ url: '/api/sp/spList'});
        let p5 = ws.get({ url: '/api/spCode/codeList'});

        Promise.all([p1, p2, p3, p4, p5]).then(function(responses) {
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
          if (responses[4].code == 0) {
            form.codeList = responses[4].data;
          };
          actions.codeListAction.changeForm(form);
        });

        if(url(location.search) != null){
          let data = {
            ...queryOptions,
            page: pagination.pageNo
          };
          actions.utilAction.showLoading();
          if(url(location.search).spKey && url(location.search).codeKey) {
            data.codeKey = url(location.search).codeKey;
            data.spKey = url(location.search).spKey;
          } else if(url(location.search).spKey){
            data.spKey = url(location.search).spKey;
          }
          ws.get({
            url: '/api/spCode',
            data
          }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
              actions.codeListAction.changeListData(response.data);
              pagination.total = response.pagination.total;
              actions.codeListAction.changeListPagination(pagination);
            }
          })
        } else {
          this.refresh();
        }
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {datas, pagination, queryOptions, actions, form} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh} form={form}/>
                <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to='/SP/DmAddPage'>新增</Link>
                </div>
                <ListGrid ref="grid" actions={actions} dataSource={datas} pagination={pagination} queryOptions={queryOptions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.spCodeList.toJS().list,
        form = state.reducers.spCodeList.toJS().form;
    return {...listState, form};
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
)(ListPage)
