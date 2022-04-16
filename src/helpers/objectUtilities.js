import { elementsToUpperCase } from "./arrayUtilities";

export const propertiesToUpperCase = (object = {}) => {
  if (object === null) return object;
  console.log(object);
  console.log({ ...object });
  console.log("this ob", object);
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === "string" && !value.includes("http")) {
        return [key, value.toUpperCase().trim()];
      } else if (Array.isArray(value)) {
        return [key, elementsToUpperCase(value)];
      } else if (typeof value === "object") {
        return [key, propertiesToUpperCase(value)];
      }
      return [key, value];
    })
  );
};
