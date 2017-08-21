import React from 'react';
import {ws} from '../../../lib/main.js';
import Grid from '../../NewGrid.jsx';
import {Link} from 'react-router';
import CurrentTimeEdit from './currentTimeEdit.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.refresh = this.refresh.bind(this);
        this.changePage = this.changePage.bind(this);
        let { refresh } = this.props;
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: 'CP类型',
            index: 'cpExtensionType',
            formatter: function(value, options, rowObject) {
              return value ? "卡商" : "放量";
            }
        }, {
            name: '支付日限（元）',
            index: 'dailyLimit',
            formatter: function(value, options, rowObject) {
              return (
                  <CurrentTimeEdit value={value} refresh={refresh} rowObject={rowObject} valueKey="dailyLimit" />
              )
            }
        }, {
            name: '支付月限（元）',
            index: 'monthlyLimit',
            formatter: function(value, options, rowObject) {
              return (
                  <CurrentTimeEdit value={value} refresh={refresh} rowObject={rowObject} valueKey="monthlyLimit" />
              )
            }
        },  {
            name: '请求间隔（秒）',
            index: 'requestInterval',
            formatter: function(value, options, rowObject) {
              return (
                  <CurrentTimeEdit value={value} refresh={refresh} rowObject={rowObject} valueKey="requestInterval" />
              )
            }
        }
      ];
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.spUserAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/spUser'
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.spUserAction.changeListData(response.data);
            }
        })
    }

    render() {
        let { actions, dataSource, pagination,  queryOptions} = this.props;
        return (
            <div className="form">
                  <Grid serialNumber = "true" colModels={this.colModels} dataSource={dataSource} pagination={pagination} queryOptions={queryOptions} changePage={this.changePage}/>
            </div>
        )
    }

}
