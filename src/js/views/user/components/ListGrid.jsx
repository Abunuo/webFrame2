import React from 'react';
import {Link} from 'react-router';
import Grid from '../../Grid.jsx';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';
import UserStatusSetter from './UserStatusSetter.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.refresh = this.refresh.bind(this);
        let _this = this;
        this.colModels = [{
            name: '账号',
            index: 'name'
        }, {
            name: '角色',
            index: 'role',
            formatter: function(value, options, rowObject) {
                return value.roleName;
            }
        }, {
            name: '状态',
            index: 'status',
            formatter: function(value, options, rowObject) {
                return (
                    <UserStatusSetter value={value.statusId} id={rowObject.id} refresh={_this.refresh}/>
                );
            }
        }, {
            name: '操作',
            index: 'operation',
            formatter: function(value, options, rowObject) {
                let id = rowObject.id;
                return (
                    <div>
                        <Link className="btn" to={'/user/' + id + '/update'}>编辑</Link>
                    </div>
                )
            }
        }];
    }

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.userAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/user',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function(response) {
            actions.utilAction.hideLoading();
            if(response.code == 0) {
                actions.userAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.userAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let {datas, pagination} = this.props;
        return (
            <Grid ref="grid" colModels={this.colModels} datas={datas} pagination={pagination}
                  changePage={this.changePage} refresh={this.refresh}/>
        )
    }

}