
Orangutan
=========

> o-range-utan

A lazy range and list library for JavaScript. Heavily inspired by Haskell's lists and range syntax.

Haskell vs Orangutan
--------------------

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

## Index

### Type aliases

* [MapCallback](#mapcallback)
* [PartialRangeFactory](#partialrangefactory)
* [Range](#range)
* [RangeFactory](#rangefactory)

### Functions

* [arrToRange](#arrtorange)
* [arrToRangeFactory](#arrtorangefactory)
* [concat](#concat)
* [cycle](#cycle)
* [drop](#drop)
* [entries](#entries)
* [longerThan](#longerthan)
* [map](#map)
* [nonEmpty](#nonempty)
* [range](#range)
* [rangeFactory](#rangefactory)
* [splitAt](#splitat)
* [take](#take)

---

## Type aliases

<a id="mapcallback"></a>

###  MapCallback

**Ƭ MapCallback**: *`function`*

*Defined in [range-factory.ts:105](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L105)*

#### Type declaration
▸(element: *`number`*, index: *`number`*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| element | `number` |
| index | `number` |

**Returns:** `any`

___
<a id="partialrangefactory"></a>

###  PartialRangeFactory

**Ƭ PartialRangeFactory**: *`function`*

*Defined in [util.ts:6](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L6)*

A function that is returned from other range factory methods.

#### Type declaration
▸(factory: *[RangeFactory](#rangefactory)*): [RangeFactory](#rangefactory)

**Parameters:**

| Name | Type |
| ------ | ------ |
| factory | [RangeFactory](#rangefactory) |

**Returns:** [RangeFactory](#rangefactory)

___
<a id="range"></a>

###  Range

**Ƭ Range**: *`IterableIterator`<`number`>*

*Defined in [util.ts:1](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L1)*

___
<a id="rangefactory"></a>

###  RangeFactory

**Ƭ RangeFactory**: *`function`*

*Defined in [util.ts:2](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L2)*

#### Type declaration
▸(): [Range](#range)

**Returns:** [Range](#range)

___

## Functions

<a id="arrtorange"></a>

### `<Const>` arrToRange

▸ **arrToRange**(array: *`number`[]*): [Range](#range)

*Defined in [util.ts:17](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L17)*

Converts an array to an iterator.

**Parameters:**

| Name | Type |
| ------ | ------ |
| array | `number`[] |

**Returns:** [Range](#range)

___
<a id="arrtorangefactory"></a>

### `<Const>` arrToRangeFactory

▸ **arrToRangeFactory**(array: *`number`[]*): [RangeFactory](#rangefactory)

*Defined in [util.ts:11](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L11)*

Converts an array to a generator.

**Parameters:**

| Name | Type |
| ------ | ------ |
| array | `number`[] |

**Returns:** [RangeFactory](#rangefactory)

___
<a id="concat"></a>

### `<Const>` concat

▸ **concat**(...factories: *[RangeFactory](#rangefactory)[]*): [RangeFactory](#rangefactory)

*Defined in [range-factory.ts:83](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L83)*

Concat multiple ranges together.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` factories | [RangeFactory](#rangefactory)[] |

**Returns:** [RangeFactory](#rangefactory)

___
<a id="cycle"></a>

### `<Const>` cycle

▸ **cycle**(factory: *[RangeFactory](#rangefactory)*): [RangeFactory](#rangefactory)

*Defined in [range-factory.ts:33](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L33)*

Repeats a range indefinitely.

**Parameters:**

| Name | Type |
| ------ | ------ |
| factory | [RangeFactory](#rangefactory) |

**Returns:** [RangeFactory](#rangefactory)

___
<a id="drop"></a>

### `<Const>` drop

▸ **drop**(n: *`number`*): [PartialRangeFactory](#partialrangefactory)

*Defined in [range-factory.ts:52](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L52)*

Discards (drops) `n` elements from the start of the range.

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** [PartialRangeFactory](#partialrangefactory)

___
<a id="entries"></a>

### `<Const>` entries

▸ **entries**(factory: *[RangeFactory](#rangefactory)*): `entriesGen`

*Defined in [range-factory.ts:96](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L96)*

Yields an array of the element and the index. \[i, element\] Similar to `Array.prototype.entries`.

**Parameters:**

| Name | Type |
| ------ | ------ |
| factory | [RangeFactory](#rangefactory) |

**Returns:** `entriesGen`

___
<a id="longerthan"></a>

### `<Const>` longerThan

▸ **longerThan**(n: *`number`*): `(Anonymous function)`

*Defined in [util.ts:22](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L22)*

Checks if a range is longer than `n`

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `(Anonymous function)`

___
<a id="map"></a>

### `<Const>` map

▸ **map**(cb: *[MapCallback](#mapcallback)*): [PartialRangeFactory](#partialrangefactory)

*Defined in [range-factory.ts:116](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L116)*

Maps over every element in the array. Similar to `Array.prototype.map`.

An example of an infinite range of repeating 1s and 0s:

```typescript
map(x => x % 2)(range(1))
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| cb | [MapCallback](#mapcallback) |

**Returns:** [PartialRangeFactory](#partialrangefactory)

___
<a id="nonempty"></a>

### `<Const>` nonEmpty

▸ **nonEmpty**(factory: *[RangeFactory](#rangefactory)*): `boolean`

*Defined in [util.ts:43](https://github.com/tom-sherman/orangutan/blob/2895786/lib/util.ts#L43)*

Checks if a range is not empty ie. has elements.

**Parameters:**

| Name | Type |
| ------ | ------ |
| factory | [RangeFactory](#rangefactory) |

**Returns:** `boolean`

___
<a id="range"></a>

###  range

▸ **range**(first: *`number`*, second?: *`undefined` \| `number`*, last?: *`number`*): [Range](#range)

*Defined in [range.ts:3](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range.ts#L3)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| first | `number` | - |
| `Optional` second | `undefined` \| `number` | - |
| `Default value` last | `number` |  Infinity |

**Returns:** [Range](#range)

___
<a id="rangefactory"></a>

### `<Const>` rangeFactory

▸ **rangeFactory**(first: *`number`*, second?: *`undefined` \| `number`*, last?: *`undefined` \| `number`*): [RangeFactory](#rangefactory)

*Defined in [range-factory.ts:4](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L4)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| first | `number` |
| `Optional` second | `undefined` \| `number` |
| `Optional` last | `undefined` \| `number` |

**Returns:** [RangeFactory](#rangefactory)

___
<a id="splitat"></a>

### `<Const>` splitAt

▸ **splitAt**(n: *`number`*): `(Anonymous function)`

*Defined in [range-factory.ts:74](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L74)*

Split the range at `n`, yielding the left side followed by the right side.

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** `(Anonymous function)`

___
<a id="take"></a>

### `<Const>` take

▸ **take**(n: *`number`*): [PartialRangeFactory](#partialrangefactory)

*Defined in [range-factory.ts:13](https://github.com/tom-sherman/orangutan/blob/2895786/lib/range-factory.ts#L13)*

Takes the first n elements from a range.

**Parameters:**

| Name | Type |
| ------ | ------ |
| n | `number` |

**Returns:** [PartialRangeFactory](#partialrangefactory)

___

