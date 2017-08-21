import React from 'react';
import {Link} from 'react-router';
import Grid from '../../NewGrid.jsx';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.refresh = this.refresh.bind(this);
        let _this = this;
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: 'CP简称',
            index: 'cpName'
        }, {
            name: 'APP编号',
            index: 'appKey'
        }, {
            name: 'APP名称',
            index: 'appName'
        }, {
            name: '代码资费编号',
            index: 'cmdKey'
        }, {
            name: '开通省份',
            index: 'cmdProvinceName'
        }, {
            name: '屏蔽省份',
            index: 'shieldProvinceName'
        }, {
            name: '屏蔽城市',
            index: 'shieldCityName'
        }, {
            name: '权重',
            index: 'priority'
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <Link to={'/charge/' + id + '/update'}>编辑</Link>
                        {/* <Link to={'/charge/' + id}>删除</Link> */}
                        <a href="javascript:void(0)" onClick={_this.deleteItem.bind(_this, id)}>删除</a>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
      if (confirm("确定要删除吗？\n\n请确认！")) {
        let _this = this,
            {actions} = this.props;
        actions.utilAction.showLoading();
        ws.delete({
            url: '/api/appCmdRelation/' + id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                _this.refresh();
            } else {
                alert(response.msg);
            }
        })
      }
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.chargeAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/appCmdRelation',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                actions.chargeAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.chargeAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let {datas, pagination} = this.props;
        return (
            <Grid ref="grid" serialNumber={true} colModels={this.colModels} datas={datas} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}
