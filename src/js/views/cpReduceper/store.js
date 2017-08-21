import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);
_.extend(store, {
    form: {
        model: {
            status:1
        },
        errors: {},
        cp: [],
        sp: [],
        appNameList:[],
        codeList: [],
        provinceList: [],
        status:[]
    }
});

export default Immutable.fromJS({
    ...store
})