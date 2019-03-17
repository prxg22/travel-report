const travel = require('./travel')
const report = require('./report')

module.exports = (admin) => ({
    Travel: travel(admin),
    Report: report(admin),
})
