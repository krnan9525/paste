import {
  eyesAreEnabled,
  prepareForEyes,
  DEFAULT_CHECK_PARAMS,
  DEFAULT_OPEN_PARAMS,
} from '../../support/utils/applitools';

// ℹ️ If we use anon functions instead of arrow functions, we can leverage Mocha's context and pull the test name directly from this
describe('Landing Page', function () {
  // ℹ️ We are able to reference `this.title` because we have bound this describe block to the Cypress context.
  const testSuiteName = this.title;

  describe('Visual regression tests', () => {
    it('Basic VRT', () => {
      cy.log('[Applitools]: checking if eyes are enabled');

      if (eyesAreEnabled()) {
        cy.log('[Applitools]: Eyes are enabled, proceed with eyes check.');

        cy.visit('/');
        cy.wait(2000);

        prepareForEyes();

        const openParams: Partial<Eyes.Open.Options> = {
          ...DEFAULT_OPEN_PARAMS,
          testName: testSuiteName,
        };

        cy.log(`starting eyes with these params: ${openParams}`);

        cy.eyesOpen(openParams);

        const checkParams: Partial<Eyes.Check.Options> = {
          ...DEFAULT_CHECK_PARAMS,
          tag: `${testSuiteName}-landing-page-check`,
        };

        cy.log(`[Applitools]: Checking window with these params: ${checkParams}`);

        cy.eyesCheckWindow(checkParams);

        cy.eyesClose();
      } else {
        cy.log('[Applitools]: Eyes not enabled, skipping eyes check');
      }
      expect(true).to.equal(true);
    });
  });
});
