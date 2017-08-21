import React from 'react';
import {Link} from 'react-router';
import Grid from '../../Grid.jsx';
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
            name: '+',
            index: 'id'
        }, {
            name: '代码资费编号',
            index: 'priceId'
        }, {
            name: '开通省份',
            index: 'province'
        }, {
            name: '屏蔽城市',
            index: 'shieldCity'
        }, {
            name: '权重',
            index: 'weight'
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
              // var id = rowObject.giftId;
                var id = 2;
                return (
                    <div>
                        <Link to={'/charge/chargecount/' + id + '/update'}>编辑</Link>
                        <Link to={'/charge'}>保存</Link>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
        let _this = this,
            {actions} = this.props;
        actions.utilAction.showLoading();
        ws.delete({
            url: '/api/chargeDetail/' + id
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                _this.refresh();
            } else {
                alert(response.msg);
            }
        })
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
            url: '/api/chargeDetail',
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

    render() {
        let {datas, pagination} = this.props;
        return (
            <Grid ref="grid" colModels={this.colModels} datas={[{"id":"1","priceId":"ZCLTWO_5","province":"福建省 山东省","shieldCity":"淄博","weight":500}]} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}
