import React from 'react';
import {Link} from 'react-router';
import Grid from '../../NewGrid.jsx';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';
import _ from 'lodash';

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
            name: '对接方式',
            index: 'type',
            formatter: function(value,options,rowObject){
              return value.typeName;
            }
        }, {
            name: 'CP角色',
            index: 'cpRole',
            formatter: function(value,options,rowObject){
              return value.roleName;
            }
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
            name: '计费点编号',
            index: 'key'
        }, {
            name: '计费点名称',
            index: 'name'
        }];
    }

    deleteItem(id) {
      if (confirm("确定要删除吗？\n\n请确认！")) {
        let _this = this,
            {actions} = this.props;
        actions.utilAction.showLoading();
        ws.delete({
            url: '/cps/' + id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                _this.refresh();
            } else {
                alert(response.msg);
            }
        })
      }else{
        console.log("操作失误！");
      }
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.cpAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/good',
            data: {
                ...queryOptions,
                cpKey: cpKey,
                type:"1",
                page: pagination.pageNo
            }
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                _.map(response.data, function(item) {
                    return item["type"] = item.cpType;
                })
                actions.cpAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.cpAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let {datas, pagination} = this.props;
        return (
            <Grid ref="grid" colModels={this.colModels} serialNumber={true} datas={datas}
                  changePage={this.changePage} refresh={this.refresh} pagination={pagination} />
        )
    }

}
