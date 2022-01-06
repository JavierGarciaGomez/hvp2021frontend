export const suggestCodeIdea = (firstName, lastName) => {
  firstName = firstName ? firstName : "A";
  let lastNameArray = lastName.split(" ");
  lastName = lastNameArray.length > 1 ? lastName : "A A";
  lastNameArray = lastName.split(" ");
  const firstLetter = firstName.charAt(0);

  const secondLetter = lastName.charAt(0);
  const thirdLetter = lastNameArray[1].charAt(0);
  return (firstLetter + secondLetter + thirdLetter).toUpperCase();
};
