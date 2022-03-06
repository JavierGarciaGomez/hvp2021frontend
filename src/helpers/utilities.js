import { positionTypes, procedureTypes, roleTypes } from "../types/types";
import dayjs from "dayjs";
import { Fragment } from "react";
import {
  Check,
  ChromeReaderMode,
  Clear,
  GridOn,
  MoreHoriz,
  PictureAsPdf,
  YouTube,
} from "@mui/icons-material/";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import isYesterday from "dayjs/plugin/isYesterday";
import Swal from "sweetalert2";
import { uploadImg } from "./uploadImg";
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(isYesterday);

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
      // If the elements both have the same `position`,
      return a.col_numId - b.col_numId; // Compare the elements by id number.
    } else {
      // Otherwise,
      return sortOrder.indexOf(a.position) - sortOrder.indexOf(b.position); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
    }
  };

  let sortByDate = (a, b) => {
    a = dayjs(a.date);
    b = dayjs(b.date);
    return -a.diff(b);
  };

  let compareFunction = () => {};
  if (orderCriteria === "position") {
    compareFunction = sortByPosition;
  }

  if (orderCriteria === "date") {
    compareFunction = sortByDate;
  }

  const collectionToSort = [...collection];

  return collectionToSort.sort(compareFunction);
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

// receive cleanups and return them with dates to string and ordered by date
export const formatAndOrderCollection = (collection = []) => {
  const sortedCollection = sortCollection(collection, "date");
  const formattedCollection = convertCollectionDatesToString(sortedCollection);
  return formattedCollection;
};

export const convertCollectionDatesToString = (collection = []) => {
  collection.map((item) => {
    item.date = getSimplifiedStringDate(item.date);

    return { ...item };
  });

  return collection;
};

export const getSimplifiedStringDate = (date = new Date()) => {
  return dayjs(date).format("DD/MM/YYYY");
};

export const getIdOrEmpty = (object) => {
  return "hola";
};

export const getAColumn = (field, headerName, flex, property) => {
  return {
    field,
    headerName,
    flex,
    renderCell: (params) => {
      return (
        <Fragment>
          {params.row.activities[property] ? <Check /> : <Clear />}
        </Fragment>
      );
    },
  };
};

// *********   CLEANUPS *********************
export const getBranchesSummary = (lastMonthCleanUps = []) => {
  // format a branchdata
  const defaultBranchData = {
    daysCleaned: 0,
    daysNotCleaned: 0,
    deepCleanUps: 0,
    operatingRoomCleanUps: 0,
  };

  // add branch to the data
  const urban = { ...defaultBranchData, branch: "Urban" };
  const harbor = { ...defaultBranchData, branch: "Harbor" };
  const montejo = { ...defaultBranchData, branch: "Montejo" };

  // branches summary. Return item
  const branchesSummary = [urban, harbor, montejo];
  // get today utc date
  const today = dayjs().utc(true).startOf("day");

  lastMonthCleanUps.dailyCleanUps.map((dailyCleanUp) => {
    // compare branch
    branchesSummary.forEach((branch) => {
      if (branch.branch === dailyCleanUp.branch) {
        // check if there are claners
        if (dailyCleanUp.cleaners.length > 0) {
          branch.daysCleaned++;
        } else {
          branch.daysNotCleaned++;
        }
      }
    });
  });

  lastMonthCleanUps.deepCleanUps.map((deepCleanUp) => {
    branchesSummary.forEach((branch) => {
      if (branch.branch === deepCleanUp.branch) {
        // check if there are claners
        if (deepCleanUp.cleaners.length > 0) {
          branch.deepCleanUps++;
        }
      }
    });
  });

  lastMonthCleanUps.operatingRoomCleanUps.map((entry) => {
    branchesSummary.forEach((branch) => {
      if (branch.branch === entry.branch) {
        // check if there are claners
        if (entry.cleaners.length > 0) {
          branch.operatingRoomCleanUps++;
        }
      }
    });
  });

  return branchesSummary;
};

export const getCollaboratorsCleanUpsSummary = (
  collaborators,
  lastMonthCleanUps
) => {
  const collaboratorsCleanUpsSummary = [...collaborators];
  collaborators.forEach((collaborator) => {
    collaborator.cleanUps = [];
  });

  fillCollaboratorsCleanUps(
    lastMonthCleanUps.dailyCleanUps,
    collaboratorsCleanUpsSummary
  );
  fillCollaboratorsCleanUps(
    lastMonthCleanUps.operatingRoomCleanUps,
    collaboratorsCleanUpsSummary
  );
  fillCollaboratorsCleanUps(
    lastMonthCleanUps.deepCleanUps,
    collaboratorsCleanUpsSummary
  );

  const compare = (a, b) => {
    return b.cleanUps.length - a.cleanUps.length;
  };

  const sorted = collaboratorsCleanUpsSummary.sort(compare);

  return sorted;
};

const fillCollaboratorsCleanUps = (cleanUpsCollection, collaborators) => {
  cleanUpsCollection.map((cleanUp) => {
    // check if there are claners
    if (cleanUp.cleaners.length > 0) {
      // iterate through cleaners and supervisors
      cleanUp.cleaners.map((cleaner) => {
        collaborators.forEach((collaborator) => {
          if (cleaner.cleaner.col_code === collaborator.col_code) {
            collaborator.cleanUps.push(cleanUp.date);
          }
        });
      });
      cleanUp.supervisors.map((element) => {
        collaborators.forEach((collaborator) => {
          if (element.supervisor.col_code === collaborator.col_code) {
            collaborator.cleanUps.push(cleanUp.date);
          }
        });
      });
    }
  });
};

// return true if the role is the same or above
export const checkAuthorization = (
  role = roleTypes.guest,
  requiredAuthorization = roleTypes.admin
) => {
  if (requiredAuthorization === roleTypes.admin) {
    if (role === roleTypes.admin) return true;
  }
  if (requiredAuthorization === roleTypes.manager) {
    if (role === roleTypes.admin || role === roleTypes.manager) return true;
  }
  if (requiredAuthorization === roleTypes.collaborator) {
    if (
      role === roleTypes.admin ||
      role === roleTypes.manager ||
      role === roleTypes.collaborator
    )
      return true;
  }
  if (requiredAuthorization === roleTypes.user) {
    if (
      role === roleTypes.admin ||
      role === roleTypes.manager ||
      role === roleTypes.collaborator ||
      role === roleTypes.user
    )
      return true;
  }
  return false;
};

export const getCalcItems = (procedure, recValues) => {
  let values = { ...recValues };

  if (typeof procedure === "undefined") {
    return;
  }

  if (
    procedure.title === procedureTypes.initialRacePurity.title ||
    procedure.title === procedureTypes.initialRegister.title ||
    procedure.title === procedureTypes.contestCertificate.title
  ) {
    values.puppiesNum = 1;
  }
  if (procedure.title === procedureTypes.initialRacePurity.title) {
    values.olderThan3Months = true;
  }

  let calcItems = [];

  // PEDIGREE 6 sem 3 meses
  if (
    procedure.title === procedureTypes.pedigree.title &&
    values.puppiesNum > 0 &&
    !values.olderThan3Months
  ) {
    let item = {
      text: "Registro de camadas de 6 semanas a 3 meses de edad por perro con 3 generaciones",
      qty: values.puppiesNum,
      price: "$600",
      subtotal: values.puppiesNum * 600,
    };
    calcItems.push(item);
  }
  // PEDIGREE 3 a 8 meses
  if (
    procedure.title === procedureTypes.pedigree.title &&
    values.puppiesNum > 0 &&
    values.olderThan3Months
  ) {
    let item = {
      text: "Registro de camadas de 3 a 9 meses de edad por perro con 3 generaciones",
      qty: values.puppiesNum,
      price: "$700",
      subtotal: values.puppiesNum * 700,
    };
    calcItems.push(item);
  }

  // Pureza racial, Pureza racial inicial
  if (
    procedure.title === procedureTypes.racePurity.title ||
    procedure.title === procedureTypes.initialRacePurity.title
  ) {
    let item = {
      text: "Certificado de pureza racial (CPR)",
      qty: values.puppiesNum,
      price: "$700",
      subtotal: values.puppiesNum * 700,
    };
    calcItems.push(item);
  }

  // Registro inicial
  if (procedure.title === procedureTypes.initialRegister.title) {
    let item = {
      text: "Registro inicial (CRI) hasta 6 meses",
      qty: values.puppiesNum,
      price: "$700",
      subtotal: values.puppiesNum * 700,
    };
    calcItems.push(item);
  }

  // Registro inicial
  if (procedure.title === procedureTypes.contestCertificate.title) {
    let item = {
      text: "Certificado para concurso",
      qty: values.puppiesNum,
      price: "$700",
      subtotal: values.puppiesNum * 700,
    };
    calcItems.push(item);
  }

  // Microchip

  if (values.puppiesNum > 0) {
    let item = {
      text: "Microchip aplicado por médico inspector",
      qty: values.puppiesNum,
      price: "$700",
      subtotal: values.puppiesNum * 700,
    };
    calcItems.push(item);
  }

  // Tatuajes
  if (
    // procedure === procedureTypes.pedigree.value &&
    values.puppiesNum > 0 &&
    !values.olderThan3Months
  ) {
    let item = {
      text: "Tatuaje perros de 6 semanas a 3 meses de edad",
      qty: values.puppiesNum,
      price: "$500",
      subtotal: values.puppiesNum * 500,
    };
    calcItems.push(item);
  }

  // Tatuajes
  if (
    // procedure === procedureTypes.pedigree.value &&
    values.puppiesNum > 0 &&
    values.olderThan3Months
  ) {
    let item = {
      text: "Tatuaje perros mayores de 3 meses de edad",
      qty: values.puppiesNum,
      price: "$600",
      subtotal: values.puppiesNum * 600,
    };
    calcItems.push(item);
  }

  // Sedación
  if (
    // procedure === procedureTypes.pedigree.value &&
    values.puppiesNum > 0 &&
    values.sedationIsNeeded
  ) {
    let item = {
      text: "Tranquilización para perros que la requieran",
      qty: values.puppiesNum,
      price: "$600",
      subtotal: values.puppiesNum * 400,
    };
    calcItems.push(item);
  }

  // Socios
  if (values.partnerNum > 0) {
    let item = {
      text: "Socio usufructuario cuota anual",
      qty: values.partnerNum,
      price: "$900",
      subtotal: values.partnerNum * 900,
    };
    calcItems.push(item);
  }

  // Transferencias
  if (values.transfersNum > 0) {
    let item = {
      text: "Transferencia cualquier tipo de registro (cambio de propietario)",
      qty: values.transfersNum,
      price: "$600",
      subtotal: values.transfersNum * 600,
    };
    calcItems.push(item);
  }

  // Envío
  let send = {
    text: "Envío por mensajería",
    qty: 1,
    price: "$900",
    subtotal: 1 * 900,
  };

  calcItems.push(send);

  return calcItems;
};

export const getFCMTotal = (calcItems) => {
  let total = 0;
  calcItems.forEach((calcItem) => {
    total = total + calcItem.subtotal;
  });
  return total;
};

export const getKeyByValue = (object, value) =>
  Object.keys(object).find((key) => object[key] === value);

export const findObjectByProperty = (collection, property, matchValue) => {
  return collection.find((obj) => {
    return obj[property] === matchValue;
  });
};

export const isObjectEmpty = (object) => {
  if (!object) {
    return true;
  }
  return Object.keys(object).length === 0;
};

export const checkIfIsBetween = (collection, object) => {
  let isBetween = false;
  let objStartingTime = dayjs(object.startingTime);
  let objEndingTime = dayjs(object.endingTime);

  collection.map((element) => {
    if (object._id !== element._id) {
      if (
        objStartingTime.isBetween(
          dayjs(element.startingTime),
          dayjs(element.endingTime)
        ) ||
        objEndingTime.isBetween(
          dayjs(element.startingTime),
          dayjs(element.endingTime)
        ) ||
        objStartingTime.isSame(dayjs(element.startingTime))
      ) {
        isBetween = true;
      }
    }
  });

  return isBetween;
};

export const checkIfIsLong = (object) => {
  let isLong = false;
  let objStartingTime = dayjs(object.startingTime);
  let objEndingTime = dayjs(object.endingTime);

  if (objEndingTime.diff(objStartingTime, "hour") >= 14) {
    isLong = true;
  }

  return isLong;
};

export const checkIfIsOld = (object) => {
  let isOld = false;
  let objStartingTime = dayjs(object.startingTime);

  if (dayjs().diff(objStartingTime, "hour") >= 84) {
    isOld = true;
  }

  return isOld;
};

export const checkIfIsStartBeforeEnd = (object) => {
  if (!object.endingTime) {
    return true;
  }

  let objStartingTime = dayjs(object.startingTime);
  let objEndingTime = dayjs(object.endingTime);

  return objStartingTime.isBefore(objEndingTime);
};

export const sortCollectionByDate = (collection, datePropName) => {
  let sortByDate = (a, b) => {
    a = dayjs(a[datePropName]);
    b = dayjs(b[datePropName]);
    return -a.diff(b);
  };
  const collectionToSort = [...collection];
  return collectionToSort.sort(sortByDate);
};

export const sortCollectionAlphabetically = (collection, propName) => {
  let sortAlphabetically = (a, b) => {
    if (a[propName] < b[propName]) {
      return -1;
    }
    if (a[propName] > b[propName]) {
      return 1;
    }
    return 0;
  };
  const collectionToSort = [...collection];
  return collectionToSort.sort(sortAlphabetically);
};

export const sortObjectPropertiesAlphabetically = (object) => {
  return Object.fromEntries(
    Object.entries(object).sort(([, a], [, b]) => a - b)
  );
};

export const calculateTotalHours = (collection = []) => {
  const result = collection.reduce((acc, item) => {
    if (item.endingTime) {
      return (
        acc +
        dayjs.duration(dayjs(item.endingTime).diff(item.startingTime)).asHours()
      );
    } else {
      return acc;
    }
  }, 0);
  return (Math.round(result * 100) / 100).toFixed(2);
};

export const calculateYesterdayHours = (collection = []) => {
  const result = collection.reduce((acc, item) => {
    if (dayjs(item.startingTime).isYesterday() && item.endingTime) {
      return (
        acc +
        dayjs.duration(dayjs(item.endingTime).diff(item.startingTime)).asHours()
      );
    } else {
      return acc;
    }
  }, 0);

  return (Math.round(result * 100) / 100).toFixed(2);
};

export const calculateWeekHours = (collection = []) => {
  const result = collection.reduce((acc, item) => {
    if (
      dayjs(item.startingTime).isAfter(dayjs().startOf("week").add(1, "day")) &&
      item.endingTime
    ) {
      return (
        acc +
        dayjs.duration(dayjs(item.endingTime).diff(item.startingTime)).asHours()
      );
    } else {
      return acc;
    }
  }, 0);

  return (Math.round(result * 100) / 100).toFixed(2);
};

export const calculateMonthHours = (collection = []) => {
  const result = collection.reduce((acc, item) => {
    if (
      dayjs(item.startingTime).isAfter(dayjs().startOf("month")) &&
      item.endingTime
    ) {
      return (
        acc +
        dayjs.duration(dayjs(item.endingTime).diff(item.startingTime)).asHours()
      );
    } else {
      return acc;
    }
  }, 0);

  return (Math.round(result * 100) / 100).toFixed(2);
};

export const getConcludedActivityRegisters = (collection) => {
  return collection.filter((element) => element.endingTime);
};

export const fireSwalError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "ERROR",
    text: message,
    showConfirmButton: true,
  });
};

export const fireSwalSuccess = (message) => {
  return Swal.fire({
    icon: "success",
    title: "ÉXITO",
    text: message,
    showConfirmButton: false,
    timer: 2000,
  });
};

export const fireSwalConfirmation = async (message) => {
  const result = await Swal.fire({
    icon: "warning",
    title: "CONFIRMACIÓN",
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí!",
  });

  return result.isConfirmed;
};

export const fireSwalQuestionSelect = async (
  message,
  inputOptions,
  inputPlaceholder
) => {
  const sortedInputOptions = convertArrayToObjectAndSort(inputOptions);

  const result = await Swal.fire({
    title: "RESPONDE",
    text: message,
    icon: "question",
    input: "select",
    inputOptions: sortedInputOptions,
    inputPlaceholder: inputPlaceholder,
    showCancelButton: true,
  });

  return result.value;
};

export const fireSwalQuestionInput = async (message, inputLabel) => {
  const result = await Swal.fire({
    title: "RESPONDE",
    text: message,
    icon: "question",
    input: "text",
    inputLabel,
  });

  return result.value;
};

export const getDuration = (startTime, endTime) => {
  return dayjs.duration(dayjs(endTime).diff(startTime)).asHours();
};

export const getColsActivityRegisters = (activityRegisters) => {
  const colArray = [];
  activityRegisters.map((activityRegister) => {
    if (!activityRegister.endingTime) {
      return;
    }
    console.log(
      "activityRegister",
      activityRegister,
      "esta duración",
      getDuration(activityRegister.startingTime, activityRegister.endingTime)
    );
    let foundOne = false;
    for (let col of colArray) {
      if (col.col_code === activityRegister.collaborator.col_code) {
        foundOne = true;
        col.registersAmount++;

        col.totalTime = Number(
          Math.round(
            (Number(col.totalTime) +
              getDuration(
                activityRegister.startingTime,
                activityRegister.endingTime
              )) *
              100
          ) / 100
        ).toFixed(2);
        col.registers.push(activityRegister);

        break;
      }
    }
    if (!foundOne) {
      let newElement = {
        _id: activityRegister.collaborator._id,
        col_code: activityRegister.collaborator.col_code,
        imgUrl: activityRegister.collaborator.imgUrl,
        registersAmount: 1,
        totalTime: getDuration(
          activityRegister.startingTime,
          activityRegister.endingTime
        ),
        registers: [activityRegister],
      };
      console.log("nuevo elemento", newElement);
      colArray.push(newElement);
    }
  });

  return colArray;
};

export const convertArrayToObjectAndSort = (collection = []) => {
  const sortedCollection = sortCollectionAlphabetically(collection, "label");
  let newObject = {};
  sortedCollection.forEach((element) => {
    newObject[element.value] = element.label;
  });

  return newObject;
};

export const findLabelByValue = (collection = [], value) => {
  const foundElement = collection.find((element) => element.value === value);
  const label = foundElement?.label;
  if (!label) {
    return value;
  }
  return label;
};

export const findValueByLabel = (collection = [], label) => {
  const foundElement = collection.find((element) => element.label === label);
  const value = foundElement?.value;
  if (!value) {
    return label;
  }
  return value;
};

export const organiseDocumentation = (data) => {
  // const colArray = [
  //   {typeName, data[
  //  {topicName, data[
  // {title, format, link, date, author, status}
  // ]}

  // ]}
  // ];
  const organisedDocumentation = [];

  data.map((element) => {
    // variable to determine if the type existed
    let typeExistedBefore = false;
    for (let type of organisedDocumentation) {
      if (type.typeName === element.type) {
        typeExistedBefore = true;
        // variable to determine if the topic existed
        let topicExistedBefore = false;
        for (let topic of type.data) {
          if (topic.topicName === element.topic) {
            topicExistedBefore = true;
            topic.data.push(element);
            break;
          }
        }
        if (!topicExistedBefore) {
          let newTopic = {
            topicName: element.topic,
            data: [element],
          };
          type.data.push(newTopic);
        }

        break;
      }
    }
    if (!typeExistedBefore) {
      let newType = {
        typeName: element.type,
        data: [{ topicName: element.topic, data: [element] }],
      };
      organisedDocumentation.push(newType);
    }
  });

  return organisedDocumentation;
};

export const prepareDocumentation = (documentation, role) => {
  const authorizedDocumentation = documentation.filter((element) => {
    if (checkAuthorization(role, roleTypes[element.authorization])) {
      return element;
    }
  });

  return organiseDocumentation(authorizedDocumentation);
};

export const checkIfLabelAndValueAreUnique = (values, collection) => {
  let isNotUniqueValue = findObjectByProperty(
    collection,
    "value",
    values.value
  );
  let isNotUniqueLabel = findObjectByProperty(
    collection,
    "label",
    values.label
  );

  if (isNotUniqueValue || isNotUniqueLabel) {
    return false;
  }
  return true;
};

export const getFormatIcon = (format) => {
  if (format === "video") {
    return <YouTube />;
  }
  if (format === "spreadsheet") {
    return <GridOn />;
  }
  if (format === "pdf") {
    return <PictureAsPdf />;
  }
  if (format === "textDocument") {
    return <ChromeReaderMode />;
  }
  return <MoreHoriz />;
};

export const getTxtClass = (status) => {
  switch (status) {
    case "updated":
      return "txt-success";

    case "semiOutdated":
      return "txt-warning";

    case "outdated":
      return "txt-danger";

    case "notValid":
      return "txt-gray";

    case "notApplicable":
      return "txt-dark";

    default:
      return null;
  }
};

export const getRoleTypesLabelsAndValues = () => {
  const newRoleTypes = [];
  Object.entries(roleTypes).map((item) => {
    newRoleTypes.push({
      label: item[1],
      value: item[0],
    });
  });

  return newRoleTypes;
};

export const getLabelsAndValuesFromCollection = (
  collection,
  labelProperty,
  valueProperty
) => {
  const labelsAndValues = [];
  collection.map((element) => {
    labelsAndValues.push({
      label: element[labelProperty],
      value: element[valueProperty],
    });
  });

  return sortCollectionAlphabetically(labelsAndValues, "label");
};

export const formatDatePropertyJustDate = (collection, dateProperty) => {
  return collection.map((element) => {
    if (element[dateProperty] === null) {
      element[dateProperty] = "";
    } else {
      element[dateProperty] = dayjs(element[dateProperty]).format("YYYY-MM-DD");
    }
    return element;
  });
};

export const formatDatePropertyToIsoString = (object, dateProperty) => {
  if (object[dateProperty]) {
    object[dateProperty] = dayjs(object[dateProperty]).toISOString();
  }
};

export const trimAllValues = (object) => {
  const newObject = { ...object };
  for (const [key, value] of Object.entries(object)) {
    newObject[key] = value.trim();
  }

  return newObject;
};

// todo: Doing
export const getCollaboratorCodeById = () => {};

export const excludeFromCollection = (
  collection,
  collectionToExclude,
  propertyName = "_id"
) => {
  const propertyArray = collectionToExclude.map((element) => {
    return element[propertyName];
  });

  return collection.filter(
    (element) => !propertyArray.includes(element[propertyName])
  );
};

export const setUrlValueOrRefreshImage = async (
  values,
  files,
  urlProperty,
  url
) => {
  let newValues = { ...values };
  if (files.length > 0) {
    const tempImgUrl = await uploadImg(files[0], false);
    newValues[urlProperty] = tempImgUrl;
  } else {
    values[urlProperty] = url;
  }

  return { ...newValues };
};
