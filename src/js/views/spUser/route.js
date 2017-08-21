import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ListPage from './containers/SpUserPage.jsx';

export default (
    <Route path='spUser'>
        <IndexRoute component={ListPage}/>
    </Route>
)
