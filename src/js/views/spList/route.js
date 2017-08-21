import React from 'react';
import {Route, IndexRoute} from 'react-router';
import spList from './containers/SpListPage.jsx';
import spAdd from './containers/SpAddPage.jsx';


export default (
    <Route>
      <Route path="SpListPage" component={spList} />
      <Route path="SpAddPage" component={spAdd}/>
    </Route>
)
