export const updateArrayElementById = (array = [], element) => {
  return array.map((el) => {
    if (el._id === element._id) {
      return element;
    }
    return el;
  });
};
