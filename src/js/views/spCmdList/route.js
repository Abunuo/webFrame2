import React from 'react';
import {Route, IndexRoute} from 'react-router';
import spCmd from './containers/DzListPage.jsx';
import spCmdAdd from './containers/DzAddPage.jsx';


export default (
    <Route >
        <Route path='DzListPage' component={spCmd}/>
        <Route path="DzAddPage" component={spCmdAdd}/>
    </Route>
)
