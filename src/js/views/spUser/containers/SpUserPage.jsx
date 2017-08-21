import React from 'react';
import ListGrid from '../components/SpUserListGrid.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UserAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';
import {Link} from 'react-router';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.datas = new Array(2);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = 'SP单用户配置';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.SP_USERDATA);
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {datas, pagination, queryOptions, actions} = this.props;

        return (
            <div className="fbt-table">
                <ListGrid ref="grid" actions={actions} dataSource={datas} pagination={pagination} queryOptions={queryOptions} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.spUser.toJS().list;
    return {...listState};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            spUserAction: bindActionCreators(UserAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)
