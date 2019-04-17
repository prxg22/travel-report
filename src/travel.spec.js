const { AdminRoot, defaultConfig } = require('firebase-admin-mock')
const reference = require('firebase-reference-helper')
const travel = require('./travel')

const mock = {
  from: 'nat',
  to: 'sp',
  date1: '2019-12-01',
  date2: '2019-12-08',
  adults: 2,
  babies: 1,
  children: 0
}

describe('travel', () => {
  describe('init travel', () => {
    it('should not create with undefined admin', () => {
        expect(() => travel()).toThrow('No admin provided!')
    })

    it('should create with ref', () => {
      admin = new AdminRoot()
      admin.initializeApp(defaultConfig)

      expect(() => travel(admin, { ref: '/chat' }))
        .not.toThrow()
      expect(() => travel(admin, { ref: '/chat/{id}', params: { id: '' } }))
        .not.toThrow()
    })
  })

  describe('save travel', () => {
    let admin
    let database
    beforeEach(() => {
      admin = new AdminRoot()
      admin.initializeApp(defaultConfig)
      database = admin.database()
    })

    it('should throw on empty travel', () => {
      const db = travel(admin)
      expect(() => db.save()).toThrow('from, to, date1, date2 fields are required!')
    })

    it('should throw on required fields', () => {
      const db = travel(admin)
      expect(() => db.save()).toThrow('from, to, date1, date2 fields are required!')
      expect(() => db.save({ from: 'nat' })).toThrow('from, to, date1, date2 fields are required!')
      expect(() => db.save({ to: 'sp' })).toThrow('from, to, date1, date2 fields are required!')
    })

    it('should save travel correcty', () => {
      const db = travel(admin)
      expect(() => db.save(mock)).not.toThrow()

      const pushedKeys = database.getPushKeys()
      expect(pushedKeys.length).toBe(1)
    })

    it('should save travel correcty with reference', () => {
      database.setMockData({ chats: { 12: { travels: {} } } })

      const db = travel(admin, reference('/chats/{chat_id}', { chat_id: true }))
      const chat_id = 21999
      expect(() => db.save(mock, { chat_id })).not.toThrow()

      const pushedKeys = database.getPushKeys()
      expect(pushedKeys.length).toBe(1)

      const pushedTravelKey = pushedKeys[0]
      const pushedTravel = database.getMockData().chats[chat_id].travels[pushedTravelKey]

      expect(pushedTravel).toEqual(mock)
    })
  })
})
