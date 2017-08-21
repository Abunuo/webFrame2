import React from 'react';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    onChangeStatus(id, userStatus) {
        let _this = this;
        ws.post({
            url: '/api/user/' + id + '/changeStatus',
            data: {
                userStatus: userStatus
            }
        }).then(function(response) {
            if(response.code === 0) {
                _this.props.refresh();
            } else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {value, id} = this.props;
        if(value === 1) {
            return (
                <a href="javascript:void(0)" onClick={this.onChangeStatus.bind(this, id, 2)}>启用</a>
            )
        } else {
            return (
                <a href="javascript:void(0)" onClick={this.onChangeStatus.bind(this, id, 1)} className="red">停用</a>
            )
        }
    }

}