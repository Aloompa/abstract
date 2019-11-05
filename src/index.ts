export const abstract = (fn: Function) => {
  let mockFn = fn;
  let isMocking = false;
  let onUnmock = () => {};

  const abstractResponse = {
    setMock: (mock: Function) => {
      mockFn = mock;
      return abstractResponse;
    },
    mock: () => {
      isMocking = true;
      return abstractResponse;
    },
    unmock: () => {
      isMocking = false;
      onUnmock();
      return abstractResponse;
    },
    setUnmock: unmockFn => {
      onUnmock = unmockFn;
      return abstractResponse;
    },
    exec: (...args) => {
      if (isMocking) {
        return mockFn(...args);
      }

      return fn(...args);
    }
  };

  return abstractResponse;
};
