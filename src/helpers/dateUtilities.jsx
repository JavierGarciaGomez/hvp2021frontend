import dayjs from "dayjs";

export const transformDatePropertyToInput = (object, propertyName) => {
  const newObject = { ...object };
  if (dayjs(newObject[propertyName]).isValid()) {
    newObject[propertyName] = dayjs(newObject[propertyName]).format(
      "YYYY-MM-DD"
    );
  } else {
    newObject[propertyName] = "";
  }

  return newObject;
};
