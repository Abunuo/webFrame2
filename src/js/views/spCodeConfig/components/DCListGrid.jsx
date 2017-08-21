import React from 'react';
import {ws} from '../../../lib/main.js';
import Grid from '../../NewGrid.jsx';
import {Link} from 'react-router';
import url from '../url.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        let _this = this;
        this.refresh = this.refresh.bind(this);
        this.changePage = this.changePage.bind(this);
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: '省份',
            index: 'provinceName'
        }, {
            name: '支付日限（元）',
            index: 'dailyLimit'
        }, {
            name: '支付月限（元）',
            index: 'monthlyLimit'
        }, {
            name: '操作',
            index: 'Operation',
            formatter: function(value, options, rowObject) {
                return (
                    <div>
                        <Link className="table-operation-btn" to={'/SP/DmConfigAdd?id=' + rowObject.id}>编辑</Link>
                        <a href="javascript:void(0)" onClick={_this.deleteItem.bind(_this, rowObject.id)}>删除</a>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
      if(confirm(" 确认删除？")){
        let _this = this;
        ws.delete({
          url: '/api/spCodeConfig/' + id
        }).then(function(response) {
          if(response.code == 0) {
            alert("删除成功！");
            _this.refresh();
          } else {
            alert('删除失败！');
            _this.refresh();
            // alert(response.msg);
          }
        })
      }
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.codeConfigAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let temp = url(location.search);
        let codeKey = temp.codeKey;
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/spCodeConfig/' + codeKey,
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.codeConfigAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.codeConfigAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let { actions, dataSource, pagination, queryOptions} = this.props;
        return (
            <div className="form">
                  <Grid serialNumber = "true" colModels={this.colModels} dataSource={dataSource} pagination={pagination} queryOptions={queryOptions} changePage={this.changePage}/>
            </div>
        )
    }

}
