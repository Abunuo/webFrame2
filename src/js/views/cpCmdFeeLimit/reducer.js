import initialState from "./store.js";
import baseReducer from '../reducer-base.js';
import _p from "../../lib/immutable-process.js";

export default function(state = initialState, action = {}) {
    let data = _p(action.data);
    switch (action.type) {
        case "CPCMDFEELIMIT_CHANGE_CP":
            return state.set("form", state.get("form").set("cp", data));
        case "CPCMDFEELIMIT_CHANGE_CODECMDS":
            return state.set("form", state.get("form").set("codecmds", data));
        default:
            return baseReducer('CPCMDFEELIMIT', initialState, state, action);
    }
}