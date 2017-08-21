import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Sp from './containers/Sp.jsx';
import spList from '../spList/route.js';
import spCodeList from '../spCodeList/route.js';
import spCodeConfig from '../spCodeConfig/route.js';
import spCmdList from '../spCmdList/route.js';

export default (
    <Route path='SP'>
        <IndexRoute component={Sp}/>
        {spList}
        {spCodeList}
        {spCodeConfig}
        {spCmdList}
    </Route>
)
