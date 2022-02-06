import { positionTypes, roleTypes } from "../types/types";
import dayjs from "dayjs";
import { Fragment } from "react";
import { Check, Clear } from "@material-ui/icons";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

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
  const defaultBranchData = {
    daysCleaned: 0,
    daysNotCleaned: 0,
    deepCleanUps: 0,
    operatingRoomCleanUps: 0,
  };

  const urban = { ...defaultBranchData, branch: "Urban" };
  const harbor = { ...defaultBranchData, branch: "Harbor" };
  const montejo = { ...defaultBranchData, branch: "Montejo" };

  const branchesSummary = [urban, harbor, montejo];
  // get today utc date
  const today = dayjs().utc(true).startOf("day");

  lastMonthCleanUps.dailyCleanUps.map((dailyCleanUp) => {
    // check is is from the last seven days
    if (today.diff(dailyCleanUp.date, "day") < 7) {
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
    }
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
          branch.deepCleanUps++;
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
    console.log(a.cleanUps.length - b.cleanUps.length);
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
export const checkAutorization = (
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
