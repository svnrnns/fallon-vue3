# Fallon

Fallon is a package that enhances the local storage experience in **Vue 3**, bringing a easy-to-use API and offering several cool features, such as automatic serialization and deserialization of objects or adding reactivity to any possible action of the package itself.

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

- Make the local storage data reactive so that changes automatically trigger re-renders in the Vue components that use the data.
- Reactivity is enabled in both ways, reading and writting data.

### Serialization and Deserialization:

- Automatically handles serialization and deserialization of complex data types such as objects and arrays when storing and retrieving data from local storage.

### Namespacing:

- Create a prefix to the data within local storage to prevent naming conflicts with other parts of the application or other applications using local storage.

### Error Handling:

- Improved error handling with customized error messages and formats for a better understanding and handling.

## Installation

```bash
$ npm install @svnrnns/fallon --save-dev
```

## Usage

[Install](#installation) the Fallon package.

Create an instance of Fallon that might have a namespace.

```js
import Fallon from "@svnrnns/fallon";

const fallon = new Fallon();
const fallonNamespace = new Fallon("app_");
```

Read data from the local storage using Fallon.

```js
const data = fallon.get("token");
const data = fallonNamespace.get("token"); // Reading app_token
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

The reactivity feature enables real-time updates of data stored in the local storage. This means that when a value in local storage changes, any Vue components that are using the reactive data will automatically update to reflect the new value without the need for manual intervention.

### Implementation Details

The reactivity mechanism is implemented using Vue's Composition API (Vue 3). When you retrieve data using the `get( )` or `bind( )` method with the reactive parameter set to true, a reactive ref is created for the specified key in local storage. This reactive ref is bound to the value of the key in local storage and automatically updates whenever the value changes. <br />
<br />
For retrieving data, pass true to the second param of the `get( )` function.

```js
const reactiveData = fallon.get("cart", true);
```

Now `reactiveData` will automatically update its value whenever the value of `cart` changes in the local storage.
<br />
<br/>
For data storaging, use the `bind( )` function.

```js
const reactiveVariable = ref("something");
fallon.bind("cart", reactiveVariable);
```

Now the variable `reactiveData` is linked to the value of the key `cart` in the local storage. So whenever the variable data changes, the local storage value will do as well.

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

### clear

Dumps the entire local storage.

### length

Returns the total length of the local storage.
