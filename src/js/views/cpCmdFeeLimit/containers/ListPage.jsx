import React from 'react';
import {Link} from 'react-router';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpCmdFeeLimitAction from '../action.js';
import EnumAction from '../../_enums/action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        document.title = 'CP放量配置';
        let {actions, province} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_CMD_FEE_LIMIT_LIST);
        if (province == null || province.length === 0) {
            ws.get({
                url: '/api/enums/province'
            }).then(function (response) {
                if (response.code === 0) {
                    actions.enumAction.changeProvince(response.data);
                }
            })
        }
        ws.get({
            url: '/api/cpCmdFeeLimit/cp'
        }).then(function (response) {
            if (response.code === 0) {
                actions.cpCmdFeeLimitAction.changeCp(response.data);
            }
        });
        ws.get({
            url: '/api/cpCmdFeeLimit/codeCmds'
        }).then(function (response) {
            if (response.code === 0) {
                actions.cpCmdFeeLimitAction.changeCodeCmds(response.data);
            }
        });
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions, province, codecmds, cp} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh} codecmds={codecmds}
                            province={province} cp={cp}/>
                <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to="/cpcmdfeelimit/add">新增</Link>
                </div>
                <ListGrid ref="grid" {...this.props} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.cpcmdfeelimit.toJS().list,
        province = state.reducers.enums.toJS().province,
        codecmds = state.reducers.cpcmdfeelimit.toJS().form.codecmds,
        cp = state.reducers.cpcmdfeelimit.toJS().form.cp,
        form = state.reducers.cpcmdfeelimit.toJS().form;
    return {...listState, form, province, codecmds, cp};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpCmdFeeLimitAction: bindActionCreators(CpCmdFeeLimitAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch),
            enumAction: bindActionCreators(EnumAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)