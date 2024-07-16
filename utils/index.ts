export const isEmptyObject = (obj: any): boolean =>
  typeof obj === "object" &&
  Object.keys(obj).length === 0 &&
  obj.constructor === Object;

export const createProxy = <T>(msg: T): T => {
  if (!msg || typeof msg !== "object") {
    return msg;
  }
  if (Array.isArray(msg)) {
    return msg.map((item) => createProxy(item)) as any;
  }
  return new Proxy(msg, {
    get: function (target, prop: string) {
      const fieldUpper = (String(prop) as string).replace(/get|List/g, "");
      const fieldName = `${fieldUpper[0].toLowerCase()}${fieldUpper.substring(
        1
      )}`;
      const value = target[fieldName as keyof typeof target];
      return () =>
        value === null || isEmptyObject(value) ? null : createProxy(value);
    },
  });
};
