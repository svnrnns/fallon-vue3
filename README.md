# Fallon

Fallon is a package designed to enhance the local storage experience in Vue 3 applications. It offers an easy-to-use API and incorporates several exciting features, including:

- Automatic serialization and deserialization of objects.
- Adding reactivity to any action performed by the package itself.

## Table of Contents

- [Features](#features)
- [Install](#installation)
- [Usage](#usage)
- [Object serialization](#object-serialization)
- [How Reactivity works](#how-reactivity-works)
- [API](#api)

## Features

### Simple API:

- A simple and intuitive API for developers to interact with local storage, including methods for setting, getting, updating, and deleting data.

### Reactivity:

- Enable reactivity on local storage data, ensuring that changes automatically trigger re-renders in Vue components utilizing the data.
- Bi-directional reactivity is supported, allowing for both reading and writing data with seamless updates in Vue components.

### Serialization and Deserialization:

- Automatically handles serialization and deserialization of complex data types such as objects and arrays when storing and retrieving data from local storage.

### Namespacing:

- Create a prefix to the data within local storage to prevent naming conflicts with other parts of the application or other applications using local storage.

### Error Handling:

- Improved error handling with customized error messages and formats for a better understanding and handling.

## Installation

```bash
$ npm install fallon-vue3 --save-dev
```

## Usage

[Install](#installation) the Fallon package.

Create an instance of Fallon, optionally specifying a namespace..

```js
import Fallon from "fallon-vue3";

// Instantiate Fallon without a namespace
const fallon = new Fallon();

// Instantiate Fallon with a namespace
const fallonNamespace = new Fallon("app_");
```

Read data from the local storage using Fallon.

```js
const data = fallon.get("token");
const data = fallonNamespace.get("token"); // Reading `app_token`
```

## Object serialization

Fallon makes the storage and retrieval of object data an easy task.

```js
const sampleCart = {
  name: "Kiwi",
  qty: 24,
  img: "public/assets/kiwis.png",
};

fallon.set("cart", sampleCart); // Object succesfully serialized
const cart = fallon.get("cart"); // Deserialized as an object :)
```

## How Reactivity works

The reactivity feature facilitates real-time updates of data stored in local storage. This ensures that when a value in local storage changes, any Vue components utilizing the reactive data will automatically update to reflect the new value, eliminating the need for manual intervention.

### Implementation Details

The reactivity mechanism is implemented using Vue's Composition API (Vue 3). When using the `get()` or `bind()` method with the reactive parameter set to true, a reactive reference is generated for the specified key in local storage. This reactive reference is dynamically linked to the corresponding value in local storage, ensuring automatic updates whenever the value changes.
<br />
For data retrieval, simply pass **true** as the second parameter to the `get()` function.

```js
const reactiveData = fallon.get("cart", true);
```

Now `reactiveData` will automatically update its value whenever the value of `cart` changes in the local storage.
<br />
For data storage, use the `bind( )` function.

```js
const reactiveVariable = ref("something");
fallon.bind("cart", reactiveVariable);
```

By binding `reactiveVariable` to the key **cart** in local storage, any changes to the variable will automatically reflect in the corresponding local storage value, ensuring seamless synchronization between Vue components and local storage.

## API

### Constructor

| Param     | Type   | Nullable | Desc                       |
| --------- | ------ | -------- | -------------------------- |
| namespace | string | &check;  | Namespace of this instance |

### getNamespace

Retrieves the namespace linked to this Fallon instance.

### setNamespace

Updates the namespace for this Fallon instance. <br/>
Throws a **FallonClassError** if the param is left empty. <br/>
Throws a **FallonClassError** if the param is not of type string.

| Param     | Type   | Nullable | Desc                           |
| --------- | ------ | -------- | ------------------------------ |
| namespace | string | &cross;  | New namespace of this instance |

### get

Retrieves the value linked to the given key from the local storage. <br />
Throws a **FallonStorageError** if the key does not exist in the storage.

| Param    | Type    | Nullable | Desc                                                                |
| -------- | ------- | -------- | ------------------------------------------------------------------- |
| key      | any     | &cross;  | The key to look for                                                 |
| reactive | boolean | &check;  | Indicates whether the function is going to act vue-reactive or not. |

### set

Sets a value to a key in the local storage. Serializes the data if the value is a dictionary-like object. <br/>
Throws an **FallonStorageError** if the key is not provided.

| Param | Type | Nullable | Desc      |
| ----- | ---- | -------- | --------- |
| key   | any  | &cross;  | The key   |
| value | any  | &cross;  | The value |

### bind

Links a reactive object to a local storage key, so whenever the object updates, the storage value does as well. <br />
Throws an **FallonStorageError** if the key is not provided. <br />
Throws an **FallonClassError** if the reactiveObject parameter is not a Vue reactive object.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |
| reactiveObject | any | &cross; | A Vue reactive object (ref/computed) |

### delete

Removes a key and its value from the local storage.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |

### exists

Checks whether a key exists in the local storage or not.
| Param | Type | Nullable | Desc |
|-----------|--------|----------|----------------------------|
| key | any | &cross; | The key |

### clear

Dumps the entire local storage.

### length

Returns the total length of the local storage.
