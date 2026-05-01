# JavaScript — Destructuring, Spread & Rest

## What is Destructuring?
A shorthand syntax to **extract values** from arrays or objects directly into variables instead of accessing them one by one.

---

## Object Destructuring
Extract values from an object by matching **key names.**

- Curly braces `{ }` on the left side
- You can **rename** while extracting using `:`
- You can set **default values** using `=` for keys that don't exist
- You can go **nested** by chaining `:` inside the destructuring

```js
const { name, age } = user;                        // basic
const { name: fullName } = user;                   // rename
const { country = "Pakistan" } = user;             // default value
const { address: { city } } = user;                // nested
```

---

## Array Destructuring
Extract values from an array by **position.**

- Square brackets `[ ]` on the left side
- Order matters  first variable gets first element
- Skip elements using an **empty comma**
- Default values work the same way as objects

```js
const [first, second] = colors;       // basic
const [first, , third] = colors;      // skip element
const [a = "default"] = arr;          // default value
```

---

## Spread Operator
Takes an existing array or object and **expands** it into a new one.

- Always on the **right side** of `=`
- Used for copying, merging and overriding
- Later keys **override** earlier ones
- Copies are **shallow**  nested objects are still referenced

```js
const copy = { ...original };                        // copy object
const merged = { ...obj1, ...obj2 };                 // merge objects
const updated = { ...original, price: 99 };          // override field
const arrCopy = [...original];                       // copy array
const arrMerged = [...arr1, ...arr2];                // merge arrays
Math.max(...nums);                                   // spread as function args
```

---

## Rest Operator
**Collects** remaining elements into an array. Opposite of spread.

- Always on the **left side** of `=`
- Must always be **last**  nothing can come after it
- Works in arrays, objects and function parameters

```js
const [first, ...rest] = array;           // array rest
const { name, ...others } = object;       // object rest
function sum(...nums) { }                 // function rest
```

---

## Core Differences

  Destructuring | Spread | Rest |

 **Purpose** | Extract values out | Expand values in | Collect remaining |
 **Side of `=`** | Left | Right | Left |
 **Symbol** | `{ }` or `[ ]` | `...` | `...` |

---

## Most Important Rules

> - Arrays always use `[ ]` objects always use `{ }` never mix them
> - Spread **creates something new** destructuring **pulls from something existing**
> - Rest must always be **last** nothing can come after it
> - Spread makes **shallow copies** only deeply nested data is still linked to original
> - In function calls spread unpacks an array into **individual arguments**

---

## Where You'll Use This Daily

- Extracting data from API responses
- Updating state in React without mutating original
- Merging config or settings objects
- Passing array values as function arguments
- Collecting unknown number of arguments in functions