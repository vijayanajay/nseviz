/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/frontend/cypress/',
    '\\*.cy.js$'
  ],
};

module.exports = config;
