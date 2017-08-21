import React from 'react';
import {Route, IndexRoute} from 'react-router';
import HelpPage from './containers/HelpPage.jsx';

export default (
    <Route path='help'>
        <IndexRoute component={HelpPage}/>
    </Route>
)
