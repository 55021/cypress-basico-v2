// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
	beforeEach(() => {
		cy.visit('./src/index.html');
	});

	describe('aula 1', () => {
		it.only('verifica o título da aplicação', () => {
			cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
		});

		it('preenche os campos obrigatórios e envia o formulário', () => {
			// Preencher os campos obrigatórios
			cy.get('#firstName').type('Nome de teste');
			cy.get('#lastName').type('Sauro');
			cy.get('#email').type('fulano@sauro.com');
			cy.get('#open-text-area').type('habla mesmo');

			// Submeter o formulário
			cy.get('button[type="submit"]').contains('Enviar').click();

			// Verificar a mensagem de êxito
			cy.get('.success').should('be.visible');
		});

		it('testar opção de delay', () => {
			cy.get('#open-text-area').type('habla mesmo');
			cy.get('#open-text-area')
				.type('{selectall}{backspace}')
				.type(
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					{ delay: 0 }
				);
		});

		it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
			cy.get('#firstName').type('Nome de teste');
			cy.get('#lastName').type('Sauro');
			cy.get('#email').type('fulano.com');

			cy.get('button[type="submit"]').contains('Enviar').click();
			cy.get('.error').should('be.visible');
		});

		it('campo telefone deve aceitar somente números', () => {
			cy.get('#phone').type('oie').should('have.value', '');
		});

		it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
			cy.get('#firstName').type('Nome de teste');
			cy.get('#lastName').type('Sauro');
			cy.get('#email').type('fulano@sauro.com');
			cy.get('#open-text-area').type('habla mesmo');
			cy.get('#phone-checkbox').click();
			cy.get('button[type="submit"]').contains('Enviar').click();
			cy.get('.error').should('be.visible');
		});

		it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
			cy.get('#firstName')
				.type('Nome de teste')
				.should('have.value', 'Nome de teste')
				.clear()
				.should('have.value', '');
			cy.get('#lastName')
				.type('Sauro')
				.should('have.value', 'Sauro')
				.clear()
				.should('have.value', '');
			cy.get('#email')
				.type('fulano@sauro.com')
				.should('have.value', 'fulano@sauro.com')
				.clear()
				.should('have.value', '');
			cy.get('#open-text-area')
				.type('habla mesmo')
				.should('have.value', 'habla mesmo')
				.clear()
				.should('have.value', '');
		});

		it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
			cy.contains('button[type="submit"]', 'Enviar').click();
			cy.get('.error').should('be.visible');
		});

		it('envia o formuário com sucesso usando um comando customizado', () => {
			cy.fillMandatoryFieldsAndSubmit();
		});
	});

	describe('aula 2', () => {
		it.only('seleciona um produto (YouTube) por seu texto', () => {
			cy.get('#product').select('YouTube');
			cy.get('#product').should('have.value', 'youtube');
		});

		it('seleciona um produto (Mentoria) por seu valor (value)', () => {
			cy.get('#product').select('mentoria');
			cy.get('#product').should('have.value', 'mentoria');
		});

		it('seleciona um produto (Blog) por seu índice', () => {
			cy.get('#product').select(1);
			cy.get('#product').should('have.value', 'blog');
		});
	});

	describe('aula 3', () => {
		it('marca o tipo de atendimento "Feedback"', () => {
			cy.get('input[type="radio"][value="feedback"]').check();
			cy.get('input[type="radio"][value="feedback"]').should('be.checked');
		});

		it('marca cada tipo de atendimento', () => {
			cy.get('input[type="radio"]')
				.should('have.length', 3)
				.each(($radio) => {
					cy.wrap($radio).check();
					cy.wrap($radio).should('be.checked');
				});
		});
	});

	describe('aula 4', () => {
		it('marca ambos checkboxes, depois desmarca o último', () => {
			cy.get('input[type="checkbox"]').as('checkboxes').check(); // Recebe todos os input checkbox e marca todos.
			cy.get('@checkboxes').each((checkbox) =>
				cy.wrap(checkbox).should('be.checked')
			);
		});
	});

	describe('aula 5', () => {
		it('seleciona um arquivo da pasta fixtures', () => {
			cy.get('input[type="file"]')
				.should('not.have.value')
				.selectFile('cypress/fixtures/example.json')
				.should((input) => {
					expect(input[0].files[0].name).to.be.eq('example.json');
				});
		});
		
		it('seleciona um arquivo simulando um drag-and-drop', () => {
			cy.get('input[type="file"]')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
			.should((input) => {
				expect(input[0].files[0].name).to.be.eq('example.json');
			});
		});
		
		it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
			cy.fixture('example.json').as('fileName')
			cy.get('input[type="file"]')
				.should('not.have.value')
				.selectFile('@fileName')
				.should((input) => {
					expect(input[0].files[0].name).to.be.eq('example.json');
				});
		});
	});

	describe('aula 6', () => {
		it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
			cy.get('a[target="_blank"]').should('exist')
		});
		
		it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
			cy.get('a')
				.invoke('removeAttr', 'target')
				.click()
		});
	});
});
