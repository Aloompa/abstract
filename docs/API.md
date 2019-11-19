# API

## abstract (Function) : AbstractObject

The main abstract function takes a function as its only argument. The function that is provided may be either sync or async, but it should eventually resolve a response. When you wrap an `abstract` around a function, the function may be called using `referenceName.exec()`. The `exec` method can take arguments, which will be passed into the function that is wrapped.

### Usage:

```javascript
import { abstract } from "@aloompa/abstract";

const apiCall = abstract(() => {
  // ... return something
});

apiCall.exec();
```

##### Returns

- [exec](#execargs--any)
- [getMock](#getmock--function)
- [mock](#mock--abstractobject)
- [setMock](#setmock-function---abstractobject)
- [transformInput](#transforminputfunction--abstractobject)
- [transformOutput](#transformoutputfunction--abstractobject)
- [unmock](#unmock--abstractobject)

### AbstractObject Methods

The abstract response provides several methods both for manipulating the input and output data and for setting up and tearing down mocks. While `exec()` is typically the only method you'll need to call outside of testing, you will find that all of these will be useful.

#### exec(...args) : any

This is your primary function for executing your wrapped abstract function or mock. This function can accept any number of arguments and return any data type.

For example:

```javascript
import { abstract } from "@aloompa/abstract";

const apiCall = abstract((id, firstName, lastName) => ({
  id,
  firstName,
  lastName
}));

apiCall.exec(1, "Willy", "Wonka"); // { id: 1, firstName: "Willy", lastName: "Wonka" }
```

The main thing to keep in mind is that `.exec()` will typically be an asyncronous function if you are interacting with databases or third-party libraries. It may be used as a promise or with async/await.

For example, using async/await:

```javascript
import { abstract } from "@aloompa/abstract";

const doAThing = async () => {
  const apiCall = abstract(() => Promise.resolve("Success"));

  const data = await apiCall.exec();

  return data; // "Success"
};
```

Remember that `.exec()` will return either the real function or the mocked function depending on whether mocks are enabled with `.mock()` or `mockAll()`.

#### getMock() : Function

Returns the currently set mocking function. This can be useful if you want to override it in a single test and then reset it to the default afterwards. To accomplish that, you simply need to save off a reference to the original function, override it and then set it back when you're done.

```javascript
import { abstract } from "@aloompa/abstract";

const apiCall = abstract(() => "Real Success").setMock(() => "Mocked Success");

apiCall.mock();

const apiCallMock = apiCall.getMock();

apiCall.setMock(() => "Mocked Error");

apiCall.exec(); // "Mocked Error"

// Restore mock
apiCall.setMock(apiCallMock);

apiCall.exec(); // "Mocked Success"
```

#### mock() : AbstractObject

Turns on the mocking function so that `.exec()` will return the mock instead of the original function.

```javascript
import { abstract } from "@aloompa/abstract";

const apiCall = abstract(() => {
  return "Real";
}).setMock(() => {
  return "Mocked";
});

apiCall.exec(); // "Real"

apiCall.mock().exec(); // "Mocked"
```

#### setMock( Function ) : AbstractObject

Accepts a mocking function. In most testing scenarios, it is expected that the function you pass in will have the same public API as the unmocked version you passed into `abstract()`. This means that given the same inputs, it should return the same outputs.

How you will handle this will vary depending on the public API you are mocking, but let's pretend for a moment that you are mocking a call to your database. You might wrap an abstract around a SQL query like this:

```javascript
import { abstract } from "@aloompa/abstract";

const getWidgetById = abstract(async id => {
  const [result] = await sequelize.query(
    `select * from widgets where id ${id}`
  );

  return result;
});

getWidgetById.exec("1"); // { id: "1", name: "My Widget" }
```

You could add a `setMock` to your abstract chain like this:

```javascript
import { abstract } from "@aloompa/abstract";

const getWidgetById = abstract(async id => {
  const [result] = await sequelize.query(
    `select * from widgets where id ${id}`
  );
  return result;
}).setMock(async id => {
  return Promise.resolve({
    id,
    name: "My Widget"
  });
});

getWidgetById.exec("1");
```

Now, if you were to call `getWidgetById.mock()`, the `getWidgetById.exec("1")` would call the mocked function instead of the original abstract function.

A best practice with Abstract is to keep your mocks as close to your real API as possible so that if there is a change to the public API, you will remember to reflect the change in both places. This coupling between the mock function and real function can be enhanced using Typescript.

#### transformInput(Function) : AbstractObject

Provide a function to transform the data inputted into your `abstract.exec()` before it is passed into the abstract function or mock.

This is a great place to place any business logic that you want to ensure gets tested, but that is also part of your data wrapper.

```javascript
import { abstract } from "@aloompa/abstract";

const getWidgetById = abstract(({ id }) => ({
  id,
  name: "Widget1"
}))
  // Turn the string id into an object with id
  .transformInput(id => ({
    id
  }));

getWidgetById.exec("1");
```

#### transformOutput(Function) : AbstractObject

Provide a function to transform the data outputted from your `abstract.exec()`.

This is a great place to place any business logic that you want to ensure gets tested, but that is also part of your data wrapper.

```javascript
import { abstract } from "@aloompa/abstract";

const getPersonById = abstract(id => ({
  id,
  firstName: "Willy",
  lastName: "Wonka"
}))
  // Turn the string id into an object with id
  .transformOutput(person => ({
    ...person,
    fullName: `${person.firstName} ${person.lastName}`
  }));

getPersonById.exec("1"); // { id: "1", firstName: "Willy", lastName: "Wonka", fullName: "Willy Wonka" }
```

#### unmock() : AbstractObject

Turns off the mocking function so that `.exec()` will return the real function instead of the mock.

```javascript
import { abstract } from "@aloompa/abstract";

const apiCall = abstract(() => "Real").setMock(() => "Mocked");

apiCall.mock();

apiCall.exec(); // "Mocked"

apiCall.unmock();

apiCall.exec(); // "Real"
```

## mockAll () : void

Turns on the mocks for all of the registered abstract functions.

```javascript
import { abstract, mockAll } from "@aloompa/abstract";

mockAll();

const apiCall = abstract(() => "Real").setMock(() => "Mocked");

apiCall.exec(); // "Mocked"
```

## unmockAll () : void

Turns off the mocks for all of the registered abstract functions.

```javascript
import { abstract, unmockAll } from "@aloompa/abstract";

mockAll();

const apiCall = abstract(() => "Real").setMock(() => "Mocked");

unmockAll();

apiCall.exec(); // "Real"
```
