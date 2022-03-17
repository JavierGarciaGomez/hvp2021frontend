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
