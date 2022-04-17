// 367

import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    if (target.type === "checkbox") {
      return setValues({
        ...values,
        [target.name]: target.checked,
      });
    }
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const setFullValues = (newValues) => {
    setValues(newValues);
  };

  return { values, handleInputChange, reset, setFullValues };
};
