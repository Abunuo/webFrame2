import Immutable from 'immutable';
import baseStore from '../store-base.js';
import _ from 'lodash';

_.extend(baseStore, {
  form: {
    model: {
      isDefaultDialog:0,
      appName:null,
      appKey:null,
      key:null,
      name:null,
      price:null
    },
    errors: {},
    isDefaultDialogList:[{"id":1,"name":"启用"},{"id":0,"name":"停用"}]
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
    ...baseStore
})
