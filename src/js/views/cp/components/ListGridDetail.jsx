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
            name: 'CP类型',
            index: 'isSelfConsumption',
            formatter(value,options,rowObject){
              if (value == 0) {
                return "放量";
              }else if(value == 1){
                return "卡商";
              }
            }
        }, {
            name: 'CP简称',
            index: 'name',
            formatter(value,options,rowObject){
              if (typeof(rowObject.cpKey) != 'undefined') {
                return (
                  <Link to={'/app/list/' + rowObject.cpKey }>{value}</Link>
                )
              }else{
                return value;
              }

            }
        }, {
            name: 'CP公司全称',
            index: 'fullName'
        }, {
            name: '上级CP',
            index: 'pater',
            formatter(value, options ,rowObject) {
              if(value == null ){
                return " ";
              }
              else{
                return value.name;
            }
          }
        }, {
            name: '所属公司',
            index: 'upayCompany'
        }, {
            name: '登录账号',
            index: 'loginName'
        }, {
            name: '对接方式',
            index: 'type',
            formatter: function(value, options, rowObject) {
              return value.typeName;
            }
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <Link to={'/cp/' + id + '/update'}>编辑</Link>
                        <a className="btn" onClick={_this.deleteItem.bind(this, id)} href="javascript:void(0)">删除</a>
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
            url: '/api/cp/' + id
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
        let {actions, queryOptions, pagination, params} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        if (typeof(params.id) != "undefined") {
          ws.get({
              url: '/api/cp/info/'+params.id,
              data: {
                  ...queryOptions,
                  page: pagination.pageNo
              }
          }).then(function(response) {
              actions.utilAction.hideLoading();
              if(response.code == 0) {
                  let arr = [response.data]
                  actions.cpAction.changeListData(arr);
                  pagination.total = 1;
                  actions.cpAction.changeListPagination(pagination);
              }
          })
        }else{
            ws.get({
                url: '/api/cp',
                data: {
                    ...queryOptions,
                    page: pagination.pageNo
                }
            }).then(function(response) {
                actions.utilAction.hideLoading();
                if(response.code == 0) {
                    actions.cpAction.changeListData(response.data);
                    pagination.total = response.pagination.total;
                    actions.cpAction.changeListPagination(pagination);
                }
            })
        }

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
            <Grid ref="grid" serialNumber={true} keyName="realKey" colModels={this.colModels} datas={datas} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}
