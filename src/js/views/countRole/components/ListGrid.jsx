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
        },{
            name: 'App简称',
            index: 'appName'
        }, {
            name: '计费点编号',
            index: 'id'
        }, {
            name: '计费点名称',
            index: 'name'
        }, {
            name: '计费点金额（元）',
            index: 'price'
        }, {
            name: 'UPAY支付界面状态',
            index: 'isDefaultDialog',
            formatter(value,options,rowObject){
              if (value == 1) {
                return "启用";
              }else{
                return "停用";
              }
            }
        }
        // , {
        //     name: 'CP定制支付界面代码',
        //     index: 'customDialog'
        // }, {
        //     name: 'CP定制支付界面图片',
        //     index: 'customImageUrl'
        // }
        , {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                var id = rowObject.id;
                return (
                    <div>
                        <Link to={'/count/' + id + '/update'}>编辑</Link>
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
            url: '/api/good/' + id
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
        actions.countAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination, params} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        if(typeof(params.id) == 'undefined'){
          ws.get({
              url: '/api/good',
              data: {
                  ...queryOptions,
                  cpKey:cpKey,
                  page: pagination.pageNo
              }
          }).then(function(response) {
              actions.utilAction.hideLoading();
              if(response.code == 0) {
                  actions.countAction.changeListData(response.data);
                  pagination.total = response.pagination.total;
                  actions.countAction.changeListPagination(pagination);
              }
          })
        }else{
            ws.get({
                url: '/api/count/'+ params.id,
                data: {
                    ...queryOptions,
                    page: pagination.pageNo
                }
            }).then(function(response){
                actions.utilAction.hideLoading();
                if(response.code == 0) {
                    if (response.data !=null ) {
                      let arr = [response.data];
                      actions.countAction.changeListData(arr);
                      pagination.total = 1;
                      actions.countAction.changeListPagination(pagination);
                    }
                }
            })
        }
    }

    render() {
        let {datas, pagination} = this.props;
        return (
            <Grid ref="grid" serialNumber={true} colModels={this.colModels} datas={datas} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}
