import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ChargeAddPage from './containers/AddPage.jsx';
import ChargeListPage from './containers/ListPage.jsx';
import ChargeDetailPage from './containers/DetailPage.jsx';
import ChargeCountPage from './containers/ChargeCountDetailPage.jsx';

import ChargeUpdatePage from './containers/UpdatePage.jsx';

export default (
    <Route path='charge'>
        <IndexRoute component={ChargeListPage}/>
        <Route path="add" component={ChargeAddPage}/>
        <Route path=":id" component={ChargeDetailPage}/>
        <Route path=":id/update" component={ChargeUpdatePage}/>
        <Route path="chargecount/:id/update" component={ChargeCountPage}/>
    </Route>
)
