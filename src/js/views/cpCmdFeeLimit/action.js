import baseAction from '../action-base.js';

let base = baseAction('CPCMDFEELIMIT');

_.extend(base, {
    changeCp: function(data) {
        return {
            type: 'CPCMDFEELIMIT_CHANGE_CP',
            data
        }
    },
    changeCodeCmds: function(data) {
        return {
            type: 'CPCMDFEELIMIT_CHANGE_CODECMDS',
            data
        }
    }
});

export default base;