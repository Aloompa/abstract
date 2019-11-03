import { abstract } from "../index";

describe("Abstract Sync", () => {
  const getPerson = abstract(id => ({
    id,
    name: "Veruca Salt"
  }));

  getPerson.setMock(id => ({
    id,
    name: "Charlie"
  }));

  it("Should use the function as usual", () => {
    const result = getPerson.exec("1");

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Veruca Salt");
  });

  it("Should allow the function to be mocked", () => {
    getPerson.mock();

    const result = getPerson.exec("1");

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Charlie");
    getPerson.unmock();
  });

  it("Should be possible to override the mock", () => {
    getPerson.mock();

    getPerson.setMock(id => ({
      id,
      name: "Augustus Gloop"
    }));

    const result = getPerson.exec("1");

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Augustus Gloop");
    getPerson.unmock();
  });

  it("Should chain everything but exec", () => {
    const result = getPerson
      .unmock()
      .mock()
      .setMock(id => ({
        id,
        name: "Augustus Gloop"
      }))
      .exec("1");

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Augustus Gloop");
  });
});
