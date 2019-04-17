const config = {
  adults: 1,
  babies: 0,
  children: 0,
}

module.exports = (admin, rootRef) => {
  if (!admin) throw Error('No admin provided!')

  const travelRef = (params) => {
    const root = rootRef && rootRef.ref(params)
    return admin.database().ref(root + '/travels')
  }

  const save = ({ from, to, date1, date2, adults, children, babies } = {}, params) => {
    const requireds = [from, to, date1, date2]
    const hasUndefined = requireds.filter(r => !r).length > 0
    if (hasUndefined) throw Error(`from, to, date1, date2 fields are required!`)
    const travel = {
      ...config,
      from,
      to,
      date1,
      date2,
      adults: adults || config.adults,
      children: children || config.children,
      babies: babies || config.babies,
    }

    travelRef(params).push(travel)
  }

  const all = (params) => admin.database()
    .ref(travelRef(params))
    .once('value')
    .then(snapshot => {
      const root = snapshot.val()

      const travels = Object.keys(root).
        map((id) => ({
          id,
          ...chats[id].travel
        }))

      return travels
    })

  const get = (id, params) => admin.database()
    .ref(travelRef(params))
    .once('value')
    .then(snapshot => snapshot.exists() && snapshot.val()[id])


  return { save, get, all }
}
