import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);

_.extend(store, {
  form: {
    model: {
      codeKey: null,
      name: null,
      price: null,
      province: null,
      status: null,
      spKey: null
    },
    errors: {},
    spList: [],
    codeList: [],
    cmdList: [],
    status:[{'id': 1, 'name': '开'}, {'id': 0, 'name': '关'}],
    province: [],
    shieldCity: [],
    codeList: []
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
