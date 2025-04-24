/**
 * @jest-environment jsdom
 */

describe('index.html structure', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <nav id="navbar"></nav>
      <div id="treemap"></div>
      <div id="index-selector"></div>
      <footer id="footer"></footer>
    `;
  });

  it('should have a navbar', () => {
    expect(document.getElementById('navbar')).not.toBeNull();
  });

  it('should have a treemap container', () => {
    expect(document.getElementById('treemap')).not.toBeNull();
  });

  it('should have an index selector', () => {
    expect(document.getElementById('index-selector')).not.toBeNull();
  });

  it('should have a footer', () => {
    expect(document.getElementById('footer')).not.toBeNull();
  });
});
