import React from 'react';
import {Link} from 'react-router';
import Grid from '../../NewGrid.jsx';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';
import CpVolumeSetting from './CpVolumeSetting.jsx'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.refresh = this.refresh.bind(this);
        let _this = this;
        let {queryOptions, pagination, actions, refresh} = this.props;
        this.colModels = [
            {
                name: '序号',
                index: 'serial'
            }, {
                name: '日期',
                index: 'yearMonth'
            }, {
                name: 'CP简称',
                index: 'cpName'
            }, {
                name: '代码资费编号',
                index: 'cmdKey'
            }, {
                name: '运营商',
                index: 'carrierName'
            }, {
                name: '省份',
                index: 'provinceName'
            }, {
                name: '1',
                index: 'time1',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[0].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="01"/>
                    )
                }
            }, {
                name: '2',
                index: 'time2',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[1].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="02"/>
                    )
                }
            }, {
                name: '3',
                index: 'time3',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[2].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="03"/>
                    )
                }
            }, {
                name: '4',
                index: 'time4',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[3].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="04"/>
                    )
                }
            }, {
                name: '5',
                index: 'time5',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[4].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="05"/>
                    )
                }
            }, {
                name: '6',
                index: 'time6',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[5].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="06"/>
                    )
                }
            }, {
                name: '7',
                index: 'time7',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[6].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="07"/>
                    )
                }
            }, {
                name: '8',
                index: 'time8',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[7].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="08"/>
                    )
                }
            }, {
                name: '9',
                index: 'time9',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[8].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="09"/>
                    )
                }
            }, {
                name: '10',
                index: 'time10',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[9].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="10"/>
                    )
                }
            }, {
                name: '11',
                index: 'time11',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[10].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="11"/>
                    )
                }
            }, {
                name: '12',
                index: 'time12',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[11].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="12"/>
                    )
                }
            }, {
                name: '13',
                index: 'time13',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[12].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="13"/>
                    )
                }
            }, {
                name: '14',
                index: 'time14',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[13].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="14"/>
                    )
                }
            }, {
                name: '15',
                index: 'time15',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[14].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="15"/>
                    )
                }
            }, {
                name: '16',
                index: 'time16',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[15].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="16"/>
                    )
                }
            }, {
                name: '17',
                index: 'time17',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[16].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="17"/>
                    )
                }
            }, {
                name: '18',
                index: 'time18',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[17].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="18"/>
                    )
                }
            }, {
                name: '19',
                index: 'time19',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[18].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="19"/>
                    )
                }
            }, {
                name: '20',
                index: 'time20',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[19].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="20"/>
                    )
                }
            }, {
                name: '21',
                index: 'time21',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[20].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="21"/>
                    )
                }
            }, {
                name: '22',
                index: 'time22',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[21].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="22"/>
                    )
                }
            }, {
                name: '23',
                index: 'time23',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[22].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="23"/>
                    )
                }
            }, {
                name: '24',
                index: 'time24',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[23].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="24"/>
                    )
                }
            }, {
                name: '25',
                index: 'time25',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[24].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="25"/>
                    )
                }
            }, {
                name: '26',
                index: 'time26',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[25].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="26"/>
                    )
                }
            }, {
                name: '27',
                index: 'time27',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[26].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="27"/>
                    )
                }
            }, {
                name: '28',
                index: 'time28',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[27].limit;
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="28"/>
                    )
                }
            }, {
                name: '29',
                index: 'time29',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[28].limit;
                    if(value != "")
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="29"/>
                    )
                }
            }, {
                name: '30',
                index: 'time30',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[29].limit;
                    if(value != "")
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="30"/>
                    )
                }
            }, {
                name: '31',
                index: 'time31',
                formatter: function (value, options, rowObject) {
                    value = rowObject.dailyLimits[30].limit;
                    if(value != "")
                    value = value > 0 ? value : 0;
                    var id = rowObject.id;
                    return (
                        <CpVolumeSetting key={_.uniqueId()} refresh={refresh}
                                         actions={actions} value={value} rowId={id} rowObject={rowObject} day="31"/>
                    )
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
            }
        ];
    }

    deleteItem(id) {
        let _this = this,
            {actions} = this.props;
        if (confirm("确定要删除吗？")) {
            actions.utilAction.showLoading();
            ws.delete({
                url: '/api/cpCmdFeeLimit/' + id
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

    changePage(page) {
        let {actions, pagination} = this.props;
        pagination.pageNo = page;
        actions.cpCmdFeeLimitAction.changeListPagination(pagination);
        this.refresh();
    }

    refresh() {
        let {actions, queryOptions, pagination} = this.props,
            _this = this;
        actions.utilAction.showLoading();
        ws.get({
            url: '/api/cpCmdFeeLimit',
            data: {
                ...queryOptions,
                page: pagination.pageNo
            }
        }).then(function (response) {
            actions.utilAction.hideLoading();
            if (response.code == 0) {
                actions.cpCmdFeeLimitAction.changeListData(response.data);
                pagination.total = response.pagination.total;
                actions.cpCmdFeeLimitAction.changeListPagination(pagination);
            }
        })
    }

    render() {
        let {datas, pagination} = this.props;
        return (
            <div id="kk">
                <Grid ref="grid" serialNumber={true} colModels={this.colModels} datas={datas}
                      changePage={this.changePage}
                      pagination={pagination} refresh={this.refresh}/>
            </div>
        )
    }

}