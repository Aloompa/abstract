# Abstract

A tiny functional async abstraction tool.

## Why Abstract?

This library is designed to wrap around your side effects to make them easily mockable and testable. Nobody wants to write unit tests that directly interact with a database or a payment processor. Abstract lets you create an _abstraction_ around your third-party and asyncronous interactions so that you can mock out the functionality in the same scope as your real API calls, (even in the same file). Then you can turn the mocks on and off as needed to create the ideal testing environment where you can test your business logic against a consistent API to what you will be exposing in a true production environment.

## Installation

`npm i @aloompa/abstract -S`

or

`yarn add @aloompa/abstract --save`

## Example Usage

```javascript
import { abstract } from "@aloompa/abstract";

const getPerson = abstract(async id => {
  // ... Code to get the person from database

  return {
    id,
    name: "Violet Beauregarde"
  };
});

getPerson.setMock(async id => {
  return {
    id,
    name: "Grandpa Joe"
  };
});

// Mock is set, but not enabled
getPerson.exec("1"); // { "id": "1", "name": "Violet Beauregarde" }

// Enable mock
getPerson.mock();
getPerson.exec("1"); // { "id": "1", "name": "Grandpa Joe" }

// Disable the mock
getPerson.unmock();
```

## API Docs

Read the [Full API Docs](/docs/API.md) here.

## Typescript

Abstract comes with Typescript definitions, but to make the library truly useful, you'll want to extend the Abstract interface with your own inputs and outputs.

```javascript
import { abstract, Abstract } from "@aloompa/abstract";

interface PersonResult {
  id: string;
  name: string;
}

interface GetPersonById extends Abstract {
  exec(id: string): Promise<PersonResult>;
}

const getPersonById: GetPersonById = abstract(async id =>
  Promise.resolve({
    id,
    name: "Willy Wonka"
  })
);

getPersonById.exec("1");
```

## Contributing

We encourage you to contribute to Abstract by submitting bug reports and pull requests through [Github](http//github.com).

## License

Abstract is released under The [MIT License](http://www.opensource.org/licenses/MIT) (MIT)

Copyright (c) [2019][aloompa llc]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
