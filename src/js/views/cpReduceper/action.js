import baseAction from '../action-base';

let base = baseAction('CPREDUCEPER');

_.extend(base, {
    changeCp: function(data) {
        return {
            type: 'CPREDUCEPER_CHANGE_CP',
            data
        }
    },
    changeSp: function(data) {
        return {
            type: 'CPREDUCEPER_CHANGE_SP',
            data
        }
    },
    changeCode: function(data) {
        return {
            type: 'CPREDUCEPER_CHANGE_CODE',
            data
        }
    },
    changeStatus: function(data) {
        return {
            type: 'CPREDUCEPER_CHANGE_STATUS',
            data
        }
    }
});
export default base;