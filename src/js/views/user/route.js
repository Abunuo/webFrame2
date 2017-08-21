import React from 'react';
import {Route, IndexRoute} from "react-router";
import ListPage from "./containers/ListPage.jsx";
import AddPage from "./containers/AddPage.jsx";
import UpdatePage from "./containers/UpdatePage.jsx";

export default (
    <Route path="/user">
        <IndexRoute component={ListPage}/>
        <Route path="add" component={AddPage}/>
        <Route path=":id/update" component={UpdatePage}/>
    </Route>
)