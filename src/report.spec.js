const { AdminRoot, defaultConfig } = require('firebase-admin-mock')
const reference = require('firebase-reference-helper')
const report = require('./report')
const mock = {
  price: 'R$1280',
  routes: {
    INBOUND: {
      airline: 'gol',
      arrival: new Date(),
      departure: new Date(),
      seats: 10,
      stops: 0,
    },
    OUTBOUND: {
      airline: 'gol',
      arrival: new Date(),
      departure: new Date(),
      seats: 10,
      stops: 0,
    }
  }
}

describe('report', () => {
  describe('init report', () => {
    it('should not create with undefined admin', () => {
        expect(() => report()).toThrow('No admin provided!')
    })
  })

  it('should create with ref', () => {
    admin = new AdminRoot()
    admin.initializeApp(defaultConfig)

    expect(() => report(admin, { ref: '/chat' }))
      .not.toThrow()
    expect(() => report(admin, { ref: '/chat/{id}/travels/{travel_id}', params: { id: '', travel_id: '' } }))
      .not.toThrow()
  })
})
