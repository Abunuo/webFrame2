import React from 'react';
import {Link} from 'react-router';
import Grid from '../../GridNoP.jsx';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.refresh = this.refresh.bind(this);
        let _this = this;
        this.colModels = [{
            name: '号码',
            index: 'result',
            formatter: function(value, options, rowObject) {
                let phone = rowObject.phone,
                    imsi = rowObject.imsi;
                value = phone != null && phone.length > 0 ? phone : imsi;
                return value;
            }
        }, {
            name: '操作',
            index: 'operation',
            formatter: function (value, options, rowObject) {
                let id = rowObject.id;
                return (
                    <div>
                        <a className="btn" onClick={_this.deleteItem.bind(this, id)}
                           href="javascript:void(0)">删除</a>
                    </div>
                )
            }
        }];
    }

    deleteItem(id) {
        let _this = this,
            {actions} = this.props;
        if (confirm("确定要删除吗？")) {
            actions.utilAction.showLoading();
            ws.delete({
                url: '/api/phoneImsi/' + id
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


    refresh() {
        let {actions, queryOptions} = this.props,
            _this = this,
            phoneimsi = queryOptions.phoneimsi,
            txt = queryOptions.txt;
        let datas = {phone: txt};
        if (phoneimsi == "imsi")
            datas = {imsi: txt}
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/phoneImsi/blacklist',
            data: datas
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.blackListAction.changeListData(response.data);
            }
        });
    }

    render() {
        let {datas} = this.props;
        return (
            <Grid ref="grid" colModels={this.colModels} datas={datas} refresh={this.refresh}/>
        )
    }

}