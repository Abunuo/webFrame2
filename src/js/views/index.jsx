import React from 'react';
import {render} from 'react-dom';
import AdminRouter from "./AdminRouter.jsx";
import CpRouter from './CpRouter.jsx';
import {Provider} from "react-redux";
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import thunk from "redux-thunk";
import history from "./history.jsx";
import reducers from "./reducers.js";

const store = createStore(
    combineReducers({
        reducers,
        routing: routerReducer
    }),
    applyMiddleware(thunk)
);

const _history = syncHistoryWithStore(history, store);
const RealRouter = loginType == 1 ? AdminRouter : CpRouter;

render(
    <Provider store={store}>
        <RealRouter history = {_history} />
    </Provider>,
    document.getElementById("app")
);
