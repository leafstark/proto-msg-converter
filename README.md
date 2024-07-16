# proto-msg-converter

Utility functions for working with Protocol Buffers in TypeScript projects. Includes functions for converting JS objects to protobuf messages, and generating protobuf text format.

## Features

- Convert JS objects to Protocol Buffers messages.
- Generate Protocol Buffers text format from JS objects.

## Installation

To install the package, run:

### npm

```bash
npm install proto-msg-converter
```

### yarn

```
yarn add proto-msg-converter
```

## API

### protoMsgFromObject

Converts a JS object (AsObject) to a Protocol Buffers message.

#### Signature

```ts
protoMsgFromObject(protoObject, ProtoClass);
```

protoObject (object): The JS object to convert.

ProtoClass (class): The Protocol Buffers message class.

Return Value: The Protocol Buffers message.

#### Example

```ts
import { protoMsgFromObject } from "proto-msg-converter";
import { MyProtoMessage } from "./path/to/your/proto";

const obj = {
  name: 'test'
};

const protoMessage = protoMsgFromObject(obj, MyProtoMessage);
console.log(protoMessage.getName()); // test
```

### toProtoText

Generates a Protocol Buffers text format from a JS object.

#### Signature

```ts
const obj = {
    myName: 'test',
    myAge: 18
}
console.log(toProtoText(obj)) 
/*
    my_name: "test"
    my_age: "18"
*/
```

obj: The JS object.

Return Value: The Protocol Buffers text format.
