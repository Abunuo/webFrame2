import Immutable from 'immutable';
import baseStore from '../store-base.js';
import _ from 'lodash';

_.extend(baseStore, {
  form: {
    model: {
      status: 1,
      cpKey: "",
      appKey: "",
      cmdKey: ""
    },
    cpNameList:[],
    provinceList:[],
    shieldCityList:[],
    errors: {}
  }
});

export default Immutable.fromJS({
    ...baseStore
})
