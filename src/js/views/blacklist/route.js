import React from 'react';
import {Route, IndexRoute} from 'react-router';
import BlacklistAddPage from './containers/AddPage.jsx';
import BlacklistListPage from './containers/ListPage.jsx';

export default (
    <Route path='blacklist'>
        <IndexRoute component={BlacklistListPage}/>
        <Route path="add" component={BlacklistAddPage}/>
    </Route>
)