export interface Abstract {
  mock(): Abstract;
  unmock(): Abstract;
  setMock(fn: Function): Abstract;
  setUnmock(fn: Function): Abstract;
  generateMock(...args): any;
  exec: Function;
  transformInput(fn: Function): Abstract;
  transformOutput(fn: Function): Abstract;
  createMockGenerator(fn: Function): Abstract;
}

export const abstract = (fn: Function): Abstract => {
  let mockFn = fn;
  let isMocking = false;
  let transformInput = input => input;
  let transformOutput = output => output;
  let onUnmock = () => {};
  let mockGenerator = (..._args) => ({});

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
      const result = isMocking
        ? mockFn(...args.map(transformInput))
        : fn(...args.map(transformInput));

      // Handle Async transforms
      if (result.then) {
        return result.then(transformOutput);
      }

      return transformOutput(result);
    },
    transformInput: transformInputFn => {
      transformInput = transformInputFn;
      return abstractResponse;
    },
    transformOutput: transformOutputFn => {
      transformOutput = transformOutputFn;
      return abstractResponse;
    },
    generateMock: (...args) => mockGenerator(...args),
    createMockGenerator: fn => {
      mockGenerator = fn;
      return abstractResponse;
    }
  };

  return abstractResponse;
};
