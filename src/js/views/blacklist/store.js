import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);
_.extend(store, {
    form: {
        model: {
        }
    },
    list: {
        datas: [],
        queryOptions: {
            phoneimsi:"phone"
        },
        pagination: {
            pageNo: 1,
            pageSize: 10,
            total: 0
        }
    }
});

export default Immutable.fromJS({
    ...store
})