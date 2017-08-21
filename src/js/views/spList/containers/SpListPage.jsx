import React from 'react';
import ListGrid from '../components/SpListGrid.jsx';
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

        document.title = 'SP信息';
        let {actions, queryOptions, pagination, form} = this.props;
        actions.utilAction.changeNavActive(navIds.SP_DATA_LIST);

        let p1 = ws.get({ url: '/api/sp/upayCompany'});
        let p2 = ws.get({ url: '/api/sp/spList'});
        Promise.all([p1, p2]).then(function(responses) {
          if (responses[0].code == 0) {
            form.upayCompanyList = responses[0].data;
          };
          if (responses[1].code == 0) {
            form.spList = responses[1].data;
          };
          actions.spListAction.changeForm(form);
        });
        if(url(location.search).spKey) {
          actions.utilAction.showLoading();
          ws.get({
            url: '/api/sp',
            data: {
                ...queryOptions,
                page: pagination.pageNo,
                spKey: url(location.search).spKey
            }
          }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
              actions.spListAction.changeListData(response.data);
              pagination.total = response.pagination.total;
              actions.spListAction.changeListPagination(pagination);
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
                    <Link className="btn btn-primary" to='/SP/SpAddPage'>新增</Link>
                </div>
                <ListGrid ref="grid" actions={actions} dataSource={datas} pagination={pagination} queryOptions={queryOptions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.spList.toJS().list,
        form = state.reducers.spList.toJS().form;
    return {...listState, form};
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
)(ListPage)
