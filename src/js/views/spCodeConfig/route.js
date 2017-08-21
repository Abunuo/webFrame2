import React from 'react';
import {Route, IndexRoute} from 'react-router';
import spCodeConfig from './containers/DmConfig.jsx';
import spCodeConfigAdd from './containers/DmConfigAdd.jsx';


export default (
    <Route >
        <Route path='DmConfig' component={spCodeConfig}/>
        <Route path="DmConfigAdd" component={spCodeConfigAdd}/>
    </Route>
)
