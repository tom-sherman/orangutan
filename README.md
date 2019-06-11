# Orangutan

> o-range-utan

A lazy range and list library for JavaScript. Heavily inspired by Haskell's lists and range syntax.

## Requirements

Orangutan is currently distributed as an ES6 module using native iterators and generators. This means your environment must support `function*` and `import`/`export` syntax constructs.

## Haskell vs Orangutan

There are many parallels between Orangutan and Haskell's lists/ranges

### Ranges

```js
// [1, 3..20]
range(1, 3, 20)

// [1..5]
range(1, undefined, 5)

// [3..]
range(3)
```
