const travel = require('./src/travel')
const report = require('./src/report')
const reference = require('firebase-reference-helper')

module.exports = (admin, { ref, params } = {}) => {
    if (!admin) throw Error('No admin provided!')

    const travelRef = ref && reference(ref, params) || ''
    const reportRef = reference(travelRef && travelRef.ref() + '/travels/{travel_id}',
      { ...params, travel_id: '' })

    return {
      Travel: travel(admin, travelRef),
      Report: report(admin, reportRef),
    }
)
