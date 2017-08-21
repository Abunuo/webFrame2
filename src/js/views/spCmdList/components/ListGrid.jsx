import React from 'react';
import {ws} from '../../../lib/main.js';
import Grid from '../../NewGrid.jsx';
import {Link} from 'react-router';
import url from '../url.js';
import FormField from '../../FormField.jsx';

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
            name: '代码资费编号',
            index: 'key'
        }, {
            name: '代码资费名称',
            index: 'name'
        }, {
            name: '代码资费（元）',
            index: 'price'
        },  {
            name: '开通省份',
            index: 'provinceName'
        }, {
            name: '屏蔽城市',
            index: 'shieldCityName',
        }, {
            name: '代码资费状态',
            index: 'status',
            formatter: function(value, options, rowObject) {
              return value ? "开" : "关";
            }
        }, {
            name: '操作',
            index: 'Operation',
            formatter: function(value, options, rowObject) {
                return (
                    <div>
                        <Link className="table-operation-btn" to={'/SP/DzAddPage?id=' + rowObject.id}>编辑</Link>
                    </div>
                )
            }
        }];
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.cmdListAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/cmd',
            data: {
              ...queryOptions,
              page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.cmdListAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.cmdListAction.changeListPagination(pagination);
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
