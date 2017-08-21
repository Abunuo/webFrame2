import React from 'react';
import {Link} from 'react-router';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpReduceperAction from '../action.js';
import EnumAction from '../../_enums/action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = 'CP核减配置';
        let {actions, province} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_CHECK_REDUCE_LIST);
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
                actions.cpReduceperAction.changeCp(response.data);
            }
        });
        ws.get({
            url: '/api/sp'
        }).then(function (response) {
            if (response.code === 0) {
                actions.cpReduceperAction.changeSp(response.data);
            }
        });
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions, cp, sp, province, form, codeList} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh} cp={cp} province={province} sp={sp} form={form}/>
                <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to="/cpreduceper/add">新增</Link>
                </div>
                <ListGrid ref="grid" {...this.props}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.cpreduceper.toJS().list,
        province = state.reducers.enums.toJS().province,
        cp = state.reducers.cpreduceper.toJS().form.cp,
        sp = state.reducers.cpreduceper.toJS().form.sp,
        form = state.reducers.cpreduceper.toJS().form;
    return {...listState, form, cp, province, sp};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpReduceperAction: bindActionCreators(CpReduceperAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch),
            enumAction: bindActionCreators(EnumAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)