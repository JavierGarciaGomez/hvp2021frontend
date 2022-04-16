import { propertiesToUpperCase } from "./objectUtilities";
import { isObjectEmpty } from "./utilities";

export const updateArrayElementById = (array = [], element) => {
  return array.map((el) => {
    if (el._id === element._id) {
      return element;
    }
    return el;
  });
};

export const findElementBYId = (array = [], id) => {
  return array.find((el) => el._id === id);
};

export const removeArrayElementById = (array = [], id) => {
  return array.filter((element) => element._id !== id);
};

export const mergeArraysWithoutDuplicates = (arr1, arr2) => {
  const ids = new Set(arr1.map((element) => element._id));
  const merged = [...arr1, ...arr2.filter((element) => !ids.has(element._id))];
  return merged;
};

export const checkIfObjectsAreEmpty = (objects = []) => {
  for (let object of objects) {
    if (isObjectEmpty(object)) {
      return true;
    }
  }

  return false;
};

export const elementsToUpperCase = (array = []) => {
  return array.map((element) => {
    if (typeof element === "string" && !element.includes("http")) {
      return element.toUpperCase().trim();
    } else if (Array.isArray(element)) {
      return elementsToUpperCase(element);
    } else if (typeof element === "object") {
      return propertiesToUpperCase(element);
    }
    return element;
  });
};
