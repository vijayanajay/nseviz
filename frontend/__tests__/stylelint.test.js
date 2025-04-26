const { execSync } = require('child_process');

describe('Stylelint', () => {
  it('all CSS files should pass Stylelint', () => {
    // Run stylelint synchronously on all CSS files in frontend/
    // Will throw if lint fails, causing test to fail
    execSync('npx stylelint "frontend/*.css"', { stdio: 'inherit' });
  });
});
