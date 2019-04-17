module.exports = (admin, rootRef) => {
  if (!admin) throw Error('No admin provided!')
  const reportRef = (params) => rootRef && rootRef.ref(params) + '/report'

  const save = (report, params) => admin.database()
    .ref(reportRef(params))
    .set(report)

  const get = (params) => admin.database()
    .ref(reportRef(params))
    .once('value', (snap) => snap.val())


  return { save, get }
}
