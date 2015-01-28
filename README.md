# metalsmith-fingerprint

[![Build Status](https://travis-ci.org/christophercliff/metalsmith-fingerprint.png?branch=master)](https://travis-ci.org/christophercliff/metalsmith-fingerprint)

A [fingerprint][fingerprint] plugin for [Metalsmith][metalsmith].

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

- **`match`** `String|Array<String>`

    A [pattern][multimatch] to filter source files. Required.

## Example

Say you want to fingerprint the file `css/index.css`:

```js
Metalsmith(__dirname)
  .use(fingerprint({ pattern: 'css/index.css' }))
  .use(template({ engine: 'handlebars' }))
  .build()
```

The plugin does two things:

1. create a duplicate of `index.css` with a fingerprinted filename
2. create a `fingerprint` object on the Metalsmith metadata

The `fingerprint` object is accessible from the Handlebars template:

```html
<link href="{{ fingerprint.[css/index.css] }}" rel="stylesheet" type="text/css" />
```

And the template renders the fingerprinted filename:

```html
<link href="css/index-724af9dd72a48c18dd570790c2445fb4.css" rel="stylesheet" type="text/css" />
```

## Tests

```
$ npm test
```

## License

See [LICENSE](https://github.com/christophercliff/metalsmith-fingerprint/blob/master/LICENSE.md).

[fingerprint]: http://guides.rubyonrails.org/asset_pipeline.html#what-is-fingerprinting-and-why-should-i-care-questionmark
[metalsmith]: http://www.metalsmith.io/
[multimatch]: https://github.com/sindresorhus/multimatch
