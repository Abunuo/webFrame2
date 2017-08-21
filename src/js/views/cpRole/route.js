import React from 'react';
import {Route, IndexRoute} from 'react-router';
import CpAddPage from './containers/AddPage.jsx';
import CpListPage from './containers/ListPage.jsx';
import CpDetailPage from './containers/DetailPage.jsx';

import CpUpdatePage from './containers/UpdatePage.jsx';

export default (
    <Route path='cp'>
        <IndexRoute component={CpListPage}/>
        <Route path="list" component={CpDetailPage}/>
        <Route path="countInformation" component={CpListPage}/>
        <Route path="add" component={CpAddPage}/>
        <Route path="list/:id" component={CpDetailPage}/>
        <Route path=":id/update" component={CpUpdatePage}/>
    </Route>
)
