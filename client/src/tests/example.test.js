// this is an example jest unit test (remove the x before describe, then run it in the terminal with npm test)
xdescribe('true is truthy and false is falsy', () => {
  test('true is truthy', () => {
    expect(true).toBe(true);
  });

  test('false is falsy', () => {
    expect(false).toBe(false);
  });
});