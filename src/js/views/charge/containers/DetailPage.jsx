import React from 'react';
import {Link} from 'react-router';
import ListGridDetail from '../components/ListGridDetail.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ChargeDetailAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class DetailPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        document.title = '代码资费配置详情页';
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.CHARGE);
        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions} = this.props;
        return (
            <div className="fbt-table">
              <div className="grid-operation-zone">
                  <Link className="btn btn-primary" to="/charge">返回</Link>
              </div>
                <ListGridDetail ref="grid" {...this.props} refresh={this.refresh}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let listState = state.reducers.charge.toJS().list;
    return {...listState};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            chargeDetailAction: bindActionCreators(ChargeDetailAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPage)
