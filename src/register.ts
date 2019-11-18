import { Abstract } from "./abstract";

export const { mockAll, unmockAll, register } = (() => {
  const instances = [] as Array<Abstract>;
  let isMocking = false;

  return {
    register: (fn: Abstract) => {
      instances.push(fn);

      if (isMocking) {
        fn.mock();
      }

      if (!isMocking) {
        fn.unmock();
      }
    },
    mockAll: () => {
      isMocking = true;
      instances.forEach(fn => {
        fn.mock();
      });
    },
    unmockAll: () => {
      isMocking = false;
      instances.forEach(fn => {
        fn.unmock();
      });
    }
  };
})();
