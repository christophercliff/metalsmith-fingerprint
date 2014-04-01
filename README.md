# metalsmith-fingerprint

[![Build Status](https://travis-ci.org/christophercliff/metalsmith-fingerprint.png?branch=master)](https://travis-ci.org/christophercliff/metalsmith-fingerprint)

A [fingerprinting][fingerprinting] plugin for [Metalsmith][metalsmith].

## Installation

```
npm install metalsmith-fingerprint
```

## Usage

```js
var fingerprint = require('metalsmith-fingerprint')

Metalsmith(__dirname)
  .use(fingerprint(options))
  .build()
```

### Options

- **`match`** `String pattern|Array<String> pattern`

    A [pattern][multimatch] to filter source files. Required.

## Example

Let's say we want to convert `index.less` into CSS, then fingerprint the resulting CSS:

```js
Metalsmith()
    .use(less({ pattern: 'less/index.less' }))
    .use(fingerprint({ pattern: 'css/index.css' }))
    .use(template({ engine: 'handlebars' }))
    .build()
```

Fingerprint creates a `fingerprint` object on the Metalsmith metadata. This object is accessible in the template:

```handlebars
<link href="{{ fingerprint['css/index.css'] }}" rel="stylesheet" type="text/css" />
```

The rendered HTML will reference the fingerprinted file name:

```html
<link href="css/index-724af9dd72a48c18dd570790c2445fb4.css" rel="stylesheet" type="text/css" />
```

## Tests

```
$ npm test
```

## License

MIT License, see [LICENSE](https://github.com/christophercliff/metalsmith-fingerprint/blob/master/LICENSE.md) for details.

[fingerprinting]: http://guides.rubyonrails.org/asset_pipeline.html#what-is-fingerprinting-and-why-should-i-care-questionmark
[metalsmith]: http://www.metalsmith.io/
[multimatch]: https://github.com/sindresorhus/multimatch
