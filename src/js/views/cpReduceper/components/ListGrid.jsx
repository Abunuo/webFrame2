import React from 'react';
import {Link} from 'react-router';
import Grid from '../../NewGrid.jsx';
import {ws} from '../../../lib/main.js';
import CpReduceperSetting from './CpReduceperSetting.jsx';
import CpReduceperStatusSetting from './CpReduceperStatusSetting.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.changePage = this.changePage.bind(this);
        let _this = this;
        this.colModels = [{
            name: '序号',
            index: 'serial'
        }, {
            name: 'CP简称',
            index: 'cpName'
        },{
            name: 'APP名称',
            index: 'appKeyName'
        }, {
            name: '代码名称',
            index: 'codeName'
        }, {
            name: '省份',
            index: 'province'
        }, {
            name: '核减比例(%)',
            index: 'reducePercent',
            formatter: function (value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <CpReduceperSetting value={value} Id={id} rowObject={rowObject}/>
                )
            }
        }, {
            name: '核减状态',
            index: 'status',
            formatter: function (value, options, rowObject) {
                var id = rowObject.id, status = rowObject.status;
                return (
                    <CpReduceperStatusSetting status={status} Id={id} rowObject={rowObject}/>
                )
            }
        }, {
            name: '操作',
            index: 'operation',
            formatter: function (value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <a href="javascript:void(0)" onClick={_this.deleteItem.bind(_this, id)}>删除</a>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
        let {actions, pagination} = this.props,
            _this = this;
        if (confirm("确定要删除吗？")) {
            actions.utilAction.showLoading();
            ws.delete({
                url: '/api/cpReduceper/' + id
            }).then(function (response) {
                actions.utilAction.hideLoading();
                if (response.code == 0) {
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
        actions.cpReduceperAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/cpReduceper',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.cpReduceperAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.cpReduceperAction.changeListPagination(pagination);
            }
        });
    }

    render() {
        let {datas, queryOptions, pagination} = this.props;
        return (
            <Grid ref="grid" serialNumber={true} colModels={this.colModels} datas={datas}
                  pagination={pagination} queryOptions={queryOptions}
                  changePage={this.changePage}/>
        )
    }

}