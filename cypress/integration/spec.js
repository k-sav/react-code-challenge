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
