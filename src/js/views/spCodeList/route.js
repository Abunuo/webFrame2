import React from 'react';
import {Route, IndexRoute} from 'react-router';
import spCode from './containers/DmListPage.jsx';
import spCodeAdd from './containers/DmAddPage.jsx';


export default (
    <Route >
        <Route path='DmListPage' component={spCode}/>
        <Route path="DmAddPage" component={spCodeAdd}/>
    </Route>
)
