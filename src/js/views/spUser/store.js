import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);

_.extend(store, {
  form: {
    model: {
      cpExtensionType: null,
      dailyLimit: null,
      monthlyLimit: null,
      requestInterval: null
    },
    errors: {},
    cpExtensionType:[{key: 0, value: '放量'}, {key: 1, value: '卡商'}],
  },
  detailList: {
    datas: [],
    queryOptions: {},
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
