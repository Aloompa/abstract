import { abstract } from "../index";

describe("Abstract Async", () => {
  const getAsyncPerson = abstract(
    ({ id }) =>
      new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve({
            id,
            name: "Willy Wonka"
          });
        }, 1000);
      })
  );

  getAsyncPerson.setMock(
    ({ id }) =>
      new Promise((resolve, _reject) => {
        setTimeout(() => {
          resolve({
            id,
            name: "Mike Teevee"
          });
        }, 1000);
      })
  );

  it("Should use the async function as usual", async () => {
    const result = await getAsyncPerson.exec({ id: "123" });

    expect(result.id).toEqual("123");
    expect(result.name).toEqual("Willy Wonka");
  });

  it("Should mock the async function", async () => {
    getAsyncPerson.mock();
    const result = await getAsyncPerson.exec({ id: "123" });

    expect(result.id).toEqual("123");
    expect(result.name).toEqual("Mike Teevee");
    getAsyncPerson.unmock();
  });
});
