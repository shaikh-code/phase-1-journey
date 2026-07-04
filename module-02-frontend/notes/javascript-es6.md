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


# Promises

## What is a Promise?

A Promise is a JavaScript object that represents the result of an asynchronous operation.

It acts as a placeholder for a value that may not be available immediately.

---

# Promise States

A Promise can be in one of three states:

- Pending
- Fulfilled
- Rejected

Once fulfilled or rejected, its state cannot change.

---

# Promise Flow

```text
Create Promise
      ↓
Pending
      ↓
Completed Successfully
      ↓
Fulfilled

OR

Pending
      ↓
Something Failed
      ↓
Rejected
```

---

# Why Promises?

Promises solve many problems caused by nested callbacks.

They make asynchronous code easier to read and organize.

---

# Handling Promises

A Promise can be handled using:

- `.then()`
- `.catch()`
- `async/await`

---

# Advantages

- Cleaner than callbacks.
- Better error handling.
- Easier to chain asynchronous operations.

---

# Key Takeaways

- A Promise represents future data.
- It is not the data itself.
- `await` pauses execution until the Promise settles.

# Async / Await

## What is async?

The `async` keyword makes a function return a Promise automatically.

It allows asynchronous code to be written in a more readable way.

---

# What is await?

`await` pauses the execution of an async function until a Promise is resolved.

It can only be used inside an `async` function.

---

# Execution Flow

```text
Call async function
        ↓
Runs until await
        ↓
Pause current function
        ↓
Other JavaScript continues running
        ↓
Promise resolves
        ↓
Function resumes
```

---

# Why async/await?

It makes asynchronous code look similar to synchronous code while keeping JavaScript non-blocking.

---

# Advantages

- Easier to read.
- Easier to debug.
- Works naturally with `try/catch`.

---

# Key Takeaways

- `async` creates a Promise-returning function.
- `await` waits for a Promise to finish.
- It improves readability but does not make code synchronous.


# try...catch

## What is try...catch?

`try...catch` is used to handle errors without stopping the entire program.

It allows applications to fail gracefully and continue running when possible.

---

# Structure

```text
try
    ↓
Run code
    ↓
No Error
    ↓
Continue

OR

try
    ↓
Error Occurs
    ↓
catch
    ↓
Handle Error
```

---

# Why use try...catch?

Unexpected errors can occur during asynchronous operations, API requests, or invalid code execution.

Instead of crashing the application, errors can be handled in one place.

---

# Common Uses

- API requests
- Async functions
- Parsing JSON
- File operations
- Database operations

---

# Advantages

- Prevents application crashes.
- Makes debugging easier.
- Provides a better user experience.

---

# Key Takeaways

- Place risky code inside `try`.
- Handle errors inside `catch`.
- Works especially well with `async/await`.



# Fetch API

## What is Fetch API?

The Fetch API is a built-in JavaScript API used to send HTTP requests and receive responses from a server. It is Promise-based, making it easy to work with asynchronous operations using `async/await`.

---

# fetch()

`fetch()` starts an HTTP request and immediately returns a Promise. It does not return the response data directly.

```js
const response = await fetch(url);
```

---

# Response Object

The Response object represents the server's response. It contains information such as the status code, headers, and the response body.

Some commonly used properties are:

- `status`
- `ok`
- `headers`

The actual data is still inside the response body and must be parsed before it can be used.

---

# response.json()

`response.json()` reads the response body and converts JSON data into a JavaScript object.

Since parsing takes time, it also returns a Promise.

```js
const data = await response.json();
```

---

# GET Request

A GET request is used to retrieve data from a server.

If no request method is specified, `fetch()` uses GET by default.

---

# POST Request

A POST request is used to send new data to a server.

When sending JavaScript objects, the request body should first be converted into JSON using `JSON.stringify()`.

---

# Headers

Headers provide additional information about the request or response.

When sending JSON data, the most common header is:

```js
headers: {
  "Content-Type": "application/json"
}
```

This tells the server that the request body contains JSON.

---

# JSON.stringify()

`JSON.stringify()` converts a JavaScript object into a JSON string before it is sent to the server.

Without this conversion, JavaScript objects cannot be sent correctly in the request body.

---

# response.ok

`response.ok` indicates whether the HTTP request was successful.

It is commonly used to detect HTTP errors such as 404 or 500 because these responses do not automatically throw an error.

---

# try/catch

`try/catch` is used to handle errors while working with asynchronous code.

It catches network failures, parsing errors, and any errors that are thrown manually inside the `try` block.

---

# Promise.all()

`Promise.all()` runs multiple asynchronous operations at the same time.

It waits until every Promise is resolved and then returns all results together. If any Promise rejects, the entire operation rejects.

---

# Request–Response Flow

```text
fetch(  )↓
Promise<Response>
 ↓
await
 ↓
Response Object
 ↓
response.json()
 ↓
Promise
 ↓
await
 ↓
JavaScript Object
```

---

# Sending Data

```text
JavaScript Object
  ↓
JSON.stringify()
  ↓
JSON
  ↓
Server
```

---

# Receiving Data

```text
Server
  ↓
JSON
  ↓
response.json()
  ↓
JavaScript Object
```