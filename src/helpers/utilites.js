import { positionTypes } from "../types/types";
import dayjs from "dayjs";

export const generateRandomString = (length = 4) => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
};

export const sortCollaborators = (
  collaborators,
  sortCriteria = "position",
  order = true,
  primer = (a) => a.toUpperCase()
) => {
  const sort_by = (sortCriteria, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[sortCriteria]);
        }
      : function (x) {
          return x[sortCriteria];
        };

    order = reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  return collaborators.sort(sort_by(sortCriteria, order, primer));
};

export const sortCollection = (collection = [], orderCriteria = "position") => {
  // get the values to sort
  let sortOrder = getValuesFromObject(positionTypes);

  // sort function
  const sortByPosition = (a, b) => {
    if (a.position == b.position) {
      console.log("empezamos", a.col_numId, b.col_numId);
      // If the elements both have the same `position`,
      return a.col_numId - b.col_numId; // Compare the elements by id number.
    } else {
      // Otherwise,
      return sortOrder.indexOf(a.position) - sortOrder.indexOf(b.position); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
    }
  };
  let compareFunction = () => {};
  if (orderCriteria === "position") {
    compareFunction = sortByPosition;
  }

  const filteredCollection = collection.filter(
    (collaborator) => collaborator.isDisplayedWeb
  );

  console.log("esta es el filtered", filteredCollection);

  return filteredCollection.sort(compareFunction);
};

const getValuesFromObject = (object) => {
  return Object.values(object);
};

// export const convertPlainTextToHtml = (text = "") => {
//   let newText = "<div><p>";
//   let lines = text.split("\n\n");
//   lines.forEach((element) => {
//     newText = newText.concat(element);
//     newText = newText.concat("</p><p>");
//   });
//   newText = newText.concat("</p></div>");

//   const parser = new DOMParser();

//   return ReactHtml;
// };

export const getTextAsJSX = (text = "") => {
  const JSXtoReturn =
    text &&
    text.split("\n").map((i, key) => {
      return <p key={key}>{i}</p>;
    });

  return JSXtoReturn;
};

export const convertCollectionDatesToString = (collection = []) => {
  console.log("esta es la coleccion", collection);
  collection.map((item) => {
    item.date = getSimplifiedStringDate(item.date);

    return { ...item };
  });
  console.log("esta es la coleccion que regresaré", collection);
  return collection;
};

export const getSimplifiedStringDate = (date = new Date()) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const getIdOrEmpty = (object) => {
  console.log("cleaner", object);
  return "hola";
};
