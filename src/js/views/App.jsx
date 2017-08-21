import React from "react";
import Nav from './Nav.jsx';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UtilAction from './_util/action.js';
import {getNavData} from '../lib/main.js';
import Header from './Header.jsx';
import LoadingToast from './LoadingToast.jsx';

class App extends React.Component{

    constructor(props) {
        super(props);
        this.changeNavActiveId = this.changeNavActiveId.bind(this);
        this.toggleNavCollapse = this.toggleNavCollapse.bind(this);
    }

    handleHomeClick() {
        window.location.href = "/home";
    }


    changeNavActiveId(navId) {
        let {actions} = this.props;
        actions.utilAction.changeNavActive(navId);
    }

    toggleNavCollapse() {
        let {actions, nav} = this.props;
        actions.utilAction.collapseNavBar(!nav.collapse);
    }


    render() {
        let {nav, actions, loading} = this.props;
        let contentClass = 'content-container' + (nav.collapse ? ' full-width' : '');
        let realNav = getNavData(loginType, roleId, roleType);
        return (
            <div id="container">
                <Header navCollapse={nav.collapse} toggleNavCollapse={this.toggleNavCollapse}/>
                <div className="body">
                    <div className="nav-container">
                        <Nav datas={realNav} changeActive={this.changeNavActiveId} activeId={nav.activeId}
                             collapse={nav.collapse} toggleCollapse={this.toggleNavCollapse}/>
                    </div>
                    <div className={contentClass}>
                        <div className="content-body">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <LoadingToast isOpen={loading > 0}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let utilState = state.reducers.util.toJS();
    return {...utilState};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            utilAction: bindActionCreators(UtilAction, dispatch)
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
