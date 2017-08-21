import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CpCmdFeeLimitAddPage from './containers/AddPage.jsx';
import CpCmdFeeLimit from './containers/ListPage.jsx';

export default (
    <Route path='cpcmdfeelimit'>
        <IndexRoute component={CpCmdFeeLimit}/>
        <Route path="add" component={CpCmdFeeLimitAddPage}/>
    </Route>
)