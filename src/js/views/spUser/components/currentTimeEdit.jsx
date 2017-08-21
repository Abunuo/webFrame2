import React from 'react';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentValue: props.value,
            editable: false,
            change: false,
            firstState: props.value
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
        let {rowObject, valueKey, refresh} = this.props;
        if(valueKey == 'dailyLimit' || valueKey == 'monthlyLimit'){
          if(Number(value) != NaN && value >= 0 && value <= 999999.99){
            this.setState({
              currentValue: Number(value),
              change: true
            });
          }
        } else if(Number(value) != NaN) {
          this.setState({
            currentValue: Number(value),
            change: true
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
                    currentValue: this.state.firstState,
                    change: false,
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
        let {rowObject, valueKey, refresh} = this.props,
            {currentValue} = this.state,
            _this = this;
        rowObject[valueKey] = Number(currentValue);
        ws.post({
            url: '/api/spUser/' + rowObject.id,
            data: rowObject
        }).then(function(response) {
            if(response.code == 0) {
                _this.setState({
                    editable: false,
                    firstState: Number(currentValue)
                });
                refresh();
            } else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {currentValue, editable} = this.state;
        if(editable) {
            return (
                <div>
                    <input ref="input" type="text" value={currentValue} onChange={this.onChange} onBlur={this.onBlur} autoFocus="autoFocus"/>
                    <a href="javascript:void(0)" onClick={this.onConfirm}>确定</a>
                </div>
            )
        } else {
            return (
                <a href="javascript:void(0)" onClick={this.onSetClick}>{currentValue}</a>
            )
        }
    }
}
