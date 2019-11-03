export const abstract = (fn: Function) => {
  let mockFn = fn;
  let isMocking = false;

  return {
    setMock: (mock: Function) => {
      mockFn = mock;
    },
    mock: () => {
      isMocking = true;
    },
    unmock: () => {
      isMocking = false;
    },
    exec: (...args) => {
      if (isMocking) {
        return mockFn(...args);
      }

      return fn(...args);
    }
  };
};
