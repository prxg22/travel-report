const travel = require('./src/travel')
const report = require('./src/report')
const reference = require('firebase-reference-helper')

module.exports = (admin, { ref, params } = {}) => {
    if (!admin) throw Error('No admin provided!')

    const rootRef = ref && reference(ref, params) || ''

    return {
      Travel: travel(admin, rootRef),
      Report: report(admin, rootRef),
    }
}
