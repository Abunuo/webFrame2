import React from 'react';
import FormField from '../../FormField.jsx';

const USER_STATUS = [{key: 1, value: "启用"}, {key: 2, value: "停用"}];

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
    }

    onChangeField(field) {
        return function(value) {
            let {model, actions, pagination} = this.props;
            model[field] = value;
            actions.userAction.changeListQueryOptions(model);
        }
    }

    onSearch() {
        let {actions, onSearch} = this.props;
        actions.userAction.resetListPagination();
        setTimeout(onSearch, 0);

    }

    render() {
        let {model, opRoles} = this.props;
        opRoles = _.map(opRoles, function(item) {
            return {
                key: item.roleId,
                value: item.roleName
            }
        });
        return (
            <div className="search-container">
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="账号">
                            <FormField.Input value={model.name} onChange={this.onChangeField('name').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="角色">
                            <FormField.Select datas={opRoles} value={model.roleId} valueType="number" onChange={this.onChangeField('roleId').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-form-container">
                    <div className="form form-search">
                        <FormField label="状态">
                            <FormField.Select datas={USER_STATUS} value={model.userStatus} valueType="number" onChange={this.onChangeField('userStatus').bind(this)}/>
                        </FormField>
                    </div>
                </div>
                <div className="search-btn-container form form-search">
                    <FormField>
                        <button className="btn btn-primary" onClick={this.onSearch}>查询</button>
                    </FormField>
                </div>
            </div>
        )
    }
}