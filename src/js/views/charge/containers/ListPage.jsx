import React from 'react';
import {Link} from 'react-router';
import ListGrid from '../components/ListGrid.jsx';
import SearchForm from '../components/SearchForm.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ChargeAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class ListPage extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.cpNameList=[];
        this.appNameList=[];
    }

    componentDidMount() {
        document.title = 'CP代码资费列表';
        let _this = this;
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navIds.CHARGE);
        //获取cpKey列表和appKey列表

        let p1 = ws.get({url: '/api/cpKeyAndNameList'});
        let p2 = ws.get({url:'/api/appKeyAndNameList'});

        Promise.all([p1,p2]).then(function(responses){
          if (responses[0].code == 0) {
            _this.cpNameList = responses[0].data;
          }
          if (responses[1].code == 0) {
            _this.appNameList = responses[1].data;
          }
          if (responses[0].code==0&&responses[1].code==0) {
            actions.utilAction.hideLoading();
          }
        })

        this.refresh();
    }

    refresh() {
        this.refs.grid.refresh();
    }

    render() {
        let {queryOptions, actions} = this.props;
        return (
            <div className="fbt-table">
                <SearchForm model={queryOptions} cpNameList={this.cpNameList} appNameList={this.appNameList} actions={actions} onSearch={this.refresh}/>
                <div className="grid-operation-zone">
                  <Link className="btn btn-primary" to="/charge/add">新增</Link>
                </div>
                <ListGrid ref="grid" {...this.props} refresh={this.refresh}/>
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
            chargeAction: bindActionCreators(ChargeAction, dispatch),
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListPage)
