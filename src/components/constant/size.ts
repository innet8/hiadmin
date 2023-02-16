declare type SizeMap = Map<string | symbol, number>;

export const componentSizes = ["", "default", "small", "large"];
const componentSizeMap = new Map([
  ["large", 40],
  ["default", 32],
  ["small", 24]
]);

export const componentSizeMapProxy = new Proxy(componentSizeMap, {
  get: (target: SizeMap, prop): any => {
    return target.has(prop) ? target.get(prop) : target.get("default");
  }
});
