Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Nome de teste');
		cy.get('#lastName').type('Sauro');
		cy.get('#email').type('fulano@sauro.com');
		cy.get('#open-text-area').type('habla mesmo');
		cy.get('button[type="submit"]').contains('Enviar').click();
		cy.get('.success').should('be.visible');
})