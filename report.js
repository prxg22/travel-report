module.exports = (admin) => {
  const save = ({ id, report }) => admin.database()
    .ref('/reports')
    .set({ [id]: { report } })

  const all = () => admin.database()
    .ref('/reports')
    .once('value', (snap) => snap.val())

  const get = (id) => admin.database()
    .ref(`/reports`)
    .once('value', (snap) => snap.exists() && snap.val())

  return { save, all, get }
}
