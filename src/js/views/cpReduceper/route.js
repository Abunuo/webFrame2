import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CpReduceperAddPage from './containers/AddPage.jsx';
import CpReduceperListPage from './containers/ListPage.jsx';

export default (
    <Route path='cpreduceper'>
        <IndexRoute component={CpReduceperListPage}/>
        <Route path="add" component={CpReduceperAddPage}/>
    </Route>
)