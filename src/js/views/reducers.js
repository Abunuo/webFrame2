import {combineReducers} from "redux";
import util from './_util/reducer.js';
import enums from "./_enums/reducer.js";
import user from "./user/reducer.js";
import mytest from "./_mytest/reducer.js";
import cpcmdfeelimit from "./cpCmdFeeLimit/reducer.js";
import cpreduceper from "./cpReduceper/reducer.js";
import blacklist from "./blacklist/reducer.js";

import sp from './SP/reducer';
import spList from './spList/reducer';
import spCodeList from './spCodeList/reducer';
import spCodeConfig from './spCodeConfig/reducer';
import spCmdList from './spCmdList/reducer';
import spUser from './spUser/reducer';

import cp from "./cp/reducer.js";
import app from "./app/reducer.js";
import charge from './charge/reducer.js';
// import chargeDetail from './chargeDetail/reducer.js';
import count from './count/reducer.js';


export default combineReducers({
    util,
    enums,
    user,
    mytest,
    cpcmdfeelimit,
    cpreduceper,
    blacklist,
    sp,
    spList,
    spCodeList,
    spCmdList,
    spCodeConfig,
    spUser,
    cp,
    app,
    charge,
    count
})
