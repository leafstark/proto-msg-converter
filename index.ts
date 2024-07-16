// index.ts

import { BinaryWriter } from "google-protobuf";
import { createProxy } from "./utils";

export const protoMsgFromObject = <T>(
  protoObject: object,
  ProtoClass: {
    new (): T;
    serializeBinaryToWriter(object: object, writer: BinaryWriter): void;
    deserializeBinary(reader: Uint8Array): T;
  }
): T => {
  const writer = new BinaryWriter();
  ProtoClass.serializeBinaryToWriter(createProxy(protoObject), writer);
  return ProtoClass.deserializeBinary(writer.getResultBuffer());
};

export const toProtoText = (obj: any): string => {
  let result = "";

  function convertCamelToUnderscore(key: string): string {
    return key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
  }

  function processObject(key: string, value: any): void {
    const processedKey = key.endsWith("List")
      ? convertCamelToUnderscore(key.slice(0, -4))
      : convertCamelToUnderscore(key);

    if (Array.isArray(value)) {
      value.forEach((item: any) => {
        result += `${processedKey}: "${item}"\n`;
      });
    } else if (typeof value === "object" && value !== null) {
      for (const nestedKey in value) {
        if (value.hasOwnProperty(nestedKey)) {
          processObject(`${processedKey}.${nestedKey}`, value[nestedKey]);
        }
      }
    } else {
      result += `${processedKey}: "${value}"\n`;
    }
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      processObject(key, obj[key]);
    }
  }

  return result;
};
