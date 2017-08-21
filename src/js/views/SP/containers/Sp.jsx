import React from 'react';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import { Link } from 'react-router';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.datas = new Array(10);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = 'SP管理';
        let {actions, form} = this.props;
        actions.utilAction.changeNavActive(navIds.SP_DATA);
        this.refresh();

        // let p1 = ws.get({ url: '/api/sp/spList'});
        // let p2 = ws.get({ url: '/api/spCode/codeList'});
        // let p3 = ws.get({ url: '/api/cmd/cmdList'});
        let p4 = ws.get({ url: '/api/cmd/province'});
        let p5 = ws.get({ url: '/api/spCode/mobileCompany'});
        let p6 = ws.get({ url: '/api/spCode/bizType'});
        Promise.all([p4, p5, p6]).then(function(responses) {
          // if (responses[0].code == 0) {
          //   form.spList = responses[0].data;
          // };
          // if (responses[1].code == 0) {
          //   form.codeList = responses[1].data;
          // };
          // if (responses[2].code == 0) {
          //   form.cmdList = responses[2].data;
          // };
          if (responses[0].code == 0) {
            form.province = responses[0].data;
          };
          if (responses[1].code == 0) {
            form.mobileCompany = responses[1].data;
          };
          if (responses[2].code == 0) {
            form.bizType = responses[2].data;
          };
          actions.spAction.changeForm(form);
        });
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {datas, pagination, queryOptions, actions, form} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh} form={form}/>
                <ListGrid ref="grid" actions={actions} dataSource={datas} pagination={pagination} queryOptions={queryOptions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.sp.toJS().list,
        form = state.reducers.sp.toJS().form;
    return {...listState, form};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            spAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)
