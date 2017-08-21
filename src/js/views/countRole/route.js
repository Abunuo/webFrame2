import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CountAddPage from './containers/AddPage.jsx';
import CountListPage from './containers/ListPage.jsx';
import CountDetailPage from './containers/UpdatePage.jsx';

import CountUpdatePage from './containers/UpdatePage.jsx';

export default (
    <Route path='count'>
        <IndexRoute component={CountListPage}/>
        <Route path="add" component={CountAddPage}/>
        <Route path=":id" component={CountListPage}/>
        <Route path=":id/update" component={CountUpdatePage}/>
    </Route>
)
