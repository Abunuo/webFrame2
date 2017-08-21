import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HelpAction from '../action.js';
import * as UtilAction from '../../_util/action.js';
import {navIds, ws} from '../../../lib/main.js';

class HelpPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.title = '帮助页面';
        UtilAction.changeNavActive(navIds.HELP);
    }

    render() {
        return (
          <div className="conent-body">
            <img src='/images/help.png' alt="帮助流程" />
          </div>

        )
    }
}

export default HelpPage;
