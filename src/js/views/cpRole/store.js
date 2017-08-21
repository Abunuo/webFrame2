import Immutable from 'immutable';
import baseStore from '../store-base.js';
import _ from 'lodash';

_.extend(baseStore, {
  form: {
    model: {
    },
    errors: {},
    isSelfConsumptionList:[{"id":2,"name":"空"},{"id":0,"name":"放量"},{"id":1,"name":"卡商"}]
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
