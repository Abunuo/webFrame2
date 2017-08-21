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
            index: 'cpName',
            formatter(value,options,rowObject){
              return (
                <Link to={'/cp/list/' + rowObject.cpId }>{value}</Link>
              )
            }
        }, {
            name: 'APP编号',
            index: 'appKey'
        }, {
            name: 'APP名称',
            index: 'appName',
            formatter(value,options,rowObject){
              let id = rowObject.appId;
              return (
                <div>
                  <Link className="btn" to={"/app/?" + id }>{value}</Link>
                </div>
              )
            }
        }, {
            name: '计费点编号',
            index: 'key'
        }, {
            name: '计费点名称',
            index: 'name',
            formatter(value,options,rowObject){
              let id = rowObject.id;
              return (
                <div>
                  <Link className="btn" to={"/count/" + id }>{value}</Link>
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
            url: '/cps/' + id
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
                type:'1',
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
        datas = _.map(datas, function(item) {
          let cpId = item.cpId != null ? item.cpId : "",
              appId = item.appId != null ? item.appId : "",
              countId = item.id != null ? item.id : "",
              realKey = cpId + appId + countId;
          return {
            ...item,
            realKey: realKey
          }
        })
        return (
            <Grid ref="grid" colModels={this.colModels} serialNumber={true} datas={datas} keyName="realKey"
                  changePage={this.changePage} refresh={this.refresh} pagination={pagination} />
        )
    }

}
