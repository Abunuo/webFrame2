import React from 'react';
import FormField from '../../FormField.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.getItemViews = this.getItemViews.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
    }


    onChangeField(field) {
        return function (value) {
            let {model, actions} = this.props;
            model[field] = value;
            actions.blackListAction.changeListQueryOptions(model);
        }
    }

    getItemViews(datas) {
        return _.map(datas, function (item) {
            let key, value;
            if (typeof item === 'object') {
                value = item.value;
                key = item.key != null ? item.key : item.value;
            } else {
                value = item;
                key = item;
            }
            return (
                <option key={key} value={key.toString()}>{value}</option>
            )
        });
    }

    onReset() {
        let {actions} = this.props;
        actions.blackListAction.resetListQueryOptions();
    }

    onChange(event) {
        let {model, actions} = this.props;
        let value = event.target.value;
        model.phoneimsi = event.target.value;
        actions.blackListAction.changeListQueryOptions(model);
    }

    render() {
        let {model, onSearch} = this.props;
        let datas = [{"key": "phone", "value": "手机号"}, {"key": "imsi", "value": "IMSI号"}];
        let itemViews = this.getItemViews(datas);
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <div className="form-group">
                            <label className="control-label col-sm-2">查询类型:</label>
                            <div className="input-container col-sm-8">
                                <select className="form-input form-control" value={model.phoneimsi}
                                        onChange={this.onChange}>
                                    {itemViews}
                                </select>
                            </div>
                        </div>
                        <FormField label="屏蔽号码:">
                            <FormField.Input value={model.txt} onChange={this.onChangeField('txt').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-primary" onClick={onSearch}>查询</button>
                    </FormField>
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onReset}>重置</button>
                    </FormField>
                </div>
            </div>
        )
    }
}
