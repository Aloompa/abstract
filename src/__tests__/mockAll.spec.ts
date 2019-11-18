import { abstract, mockAll, unmockAll } from "../";

describe("Mock All", () => {
  it("Should mock all of the tests", () => {
    const getVeruca = abstract(() => ({
      name: "Veruca Salt"
    })).setMock(() => ({
      name: "Veruca Aloompa"
    }));

    expect(getVeruca.exec().name).toEqual("Veruca Salt");

    mockAll();

    const getCharlie = abstract(() => ({
      name: "Charlie"
    })).setMock(() => ({
      name: "Charlie Bucket"
    }));

    expect(getVeruca.exec().name).toEqual("Veruca Aloompa");
    expect(getCharlie.exec().name).toEqual("Charlie Bucket");

    unmockAll();

    expect(getVeruca.exec().name).toEqual("Veruca Salt");
    expect(getCharlie.exec().name).toEqual("Charlie");
  });
});
