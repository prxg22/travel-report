const create = (travelString) => {
  const [from, to, adults, departure, round] = travelString.split(' ')
  return { from, to, adults, departure, round }
}

module.exports = (admin) => {
  const save = ({ id, name, travel }) => admin.database()
    .ref('/chats')
    .set({ [id]: { name, travel: create(travel) } })

  const all = () => admin.database()
    .ref('/chats')
    .once('value')
    .then(snapshot => {
      const chats = snapshot.val()

      const travels = Object.keys(chats).
        map((id) => ({
          id,
          travel: chats[id].travel
        }))

      return travels
    })

  const get = (id) => admin.database()
    .ref(`chats/${id}`)
    .once('value')
    .then(snapshot => snapshot.exists() && snapshot.val())


  return { save, get, all }
}
