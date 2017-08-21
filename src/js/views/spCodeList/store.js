import Immutable from 'immutable';
import baseStore from '../store-base.js';

let store = _.cloneDeep(baseStore);

_.extend(store, {
  form: {
    model: {
      spKey: null,
      fullName: null,
      carrier: null,
      mobileRate: 0,
      unicomRate: 0,
      telecomRate: 0,
      Rate: null,
      codeType: null,
      bizType: null
    },
    errors: {},
    mobileCompany:[],
    bizType:[],
    codeType:[],
    spList: [],
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
