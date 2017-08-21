import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import App from "./App.jsx";
import NotFound from './NotFound.jsx';
import userRoute from "./user/route.js";
import MyTest from './_mytest/route.js';
import cpCmdFeeLimit from './cpCmdFeeLimit/route.js';
import cpReduceper from './cpReduceper/route.js';
import blacklist from './blacklist/route.js';
import SPRoute from './sp/route.js';
import SPUserRoute from './spUser/route.js';
import cpRoute from './cp/route.js';
import appRoute from './app/route.js';
import chargeRoute from './charge/route.js';
import countRoute from './count/route.js';


export default class extends React.Component {

    render() {
        let {history} = this.props;
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    {roleId === '2' ? userRoute : undefined}
                    {MyTest}
                    {cpCmdFeeLimit}
                    {cpReduceper}
                    {blacklist}
                    {SPRoute}
                    {SPUserRoute}
                    {cpRoute}
                    {appRoute}
                    {chargeRoute}
                    {countRoute}
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
}
