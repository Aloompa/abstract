# Abstract

A tiny functional async abstraction tool.

## Installation

`npm i @aloompa/abstract -S`

or

`yarn add @aloompa/abstract --save`

## Usage

Full API documentation is forthcoming, but here is the essential flow.

```
import { abstract } from '@aloompa/abstract';

const getPerson = abstract(async (id) => {
    // ... Code to get the person from database

    return {
        id,
        name: 'Violet Beauregarde'
    };
});

getPerson.setMock(async (id) => {
    return {
        id,
        name: 'Grandpa Joe'
    };
});

// Mock is set, but not enabled
getPerson.exec('1'); // { "id": "1", "name": "Violet Beauregarde" }

// Enable mock
getPerson.mock();
getPerson.exec('1'); // { "id": "1", "name": "Grandpa Joe" }

// Disable the mock
getPerson.unmock();
```

### Mock All

For convenience in your test initialization, you can mock all the abstract functions at once using `mockAll`. Using this function, you don't have to worry about initializing every mock for each function.

```
import { mockAll, unmockAll } from '@aloompa/abstract';

mockAll(); // All the mocks are on

unmockAll(); // All the mocks are off
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
