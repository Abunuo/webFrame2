import React from 'react';
import ListGrid from '../components/DCListGrid.jsx';
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
        document.title = '代码日月限信息';
        let { form, actions } = this.props;
        actions.utilAction.changeNavActive(navIds.SP_DATA_CODE_CONFIG);
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {datas, pagination, queryOptions, actions} = this.props;
        let codeKey = url(location.search).codeKey;
        return (
            <div className="fbt-table">
                <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to={'/SP/DmConfigAdd?codeKey=' + codeKey}>新增</Link>
                </div>
                <ListGrid ref="grid" id={this.id} actions={actions} dataSource={datas} pagination={pagination} queryOptions={queryOptions}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.spCodeConfig.toJS().list;
    return {...listState};
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
)(ListPage)
