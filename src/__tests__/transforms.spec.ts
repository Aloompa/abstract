import { abstract } from "../index";

describe("Transforms", () => {
  it("Should transform input", () => {
    const getPerson = abstract(({ id }) => ({
      id,
      name: "Veruca Salt"
    }))
      .transformInput(({ personId }) => ({
        id: personId
      }))
      .setMock(({ id }) => ({
        id,
        name: "Charlie"
      }));

    const result = getPerson.exec({ personId: "1" });

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("Veruca Salt");
  });

  it("Should transform output", () => {
    const getPerson = abstract(({ id }) => ({
      id,
      name: "Veruca Salt"
    }))
      .transformOutput(res => ({
        ...res,
        personId: res.id
      }))
      .setMock(({ id }) => ({
        id,
        name: "Charlie"
      }));

    const result = getPerson.exec({ id: "1" });

    expect(result.personId).toEqual("1");
    expect(result.name).toEqual("Veruca Salt");
  });

  it("Should transform async output", async () => {
    const getPerson = abstract(async ({ id }) => ({
      id,
      name: "Veruca Salt"
    }))
      .transformOutput(res => ({
        ...res,
        personId: res.id
      }))
      .setMock(({ id }) => ({
        id,
        name: "Charlie"
      }));

    const result = await getPerson.exec({ id: "1" });

    expect(result.personId).toEqual("1");
    expect(result.name).toEqual("Veruca Salt");
  });
});
