const testEmailValid = 'test@test.com'
const testPasswordValid = 'meld123'

const testEmailInvalid = 'test@test'
const testPasswordInvalid = 'meld1234'

describe('Login button', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  it('should be disabled on first visit', function() {
    cy.get('button').should('be.disabled')
  })

  it('should be disabled with only a valid email', function() {
    cy.get('#emailInput').type(testEmailValid)
    cy.get('button').should('be.disabled')
  })

  it('should be disabled with only a valid password', function() {
    cy.get('#passwordInput').type(testPasswordValid)
    cy.get('button').should('be.disabled')
  })

  it('should be disabled with an invalid email but valid password', function() {
    cy.get('#emailInput').type(testEmailInvalid)
    cy.get('#passwordInput').type(testPasswordValid)
    cy.get('button').should('be.disabled')
  })

  it('should be enabled with a valid email and any password', function() {
    cy.get('#emailInput').type(testEmailValid)
    cy.get('#passwordInput').type(testPasswordInvalid)
    cy.get('button').should('be.enabled')
  })
})

describe('Unsuccessful login', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  it('should display Error feedback on login attempt with invalid password', function() {
    cy.get('#emailInput').type(testEmailValid)
    cy.get('#passwordInput').type(testPasswordInvalid)
    cy.get('button').click()
    cy.get('.feedback').should('be.visible')
  })
})

describe('Successful login', function() {
  beforeEach(function() {
    cy.visit('/')
    cy.login(testEmailValid, testPasswordValid)
  })

  it('Shows x devices online header', function() {
    cy.get('h1').should('contain', 'Devices online')
  })

  it('Shows the devices', function() {
    cy.get('ul').should('exist')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500)
    cy.get('.device').should('not.have.length', 0)
  })

  it('Shows the toolbar buttons', function() {
    cy.findByText('Notify').should('exist')
    cy.findByText('Logout').should('exist')
  })

  it('Goes back to login screen after clicking logout', function() {
    cy.findByText('Logout').click()
    cy.findByText('Devices online').should('not.exist')
    cy.findAllByText('Login')
      .first()
      .should('exist')
  })
})
