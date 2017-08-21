import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";
import baseReducer from '../reducer-base.js';

export default function(state = initialState, action = {}) {
    let data = _p(action.data);
    switch (action.type) {
        case "CPREDUCEPER_CHANGE_CP":
            return state.set("form", state.get("form").set("cp", data));
        case "CPREDUCEPER_CHANGE_SP":
            return state.set("form", state.get("form").set("sp", data));
        case "CPREDUCEPER_CHANGE_CODE":
            return state.set("form", state.get("form").set("codeList", data));
        case "CPREDUCEPER_CHANGE_STATUS":
            return state.set("form", state.get("form").set("status", data));
        default:
            return baseReducer('CPREDUCEPER', initialState, state, action);
    }
}