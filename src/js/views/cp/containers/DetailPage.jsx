import React from 'react';
import {Link} from 'react-router';
import ListGrid from '../components/ListGridDetail.jsx';
import SearchForm from '../components/SearchFormDetail.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CpAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class DetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = 'CP详情页列表';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.CP_LIST);
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions} = this.props;
        return (
            <div className="fbt-table">
              <SearchForm model={queryOptions} actions={actions} onSearch={this.refresh}/>
                {/* <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to="/cp">返回</Link>
                </div> */}
                <div className="grid-operation-zone">
                    <Link className="btn btn-primary" to="/cp/add">新增</Link>
                </div>
                <ListGrid ref="grid" {...this.props} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.cp.toJS().list;
    return {
        ...listState
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            cpAction: bindActionCreators(CpAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
