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
           name: 'SP简称',
           index: 'spName',
        }, {
            name: '代码名称',
            index: 'fullName',
            formatter: function(value, options, rowObject) {
                return (
                    <Link to={'/SP/DzListPage?spKey=' + rowObject.spKey + '&&codeKey=' + rowObject.key}>{value}</Link>
                )
            }
        }, {
            name: '运营商',
            index: 'carrierName'
        },  {
            name: '移动',
            index: 'mobileRate'
        },  {
            name: '联通',
            index: 'unicomRate'
        },  {
            name: '电信',
            index: 'telecomRate'
        }, {
            name: '代码类别',
            index: 'codeNme'
        }, {
            name: '业务类型',
            index: 'bizName',
        }, {
            name: '调用SP路径',
            index: 'route'
        }, {
            name: '操作',
            index: 'Operation',
            formatter: function(value, options, rowObject) {
                return (
                    <div>
                        <Link className="table-operation-btn" to={'/SP/DmConfig?codeKey=' + rowObject.key}>配置</Link>
                        <Link className="table-operation-btn" to={'/SP/DmAddPage?id=' + rowObject.id}>编辑</Link>
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
            url: '/api/spCode/' + id
          }).then(function(response) {
            if(response.code == 0) {
              alert("删除成功！");
              _this.refresh();
            } else {
              alert("删除失败！");
              _this.refresh();
            }
          })
        }
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.codeListAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/spCode',
            data: {
              ...queryOptions,
              page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.codeListAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.codeListAction.changeListPagination(pagination);
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
