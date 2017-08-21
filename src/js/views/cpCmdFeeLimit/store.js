import Immutable from 'immutable';
import baseStore from '../store-base.js';
import moment from "moment";

let store = _.cloneDeep(baseStore);
_.extend(store, {
    form: {
        model: {},
        errors: {},
        provinceList: [],
        codeCmdsList:[],
        codecmds: [],
        cp: []
    },
    list: {
        datas: [],
        queryOptions: {
            yearMonth: new moment().format("YYYY-MM")
        },
        pagination: {
            pageNo: 1,
            pageSize: 10,
            total: 0
        }
    }
});

// baseStore.list.queryOptions = {
//     yearMonth: new moment().format("YYYY-MM")
// };

export default Immutable.fromJS({
    ...store
})