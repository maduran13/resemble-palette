// palette.spec..js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
const url = 'https://maduran13.github.io/color-palette/';



describe('VRT Palette', () => {
    it('Test generate 2 different palettes', () => {
    let datetime = new Date().toISOString().replace(/:/g,".");
		cy.visit(url);
    cy.wait(100);
    cy.screenshot(`screenshots/${datetime}/take1`);
		cy.get('button[id="generate"]').click();
		cy.screenshot(`screenshots/${datetime}/take2`);
    })
})