import React from 'react';
import moment from 'moment';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            volume: props.value,
            editable: false,
            change:false,
            first:0
        };
        this.onChange = this.onChange.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onSetClick = this.onSetClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onSetClick(event) {
        let {rowObject, day, status} = this.props,
            _this = this;
        let a = rowObject.yearMonth + "-" + day;
        let d1 = moment(a, "YYYY-MM-DD");
        let d2 = moment(moment().format("YYYY-MM-DD"), "YYYY-MM-DD");
        if (d1.valueOf() >= d2.valueOf()) {
            this.setState({
                editable: true
            });
        }

    }

    onChange(event) {
        let value = event.target.value;
        let first = this.state.volume;
        value = value ? (Number(value) != NaN && Number(value) > 0 ? Number(value) : 0) : 0;
        if(this.state.change){
            this.setState({
                volume: value
            });
        }else {
            this.setState({
                volume: value,
                change:true,
                first:first
            });
        }
    }

    onBlur(event) {
        let value = event.target.value;
        value = value.length > 0 ? Number(value) : null;
        if(this.state.change)
        {
            if(confirm('是否保存？'))
            {
                this.onConfirm();
            }else{
                this.setState({
                    volume: this.state.first,
                    change:false,
                    editable: false
                });
            }
        }else{
            this.setState({
                editable: false
            });
        }

    }

    onConfirm() {
        let {rowId, rowObject, day, refresh} = this.props,
            {volume} = this.state,
            _this = this;
        volume = volume ? Number(volume) : 0;
        let num,
            full = rowObject.yearMonth.split("-");
        let daycount = new Date(full[0], full[1], 0);
        num = daycount.getDate();
        for (var i = day - 1; i < rowObject.dailyLimits.length; i++) {
            if (i < num) {
                rowObject.dailyLimits[i].limit = "" + volume;
            } else {
                rowObject.dailyLimits[i].limit = "";
            }
        }

        ws.post({
            url: '/api/cpCmdFeeLimit/' + rowId,
            data: rowObject
        }).then(function (response) {
            if (response.code == 0) {
                _this.setState({
                    editable: false
                });
                refresh();
            } else {
                alert(response.msg);
            }
        });
        _this.setState({
            editable: false
        });
    }

    render() {
        let {volume, editable} = this.state;
        if (editable) {
            return (
                <div>
                    <input ref="input" type="text" value={volume} onChange={this.onChange} onBlur={this.onBlur} autoFocus="autoFocus"/>
                    <a href="javascript:void(0)" onClick={this.onConfirm}>确定</a>
                </div>
            )
        } else {
            return (
                <a href="javascript:void(0)"
                   onClick={this.onSetClick}>{volume === null || volume === '' ? '—' : volume}</a>
            )
        }
    }

}