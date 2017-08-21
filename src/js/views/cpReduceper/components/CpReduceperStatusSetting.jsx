import React from 'react';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }


    open(event) {
        let {Id, status, rowObject} = this.props,
            _this = this;
        rowObject.status = 1;
        if (confirm("确定要启用吗？")) {
            ws.post({
                url: '/api/cpReduceper/' + Id,
                data: rowObject
            }).then(function (response) {
                if (response.code == 0) {
                    _this.setState({
                        status: 1
                    });
                } else {
                    alert(response.msg);
                }
            });
        }
    }

    close(event) {
        let {Id, status, rowObject} = this.props,
            _this = this;
        rowObject.status = 0;
        if (confirm("确定要停用吗？")) {
            ws.post({
                url: '/api/cpReduceper/' + Id,
                data: rowObject
            }).then(function (response) {
                if (response.code == 0) {
                    _this.setState({
                        status: 0
                    });
                } else {
                    alert(response.msg);
                }
            });
        }
    }


    render() {
        let {status} = this.state;
        if (status == 1) {
            return (
                <a href="javascript:void(0)" onClick={this.close}>启用</a>
            )
        } else {
            return (
                <a href="javascript:void(0)" onClick={this.open} className="red">停用</a>
            )
        }
    }

}