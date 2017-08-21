import React from 'react';
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
        this.setState({
            editable: true
        });
    }

    onChange(event) {
        let value = event.target.value;
        value = value ? (Number(value) != NaN && Number(value)> 0) ? (Number(value)>=100?100: Number(value)) : 0 : 0;
        let first = this.state.volume;
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
        value = value.length > 0 ? (Number(value)>=100?100: Number(value)): null;
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
        let {Id, rowObject} = this.props,
            {volume} = this.state,
            _this = this;
        volume = volume ? Number(volume) : 0;
        rowObject.reducePercent = volume;
        ws.post({
            url: '/api/cpReduceper/' + Id,
            data: rowObject
        }).then(function (response) {
            if (response.code == 0) {
                _this.setState({
                    editable: false
                })
            } else {
                alert(response.msg);
            }
        });
    }

    render() {
        let {volume, editable} = this.state;
        if (editable) {
            return (
                <div>
                    <input type="text" value={volume} onChange={this.onChange} onBlur={this.onBlur} autoFocus="autoFocus"/>
                    <a href="javascript:void(0)" onClick={this.onConfirm}>确定</a>
                </div>
            )
        } else {
            return (
                <a href="javascript:void(0)" onClick={this.onSetClick}
                   onBlur={this.onBlur}>{volume == null || volume == '' ? '设置' : volume}</a>
            )
        }
    }

}