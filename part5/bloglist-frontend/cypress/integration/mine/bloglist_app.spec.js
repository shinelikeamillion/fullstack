const user = {
  username: 'cypress user',
  name: 'bot',
  password: 'nooneknows',
}
const someone = {
  username: 'someone',
  name: 'unknow',
  password: 'someoneknows',
}
describe('Blog app', function ()  {

  beforeEach(function () {
    cy.request('POST', '/api/testing/rest')
    cy.request('POST', '/api/users/', user)
    cy.request('POST', '/api/users/', someone)
    cy.visit('/')
  })

  describe('initial state', function ()  {
    beforeEach(function(){cy.visit('/')})
    it('front page can be opened', function ()  {
      cy.contains('Blogs')
    })
    it('login form is shown', function ()  {
      cy.get('#login_form').contains('Username')
      cy.get('#login_form').contains('Password')
    })
  })

  describe('logged in', function () {
    beforeEach(function(){cy.visit('/')})
    it('user can log in with correct info', function () {
      cy.get('#username').clear().type(user.username)
      cy.get('#password').clear().type(user.password)
      cy.get('#login').click()
      cy.contains(`${user.username} logged in`).contains('logout')
    })
    it('user can log in with wrong info', function () {
      cy.get('#username').clear().type(user.name)
      cy.get('#password').clear().type('nicetry')
      cy.get('#login').click()
      cy.get('#notification')
        .should('contain','invalid')
        .and('have.css', 'color', 'rgb(255, 69, 0)')
        .and('have.css', 'borderRadius', '5px')
      cy.get('html').should('not.contain','logout')
    })
  })

  describe('when logged in', function () {
    // we already test login upon, so use api is faster
    beforeEach(function () {
      cy.login(user)
    })

    it('auto login', function () {
      cy.contains(`${user.username} logged in`).contains('logout')
    })

    describe('blogs', function () {
      it('a blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('title')
        cy.get('#author').type('unknown')
        cy.get('#url').type('www.bot.com')
        cy.get('#create').click()

        cy.contains('added')
      })

      describe('and a blog exists', function() {
        beforeEach(function(){
          cy.createBlog({ title: 'first blog', author: 'unknown', url:'/' })
          cy.createBlog({ title: 'second blog', author: 'unknown', url:'/' })
          cy.createBlog({ title: 'third blog', author: 'unknown', url:'/' , likes: 3 })

          cy.visit('/')
        })
        it('one of those can be liked', function() {
          cy.contains('second blog')
            .parent()
            .contains('like')
            .click()
          cy.get('#notification').contains('you liked second blog')
          cy.contains('second blog').parent().contains('1')
        })

        it('user can delete the blob that he created', function() {
          cy.contains('third blog').parent().contains('delete').click()
          cy.get('#notification').contains('deleted')
          cy.get('html').should('not.contain', 'third blog')
        })

        it('all the blogs sortted by likes', function() {
          cy.get('.blog').then(($items) => {
            expect($items).to.have.length(3)
            expect($items.eq(0)).to.contain('first blog')
            expect($items.eq(1)).to.contain('second blog')
            expect($items.eq(2)).to.contain('third blog')
            cy.get('#sort').click().then(() => {
              cy.get('.blog').then(($b1) => {
                expect($b1.eq(1)).to.contain('first blog')
                expect($b1.eq(2)).to.contain('second blog')
                expect($b1.eq(0)).to.contain('third blog')
              })
            })
          })
        })

        describe('logout and someone logged in', function() {
          beforeEach(function() {
            cy.contains('logout').click()
            cy.login(someone)
          })
          it('someone can like the blog', function() {
            cy.contains('second blog')
              .parent()
              .contains('like')
              .click()
            cy.get('#notification').contains('you liked second blog')
          })
          it('but someone can not delete a bolg created by others', function() {
            cy.contains('second blog')
              .parent()
              .contains('delete')
              .click()
            cy.get('#notification').contains('no permission')
          })
        })
      })
    })
  })
})